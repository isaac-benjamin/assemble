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
            [{'listKey':0,'name':'Striking'},
                {'listKey':1, 'name':'Talking to your Representatives'}]
        ),
        'goals':JSON.stringify(
            [{'listKey':0,'name':'Improved Public Transportation'},
                {'listKey':1, 'name':'Raise Minimum Wage'}]
        )

        // goals:{ goals: [{goal1}, {goal2}] },
        // tactics: { goals: { } }

    }
}