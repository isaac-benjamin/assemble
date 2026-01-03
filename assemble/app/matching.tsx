'use client'

import { DndContext, DragEndEvent, DragOverEvent, useDroppable } from "@dnd-kit/core";
import {restrictToWindowEdges} from '@dnd-kit/modifiers';
import Goal from "./goal";
import Tactic from "./tactic";
import { useEffect, useState } from "react";
import { GoalProps, MatchData, TacticProps, GoalData, TacticData } from "./sharedTypes";
import { getGoalsAndTasks } from "./serverCalls";
import Match from "./match";

export default function Matching(){

    const [goals,setGoals] = useState<GoalProps[]>([]);
    const [tactics,setTactics] = useState<TacticProps[]>([]);
    const [matches,setMatches] = useState<MatchData[]>([]);
    const {setNodeRef} = useDroppable({id:-1});

    useEffect(()=>{
        getGoalsAndTasks().then((data)=>{
            const tacticData: TacticData[] = JSON.parse(data.tactics);
            const goalData :GoalData[] = JSON.parse(data.goals);
            const goalCount = goalData.length;
            const tacProps :TacticProps[] = [];
            const goalProps: GoalProps[]= [];
            
            goalData.forEach(goal => {
                const props :GoalProps = {
                    'goalData':goal,
                    'dragData':{'id':goal.listKey, 'coords': {x:0, y:0}, inMiddle:false}
                };
                goalProps.push(props);
            });

            tacticData.forEach(tac => {
                const props :TacticProps = {
                    'tacticData':tac,
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
            <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}> {/*All three columns (one draggable area)*/}
                <div className="flex border-collapse grow">

                    {/* Goal column */}
                    <div className="border-r border-accentColor p-2 h-full flex flex-col gap-y-2 w-1/4">
                        {
                            goals.map((goal)=>{
                                return(
                                    <Goal key={goal.goalData.listKey} goalData={goal.goalData} dragData={goal.dragData}/>
                                );
                            })
                        }
                    </div>

                    {/* Middle column */}
                    <div className="flex-col-reverse flex-1 h-full" ref={setNodeRef}>
                        
                    </div>
                    
                    {/* tactics column */}
                    <div className="border-l border-accentColor p-2 h-full flex flex-col gap-y-2 w-1/4">
                        {
                            tactics.map((tactic)=>{
                                return(
                                    <Tactic key={tactic.tacticData.listKey} tacticData={tactic.tacticData} dragData={tactic.dragData} />
                                );
                            })
                        }
                    </div>
                </div>
            </DndContext>
        </div>
    );

    function handleDragEnd(event:DragEndEvent){
        const over = event.over
        const delta = event.delta;
        const activeId = event.active.id as number;
        const isGoal = event.active.data.current?.isGoal;



        if(isGoal==null){
            console.log("UH OH - isGoal = null");
        }else if(isGoal==false){
            console.log("Tactic Dragged")
        }else{
            console.log("Goal dragged")
            const nextGoals = goals.map((c)=>{
                if(c.dragData.id==activeId){
                    return({
                        goalData:c.goalData,
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
            }) 
            setGoals(nextGoals);
        }
    

    }

    function makeMatch(goalId:number, tacticId:number){

    }

}