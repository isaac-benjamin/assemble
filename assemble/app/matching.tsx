'use client'

import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import Goal from "./goal";
import Tactic from "./tactic";
import { useEffect, useState } from "react";
import { GoalData, MatchData, TacticData } from "./sharedTypes";
import { getGoalsAndTasks } from "./serverCalls";
import Match from "./match";

export default function Matching(){

    const [goals,setGoals] = useState<GoalData[]>([]);
    const [tactics,setTactics] = useState<TacticData[]>([]);
    const [matches,setMatches] = useState<MatchData[]>([]);

    useEffect(()=>{
        getGoalsAndTasks().then((data)=>{
            console.log(data);
            const tacticData: TacticData[] = JSON.parse(data.tactics);
            console.log(tacticData);
            const goalData :GoalData[] = JSON.parse(data.goals);
            const goalCount = goalData.length;
            tacticData.forEach(tac => {
                tac.id+=goalCount-2;
            });
            setTactics(tacticData);
            setGoals(goalData);
        })
    },[]);

    return(
        <div className="grow flex flex-col">
            <DndContext onDragEnd={handleDragEnd}>
                <div className="flex border-collapse grow">
                    <div className="border-2 p-2 h-full flex flex-col gap-y-2 w-1/4">
                        {
                            goals.map((goal,index)=>{
                                return(
                                    <Goal id={goal.id} key={index} name={goal.name} description={goal.description} />
                                );
                            })
                        }
                    </div>
                    <div className="flex flex-col-reverse border-2 flex-1 h-full">
                        <div className="h-1/4 border-4 border-accentColor border-collapse">
                            {
                                matches.map((match,index)=>{
                                    return(
                                        <Match key={index} goal={match.goal} tactic={match.tactic} matchScore={match.matchScore} explanation={match.explanation} sources={match.sources}/>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="border-2 p-2 h-full flex flex-col gap-y-2 w-1/4">
                        {
                            tactics.map((tactic,index)=>{
                                return(
                                    <Goal id={tactic.id} key={index} name={tactic.name} description={tactic.description}/>
                                );
                            })
                        }
                    </div>
                </div>
            </DndContext>
        </div>
    );

    function handleDragEnd(event:DragEndEvent){
        const {active, over} = event;
        const activeData = active.data.current;
        const overData = over?.data.current;
        const overId = over?.id as number;
        const activeId = active.id as number;

        console.log(over,overData)

        //Check if they are of different types
        if( over && active && 
        ((activeId>goals.length && overId <= goals.length)
        || (overId>goals.length && activeId <= goals.length)) ){
            if(over.id as number > goals.length){
                makeMatch(activeId,overId)
            }else{
                makeMatch(overId,activeId)
            }
        }
    }

    function makeMatch(goalId:number, tacticId:number){
        console.log("attempt")
        const goal = goals.splice(goalId-1);
        const tactic = tactics.splice( tacticId - (tactics.at(0) as TacticData).id );
        setGoals(goals);
        setTactics(tactics);
        const newMatches = matches.concat({goal:goal[0], tactic:tactic[0], matchScore:0,explanation:'',sources:[]});
        setMatches(newMatches);
    }

}