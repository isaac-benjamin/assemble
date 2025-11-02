export interface GoalData{
    id:number;
    name:string;
    description:string;
};

export interface TacticData{
    id:number;
    name:string;
    description:string;
};

export interface MatchData{
    goal:GoalData;
    tactic:TacticData;
    matchScore:number;
    explanation: string;
    sources:string[];
}

