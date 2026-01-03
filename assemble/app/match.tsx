import Goal from "./goal";
import { MatchData } from "./sharedTypes";
import Tactic from "./tactic";

export default function Match(props:MatchData){
    return(
        <div className="border-2 border-gray-800 w-52">
            <Goal id={props.goal.id} name={props.goal.name} />
            <Tactic id={props.tactic.id} name={props.tactic.name} />
        </div>
    );
}