import Matchable from "./matchable";
import { MatchableProps, TacticData } from "../helperTs/sharedTypes";

export default function Tactic(props:MatchableProps<TacticData>){
    return(
        <Matchable id={props.dragData.id} name={props.unitData.name} isGoal={false}
         coords={props.dragData.coords} listKey={props.unitData.listKey}/>
    );
}