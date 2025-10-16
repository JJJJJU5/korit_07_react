import HelloProps from "./types/types";
function HelloComponent({name,age} : HelloProps) {  // 객체 구조분해를 이해하여야 한다.
  return (
    <>
      Hello, {name}, you are {age} years old!
    </>
  );
}

export default HelloComponent;