import { useState } from "react";

function MyForm2() {

  const [ text , setText] = useState('');
  
  // input field에 입력한 것을 submit하면 날려보낼 수 있도록 하는 함수 작성
  // const handleChage = (e) => {
  //   setText(e.target.value);
  //   console.log(text)
  // }

  const handleSubmit = (e) => {
    alert(`'${text}'라고 입력하셨습니다.`)
    e.prevenDefault();
  }
  
  return(
    <>
    <form onSubmit={handleSubmit} >
      <input type={text} onChange={e => setText(e.target.value)} value={text}/>
      <br />
      <br />
      <input type="submit" value="제출"/>
    </form>
    </>
  )
}
export default MyForm2;