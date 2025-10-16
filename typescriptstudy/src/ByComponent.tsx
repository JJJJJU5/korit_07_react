import HelloProps from "./types/types";

function ByComponent({name} : HelloProps) {
  return (
    <>
      <h1>bye {name} !</h1>
    </>
  );
}

export default ByComponent;