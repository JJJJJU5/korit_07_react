import { useState } from "react";

function Counter() {
  const [ count, setCount] = useState (0);
  return (
    <div>
      <p>버튼 클릭 횟수 = {count}</p>
      <button onClick={() => setCount(count +1)}>
        증가 {count}
      </button>
    </div>
    )
  }
export default Counter