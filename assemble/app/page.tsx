import Header from "./header";
import Matching from "./matching";

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <Header/>
      <Matching/>
    </div>
  );
}
