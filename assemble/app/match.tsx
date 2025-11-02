import Goal from "./goal";
import { MatchData } from "./sharedTypes";
import Tactic from "./tactic";

export default function Match(props:MatchData){
    return(
        <div className="border-2 border-gray-800">
            <Goal id={props.goal.id} name={props.goal.name} description={props.goal.description}/>
            <Tactic id={props.tactic.id} name={props.tactic.name} description={props.tactic.description}/>
        </div>
    );
}