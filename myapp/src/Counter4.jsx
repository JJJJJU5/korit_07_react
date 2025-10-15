import { useState } from "react";
import useTitle from "./useTitle";

function  Counter4() {
  
  const [count , setCount] = useState(0);
  useTitle(`당신은 ${count} 번 클릭했습니다. !`);
  const upClick = () => {
    {setCount(count => count +1)}
  } 
  return(
    <>
    <p>Counter : {count}</p>
    <br />
    <br />
    <button onClick={upClick}>증가</button>
    </>
  );
}

export default Counter4