'use client'

import { DndContext, DragEndEvent, pointerWithin, rectIntersection, Active, ClientRect, DroppableContainer } from "@dnd-kit/core";
import {restrictToWindowEdges} from '@dnd-kit/modifiers';
import { useEffect, useState } from "react";
import { RectMap } from "@dnd-kit/core/dist/store";
import { Coordinates } from "@dnd-kit/utilities";

import MatchArea from "./MatchArea";
import Goal from "./keyElements/goal";
import Tactic from "./keyElements/tactic"
import SortStartColumn from "./sortStartColumn";

import { MatchData, GoalData, TacticData, MatchableProps } from "./helperTs/sharedTypes";
import { getGoalsAndTasks } from "./helperTs/serverCalls";

export default function Matching(){

    const [goals,setGoals] = useState<MatchableProps[]>([]);
    const [tactics,setTactics] = useState<MatchableProps[]>([]);
    const [matches,setMatches] = useState<MatchData[]>([]);

    useEffect(()=>{
        getGoalsAndTasks().then((data)=>{
            const tacticData: TacticData[] = JSON.parse(data.tactics);
            const goalData :GoalData[] = JSON.parse(data.goals);
            const goalCount = goalData.length;
            const tacProps :MatchableProps[] = [];
            const goalProps: MatchableProps[]= [];
            
            goalData.forEach(goal => {
                const props :MatchableProps = {
                    'unitData':goal,
                    'dragData':{'id':goal.listKey, 'coords': {x:0, y:0}, inMiddle:false}
                };
                goalProps.push(props);
            });

            tacticData.forEach(tac => {
                const props :MatchableProps = {
                    'unitData':tac,
                    'dragData':{'id':tac.listKey+goalCount, coords:{x:0, y:0}, inMiddle:false}
                };
                tacProps.push(props);
            });
            
            setTactics(tacProps);
            setGoals(goalProps);
            
            // console.log("Goals:",goalProps, "Tactics:",tacProps)
            console.log("data pulled");
        })
    },[]);

    return(
        <div className="grow flex flex-col">
            <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]} collisionDetection={customCollisionDetect}> {/*All three columns (one draggable area)*/}
                <div className="flex border-collapse grow">

                    {/* Goal column */}
                    <SortStartColumn name="Goals" leftSide={true}>
                        {
                            goals.map((goal)=>{
                                return(
                                    <Goal key={goal.unitData.listKey} unitData={goal.unitData} dragData={goal.dragData}/>
                                );
                            })
                        }
                    </SortStartColumn> 
                    

                    {/* Middle column */}
                    <MatchArea>
                        
                    </MatchArea>
                    
                    {/* tactics column */}
                    <SortStartColumn name="Tactics" leftSide={false}>
                        {
                            tactics.map((tactic)=>{
                                return(
                                    <Tactic key={tactic.unitData.listKey} unitData={tactic.unitData} dragData={tactic.dragData} />
                                );
                            })
                        }
                    </SortStartColumn>
                </div>
            </DndContext>
        </div>
    );

    function handleDragEnd(event:DragEndEvent){
        const collisions = event.collisions;
        const delta = event.delta;
        const activeId = event.active.id as number;
        const isGoal = event.active.data.current?.isGoal;
        console.log("Collisions:", collisions,"\n Over:", event.over);

        /* 3 possible actions:
            1) 
            2)
            3)
        */


        if(isGoal==null){
            console.log("UH OH - isGoal = null");
        }else{
            console.log("Unit dragged")

            const currentList = isGoal?goals:tactics;

            const nextList = currentList.map((c)=>{
                if(c.dragData.id==activeId){
                    return({
                        unitData:c.unitData,
                        dragData: {
                            ...c.dragData,
                            coords: {
                                x:c.dragData.coords.x+ delta.x,
                                y:c.dragData.coords.y+delta.y
                            }
                        }
                    });
                }else{
                    return c;
                }
            });
            const set = isGoal?setGoals:setTactics;
            set(nextList);
        }
    

    }

    function makeMatch(goalId:number, tacticId:number){

    }

    function customCollisionDetect(args: { active: Active; collisionRect: ClientRect; droppableRects: RectMap; droppableContainers: DroppableContainer[]; pointerCoordinates: Coordinates | null; }) {
        // Check for pointer collisions
        const pointerCollisions = pointerWithin(args);
        
        // If pointer collisions finds any collisions return the result UNLESS it only finds the middleColumn
        if(pointerCollisions.length > 0 &&
            !(pointerCollisions.length==1 && pointerCollisions[0].id==-1)){

            return pointerCollisions;
        }
        
        // If there are no collisions with the pointer, return rectangle intersections
        return rectIntersection(args);
    };

}