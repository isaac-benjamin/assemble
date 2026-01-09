import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useCombinedRefs, CSS } from "@dnd-kit/utilities";
import { log } from "console";
import { useEffect, useState } from "react";
import { DraggingData } from "../helperTs/sharedTypes";

interface propType extends DraggingData{
    name: string,
    isGoal: boolean,
    listKey:number,
    matched ?: boolean
};

export default function Matchable(props :propType){
    const extraData = {isGoal:props.isGoal, listKey:props.listKey}
    const draggable = useDraggable({id: props.id, data : extraData});
    const {setNodeRef} = useDroppable({id: props.id,
                data: extraData,
                disabled: (draggable.isDragging || props.matched) 
            });
    const combinedRef = useCombinedRefs(setNodeRef, draggable.setNodeRef);
    const style = {transform: CSS.Translate.toString(draggable.transform)};

    function getStyles(){
        let styles = `relative `;

        //Goal check
        if(props.isGoal){
            styles+="bg-primaryColor ";
        }else{
            styles+="bg-tacticColor ";
        }

        //Dragged check
        if(draggable.isDragging){
            styles+="cursor-grabbing ";
        }else{
            styles+="cursor-grab";
        }


        return styles;
    }

    return(
        <div className={getStyles()+" p-4 flex justify-center font-bold text-center"}
         ref = {combinedRef} style={{...style,top:`${props.coords.y}px`,left:`${props.coords.x}px`}} {...draggable.attributes} {...draggable.listeners}>
            {props.name}
        </div>
    );
}