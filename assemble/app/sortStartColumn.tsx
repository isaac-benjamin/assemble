import { ReactNode } from "react";

interface startColumnProps extends React.PropsWithChildren{
    leftSide:boolean;
    name:string
};

export default function SortStartColumn(props:startColumnProps){
    return(
        <div className={`border-accentColor p-2 h-full flex flex-col gap-y-2 w-1/4 border-${props.leftSide?`r`:`l`}-2`}>
            <header>
                <h2>{props.name}</h2>
                <hr className="bg-textColor w-4/5 h-px border-0 mx-auto"/>
            </header>
            {props.children}
        </div>
    )
}