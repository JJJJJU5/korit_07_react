  // Form이 제출될 때 호출될 수 있도록 작성"
import React from "react";
import AuthContext from "./AuthContext";

function MyForm() {
  
  const Drivername = React.useContext(AuthContext);
  
  const handleSubmit = (e) => {
    e.preventDefault(); // md파일에서 작성한 기본 동작 방지 메서드
    alert (Drivername)
  }
  return (
    <>
      <form onSubmit = {handleSubmit}>
        <input type ="submit" value={'제출'}/>
      </form>
    </>
  );
}

export default MyForm;
