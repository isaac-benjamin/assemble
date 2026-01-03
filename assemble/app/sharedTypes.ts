
interface MatchableData{
    id: number;
    name: string;
    description?: string;
};

export interface GoalData extends MatchableData{
    relation?:string;
};

export interface TacticData extends MatchableData{
    bestMatch?: number;
};

export interface MatchData{
    goal:GoalData;
    tactic:TacticData;
    matchScore?:number;
    explanation?: string;
    sources?:string[];
}

