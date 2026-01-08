import { useDroppable } from "@dnd-kit/core";


export default function MatchArea(props:React.PropsWithChildren){

    const {node,setNodeRef} = useDroppable({id:-1});

    return(
        <div className="flex-col-reverse flex-1 h-full" ref={setNodeRef}>
            {props.children}
        </div>
    );
    
}