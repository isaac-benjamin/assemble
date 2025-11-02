import { GoalData, TacticData } from "./sharedTypes";

const flaskUrl = "http://127.0.0.1:5000"

export interface help{
    tactics:{
        goals:TacticData[]
    };
    goals:{
        goals:GoalData[]
    };
}

export async function getGoalsAndTasks(){
    // const response = await fetch(`${flaskUrl}/matchList?uid=1`);
    // const data : help = await response.json();
    // console.log(data);
    // return {
    //     tactics: JSON.stringify(data.tactics.goals),
    //     goals: JSON.stringify(data.goals.goals)
    // } 
    return {
        'tactics':JSON.stringify(
            [{'id':3,'name':'Striking','description':'coordinated effort of a workforce to stop working. NOTE: this is a crime if you are a federal employee.'},
                {'id':4, 'name':'Talking to your Representatives', 'description':'In a democracy our elected leaders represent the will of the people. When enough people make their voice heard statesmen have a duty to listen and obey.'}]
        ),
        'goals':JSON.stringify(
            [{'id':1,'name':'Improved Public Transportation','description':'though the bus and the metro serve many people, it is still extrememly hard to navigate life without a car in Baltimore County'},{'id':2, 'name':'Raise Minimum Wage', 'description':'At the current level the minimum wage is not livable, much of the population of Baltimore County is working in minimum wage jobs'}]
        )
    }
}