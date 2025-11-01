import Matchable from "./matchable";

interface propType{
    id:number;
};

export default function Goal(props:propType){
    return(
        <div className="bg-orange-500 w-2/5 h-4">
            <Matchable id={props.id}/>
        </div>
    );
}