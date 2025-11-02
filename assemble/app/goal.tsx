import Matchable from "./matchable";
import { GoalData } from "./sharedTypes";

export default function Goal(props:GoalData){
    return(
        <div className=" border-accentColor bg-primaryColor m-1/10 h-1/10">
            <Matchable id={props.id} name={props.name} isGoal={true}/>
        </div>
    );
}