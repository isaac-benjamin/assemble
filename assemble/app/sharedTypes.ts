import { Coordinates } from "@dnd-kit/utilities";

/* 
    dragging - information only related to how the component is dragged across the screen
    Matchable - Goal or Tactic
    Match - A paring of both one goal and one tactic

    _____Data - front end data: information about the subject that must be displayed to user
    Props - combination of some type of frontend data AND dragging data
*/


//VERY COUNTER-INTUITIVE - this is the props for the matchable.tsx component
export interface DraggingData{
    id: number; //Unique number across all draggables and droppables
    coords: Coordinates
    inMiddle : boolean
}

interface MatchableData{
    listKey: number; //Number for finding this in array of its own type
    name: string;
    description?: string;
};

export interface MatchableProps{
    unitData: MatchableData //Data specific to whatever type of matchable is being used
    dragData: DraggingData;
}

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
