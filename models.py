from pydantic import BaseModel, Field

MAX_GOALS = 6

def getSysPrompt():
    return { 'role':'system', 'content': "You are an assistant who helps educate users on effective ways to engage in activism and organize within their community. " \
    "You're responses should stay relevant to the community of the current user."}
    "You can give safe and effective advice using https://activisthandbook.org/ and specifically https://activisthandbook.org/strategy" 

class Goal(BaseModel):
    id :int =Field(description="unique numerical identifier")
    name:str = Field(description="Name of the change the user would like to see in their community. This is a sentence fragment, no more than 4 words")
    description : str = Field(description="Brief description of the issue, who it affects, why its important . Maximum 3 concise sentences.")
    relation : str = Field(description="Explain how this connects to the user's community. Maximum 3 concise sentences")


class GoalResponse(BaseModel):
    goals: list[Goal] = Field(description="List of the requested goals", max_length=MAX_GOALS)


class Tactic(BaseModel):
    id :int =Field(description="unique numerical identifier")
    name:str = Field(description="Name of method of activism or organization")
    description : str = Field(description="1-2 sentences explaining what actions this tactic entails")

class TacticResponse(BaseModel):
    goals: list[Tactic] = Field(description="List of the requested tactics", max_length=MAX_GOALS-1)

class Match(BaseModel):
    goal: Goal = Field(description="The objective/cause that the user has paired with a tactic")
    tactic: Tactic = Field(description="A tactic that the user beleives would be effective in furthering the selected goal")
    compatability:int=Field(description="A rating 1-100 that describes how effective the tactic would be to further the goal. A score closer to 100 means the tactic is agood match. A score closer to 1 means employing the tactic would do almost nothing to further the goal.", ge=1, le=100)
    explanation:str = Field(description="A 4-5 sentences to explain the reasoning behind the compatibility score. Including one example, modern or historical.")

"""
Goal:
Name
Brief description - max 250 chars
Relation to the area - string 

Tactic
Name
Brief description - max 250 chars
GoalCompatibility - dict[goalName, compatibilityScore]

Pairing
Goal
Tactic
Compatibility - int 1 to 100
Explanation - String - Description: This a few sentences to explain the reasoning behind their compatibility score, including one example, modern or historical.
Sources

"""