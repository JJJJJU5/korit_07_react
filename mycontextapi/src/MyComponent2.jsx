import React, { useEffect, useRef, useState } from "react";
import AuthContext from "./AuthContext";

function MyComponent2() {
  const name = React.useContext(AuthContext);

  const [btncolor , setBtncolor] = useState('red');
  

  const buttonRef = useRef(null);
  
  useEffect(() => {},[])
    
  const btnChageColor = () => {
    if (buttonRef.current.style.background == 'red') {
      buttonRef.current.style.background = 'blue';
      setBtncolor("blue")
      alert("파랑으로 변경");
    } else {
      buttonRef.current.style.background = 'red'
      setBtncolor("red")
      alert("빨강으로 변경")
    }
  }  
  return (
    <>
    <button style={{background : {btncolor}}} ref={buttonRef} onClick={btnChageColor}> {name}!</button>
    </>
  );
}
export default MyComponent2