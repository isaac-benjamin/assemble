'use client'

import { DndContext, DragEndEvent, pointerWithin, rectIntersection, Active, ClientRect, DroppableContainer, UniqueIdentifier } from "@dnd-kit/core";
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
import Matchable from "./keyElements/matchable";
import Match from "./keyElements/match";

export default function Matching(){

    const [goals,setGoals] = useState<MatchableProps<GoalData>[]>([]);
    const [tactics,setTactics] = useState<MatchableProps<TacticData>[]>([]);
    const [matches,setMatches] = useState<MatchableProps<MatchData>[]>([]);
    

    useEffect(()=>{
        getGoalsAndTasks().then((data)=>{
            const tacticData: TacticData[] = JSON.parse(data.tactics);
            const goalData :GoalData[] = JSON.parse(data.goals);
            const goalCount = goalData.length;
            const tacProps :MatchableProps<TacticData>[] = [];
            const goalProps: MatchableProps<GoalData>[]= [];
            
            goalData.forEach(goal => {
                const props :MatchableProps<GoalData> = {
                    'unitData':goal,
                    'dragData':{'id':goal.listKey, 'coords': {x:0, y:0}, inMiddle:false}
                };
                goalProps.push(props);
            });

            tacticData.forEach(tac => {
                const props :MatchableProps<TacticData> = {
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
                        {
                            matches.map((match,index)=>{
                                return (<Match key={index} unitData={match.unitData} dragData={match.dragData} />);
                            })
                        }
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
        const activeId = event.active.id;
        const isGoal = event.active.data.current?.isGoal;
        const inMiddle = event.active.data.current?.inMiddle;

        console.log("Collisions:", collisions,"\n Over:", event.over);

        /* possible actions:
            1) Move from side to middle
            2) Move from middle to middle
            3) Illegal move - return to previous position (do nothing)
            4) Valid match
        */
        //If there is at least one collision detected
        if(event.over){
            let overMiddle = false;
            let dropZoneId:UniqueIdentifier | undefined;

            collisions?.forEach(element => {
                const extraData = element.data?.droppableContainer.data.current;

                if(element.id==-1) overMiddle=true;
                //If one element is goal and the other is tactic save match ID
                else if (extraData.isGoal != isGoal && dropZoneId ===undefined){
                    dropZoneId=element.id;
                }
            });

            console.log("overMiddle:",overMiddle,"\ndropZoneId:",dropZoneId);

            if(dropZoneId !== undefined){
                makeMatch(activeId,dropZoneId,!isGoal);
                console.log("Match made");
            
            }else if(overMiddle){

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

                if(inMiddle){
                    //Middle to middle
                }else{
                    //Side to middle
                }
            }

        }
        //Otherwise illegal move, do nothing

    }

    function makeMatch(goalId:UniqueIdentifier, tacticId:UniqueIdentifier, goalDropZone:boolean){
        const goalProps = goals.find(x=>x.dragData.id== goalId);
        const tacProps = tactics.find(x=>x.dragData.id== tacticId);

        const nextGoals =goals.filter(x=> x.dragData.id !==  goalId);
        const nextTact =tactics.filter(x=> x.dragData.id !==  tacticId );
        
        if(goalProps && tacProps){
            // const dropZone = goalDropZone ? goalProps : tacProps;
            const dropZone = goalProps

            const match:MatchData = {goal: goalProps.unitData, tactic: tacProps.unitData,
                name:`${goalProps.unitData.name} & ${tacProps.unitData.name}`, listKey:matches.length};
            const matchProps:MatchableProps<MatchData> = { 
                unitData:match,
                dragData:{
                    ...dropZone.dragData,
                    id: Date.now()
                }
             };
    
            setMatches([...matches, matchProps]);
            setGoals(nextGoals);
            setTactics(nextTact);

        }else{
            if(goalId === undefined){
                console.log(`No goal with the supplied id ${goalId}`)
            }
            if(tacticId===undefined){
                console.log(`No tactic with the supplied id ${tacticId}`)
            }
        }

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