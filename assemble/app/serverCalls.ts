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

//
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
            [{'id':3,'name':'Striking'},
                {'id':4, 'name':'Talking to your Representatives'}]
        ),
        'goals':JSON.stringify(
            [{'id':1,'name':'Improved Public Transportation'},
                {'id':2, 'name':'Raise Minimum Wage'}]
        )

        // goals:{ goals: [{goal1}, {goal2}] },
        // tactics: { goals: { } }

    }
}