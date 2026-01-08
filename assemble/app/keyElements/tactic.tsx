import Matchable from "./matchable";
import { MatchableProps } from "../helperTs/sharedTypes";

export default function Goal(props:MatchableProps){
    return(
        <Matchable id={props.dragData.id} name={props.unitData.name} isGoal={false} coords={props.dragData.coords}/>
    );
}