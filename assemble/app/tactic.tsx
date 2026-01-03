import Matchable from "./matchable";
import { TacticData } from "./sharedTypes";

export default function Goal(props:TacticData){
    return(
        <Matchable id={props.id} name={props.name} isGoal={false}/>
    );
}