import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useCombinedRefs, CSS } from "@dnd-kit/utilities";

interface propType{
    id: number;
    name:string;
    isGoal:boolean;
};

export default function Matchable(props :propType){
    const {setNodeRef} = useDroppable({id: props.id, data:{isGoal:props.isGoal}});
    const draggable = useDraggable({id: props.id, data : {isGoal:props.isGoal}});
    const combinedRef = useCombinedRefs(setNodeRef, draggable.setNodeRef);
    const style = {transform: CSS.Translate.toString(draggable.transform)};
    //On Drag - Disable mapped rendering in matching component
    return(
        <div className="p-4 h-full bg-inherit flex justify-center text-textColor font-bold"
         ref = {combinedRef} style={style} {...draggable.attributes} {...draggable.listeners}>
            {props.name}
        </div>
    );
}