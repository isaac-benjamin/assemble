
import os
from flask_cors import CORS
from instructor import patch
from openai import OpenAI
from flask import Flask, Request, json, jsonify, request

from models import *

app = Flask(__name__)

CORS(app)

client=OpenAI(base_url="https://openrouter.ai/api/v1",api_key=os.getenv('OPENROUTER_API_KEY'))
modelCode = "google/gemini-2.5-flash"

userData=''
stateData='Maryland'
countyData='Baltimore County'
userInterests=['environmental discrimination','public transportation']
newline="\n"
currentGoals=[]
currentTactics=[]

@app.post('/location')
def post_location():
    check = check_params(request,['uid','state','county'])
    valid = check[0]
    data = check[1]

    if(not valid):
        return data,400

    user = data['uid']
    state = data['state']
    county = data['county']

    userData=user
    stateData = state
    countyData = county

    return "Success",200

@app.post('/interests')
def post_interests():
    check=check_params(request,['uid','interests'])
    if(not check[0]):
        return check[1],400
    request_data = check[1]
    user = request_data['uid']
    interests = request_data['interests']
    

@app.get('/matchList')
def get_goals_and_tactics():
    """
    Asks gemini for a list of relevant goals and tactics
    """
    uid=request.args['uid']
    # Ask for a list of goals relevant to user's interests and their county
    goalPrompt = f"""You are creating a matching game to match goals to relevant tactics. 
    Provide a list of 5-6 goals related to the user\'s interests and community.\nThe user lives in {countyData},{stateData}.
    \nInterests:\n {newline.join(f"* {x}" for x in userInterests)} \n Please respond in json format"""
    
    goalResponse = client.chat.completions.create(
        model=modelCode,
        messages=[
            getSysPrompt(),
            {
                'role':'user',
                'content':goalPrompt            
            }
        ],
        response_format={
            "type":"json_schema",
            "json_schema": { 
                "name":"GoalSchema",
                "strict":True,
                "schema":GoalResponse.model_json_schema()
                }
        }
    )

    goals= json.loads(json.dumps(goalResponse.choices[0].message.content))

    #Send that list of goals back and ask for a list of tasks for matching 

    tacticPrompt = f"""You are creating a matching game to match goals to relevant tactics. 
                    Given the goals just created, make 3-4 tactics that can be used to advance these goals.
                    The goals are: {goals} \n Each goal should have at least 1 tactic
                    that is a strong pair. The user lives in {countyData}, {stateData}. Return a list of tactics. Please respond in json format."""

    print(tacticPrompt)

    tacticResponse = client.chat.completions.create(
        model=modelCode,
        messages=[
            getSysPrompt(),
            {
                'role':'user',
                'content':tacticPrompt            
            }
        ],
        response_format={
            "type":"json_schema",
            "json_schema": { 
                "name":"TacticSchema",
                "strict":True,
                "schema": TacticResponse.model_json_schema()
                }
        }
    )
    
    tactics = json.loads(json.dumps(tacticResponse.choices[0].message.content))
    ##Return both the list of goals and tasks 
    returnBody=jsonify({'goals':goals, 'tactics':tactics})

    return returnBody

def check_params(request: Request, params: list[str]):
    requestVals = dict()
    for x in params:
        if(not x in request):
            return (False,"Bad request - missing "+x)
        else:
            requestVals[x]=request[x]
    return (True,requestVals)

if __name__=='__main__':
    app.run()
    