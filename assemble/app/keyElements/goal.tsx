import Matchable from "./matchable";
import { GoalData, MatchableProps } from "../helperTs/sharedTypes";

export default function Goal(props:MatchableProps<GoalData>){
    return(
        <Matchable id={props.dragData.id} name={props.unitData.name} isGoal={true}
         coords={props.dragData.coords} listKey={props.unitData.listKey}/>
    );
}