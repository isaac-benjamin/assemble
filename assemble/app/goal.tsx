import Matchable from "./matchable";
import { GoalProps } from "./sharedTypes";

export default function Goal(props:GoalProps){
    return(
        <Matchable id={props.dragData.id} name={props.goalData.name} isGoal={true} coords={props.dragData.coords}/>
    );
}