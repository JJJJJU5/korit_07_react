import { useState } from "react";

function MyComponent3() {
  const [count1 , setCount] = useState(0);
  const [count2 , setCount2] = useState(0);

  const increment = () => {
    setCount(count1 +1);
    setCount2(count2 +1);
  }

  return (
  <>
  <p>현재 값 : {count1} ⭐ {count2}</p>
    <button onClick={() => {
      setCount(count1 + 1);
      setCount2(count2 + 1);
      }}> 증가</button>
    <button onClick={increment}>증가4</button>
  </>  
  )
}
export default MyComponent3