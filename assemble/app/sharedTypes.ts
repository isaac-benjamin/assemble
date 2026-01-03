import { Coordinates } from "@dnd-kit/utilities";

interface DraggingData{
    id: number; //Unique number across all draggables and droppables
    coords: Coordinates
}

interface MatchableData{
    listKey: number; //Number for finding this in array of its own type
    name: string;
    description?: string;
};

export interface GoalData extends MatchableData{
    relation?:string;
};

export interface GoalProps{
    goalData: GoalData;
    dragData: DraggingData;
}

export interface TacticData extends MatchableData{
    bestMatch?: number;
};

export interface TacticProps{
    tacticData:TacticData;
    dragData: DraggingData;
}

export interface MatchData{
    goal:GoalData;
    tactic:TacticData;
    matchScore?:number;
    explanation?: string;
    sources?:string[];
}

