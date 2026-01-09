
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { MatchableProps, MatchData } from "../helperTs/sharedTypes";
import Goal from "./goal";
import Tactic from "./tactic";

export default function Match(props:MatchableProps<MatchData>){

    const {transform, setNodeRef, attributes,listeners} = useDraggable({id:props.dragData.id});
    const style = {transform: CSS.Translate.toString(transform)};
    const matchData = props.unitData as MatchData;


    return(
        <div className="border-2 border-gray-800 w-52 h-32" 
        style={{...style,top:`${props.dragData.coords.y}px`,left:`${props.dragData.coords.x}px`}}
        ref={setNodeRef} {...attributes} {...listeners}>
            {`${matchData.goal.name} & ${matchData.tactic.name}`}
        </div>
    );
}