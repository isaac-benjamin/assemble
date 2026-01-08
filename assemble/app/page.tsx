import Header from "./keyElements/header";
import Matching from "./matching";

export default function Home() {
  return (
    <div className="h-full flex flex-col text-textColor">
      <Header/>
      <Matching/>
    </div>
  );
}
