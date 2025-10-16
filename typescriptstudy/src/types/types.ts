
type HelloProps = {
  name : string ;  // Java에서의 field처럼 느껴지고
  age ?: number;
  fn ?: () => void; // Java 에서의 method 처럼 보이는 느낌 call1 유형의 public void ()
  fn2 ?: (msg: string) => void; // call2 유형 public void (string)
}

export default HelloProps;