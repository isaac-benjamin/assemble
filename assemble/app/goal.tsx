import Matchable from "./matchable";
import { GoalData } from "./sharedTypes";

export default function Goal(props:GoalData){
    return(
        <Matchable id={props.id} name={props.name} isGoal={true}/>
    );
}