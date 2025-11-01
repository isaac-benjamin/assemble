'use client'

import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import Goal from "./goal";
import Tactic from "./tactic";

export default function Matching(){
    return(
        <div className="h-4/5">
            <DndContext onDragEnd={handleDragEnd}>
                <div className="flex h-full border-collapse">
                    <div className="w-1/4 border-2 h-full">
                        <Goal id={0}/>
                    </div>
                    <div className="border-2 flex-1 h-full">

                    </div>
                    <div className="w-1/4 border-2 h-full">
                        <Tactic id={1}/>
                    </div>
                </div>
            </DndContext>
        </div>
    );

    function handleDragEnd(event:DragEndEvent){
        const {active, over} = event;
        const activeData = active.data.current;
        const overData = over?.data.current;

        if(activeData){
            console.log()
        }

        if( (active && over) && active.id==over.id ){
            console.log("SAME");
        }
    }
}