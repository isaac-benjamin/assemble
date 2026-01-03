import Matchable from "./matchable";
import { TacticProps } from "./sharedTypes";

export default function Goal(props:TacticProps){
    return(
        <Matchable id={props.dragData.id} name={props.tacticData.name} isGoal={false} coords={props.dragData.coords}/>
    );
}