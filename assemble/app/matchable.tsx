import { useDraggable, useDroppable } from "@dnd-kit/core";
import { useCombinedRefs, CSS } from "@dnd-kit/utilities";

interface propType{
    id: number;
};

export default function Matchable(props :propType){
    const {setNodeRef} = useDroppable({id: props.id, data:{type:0}});
    const draggable = useDraggable({id: props.id, data : {type:0}});
    const combinedRef = useCombinedRefs(setNodeRef, draggable.setNodeRef);
    const style = {transform: CSS.Translate.toString(draggable.transform)};

    return(
        <div className="h-full bg-inherit"
         ref = {combinedRef} style={style} {...draggable.attributes} {...draggable.listeners}>
    
        </div>
    );
}