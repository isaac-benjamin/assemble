import Matchable from "./matchable";
import { TacticData } from "./sharedTypes";


export default function Goal(props:TacticData){
    return(
        <div className="bg-orange-500 w-2/5 h-4">
            <Matchable id={props.id} name={props.name} isGoal={false}/>
        </div>
    );
}