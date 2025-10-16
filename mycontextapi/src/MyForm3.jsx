import { useState } from "react"

function MyForm3() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })
  const {firstName, lastName ,email} = user;
  // form에서 사용할 예정이니 handleSubmit부터 작성
  const handleSubmit = (e) => {
    alert(`Hello, ${lastName} ${firstName}`)
    setUser({
      firstName: "",
      lastName: "",
      email: "",
    })
    e.preventDefault();
  }
  // form 태그 썼고 내부에 input창으로 입력 받을거니까 onChange를 작성하게 된다.
  // 여러 개의 input 태그 내에 onChange= {e => setFirstName(e.target.value)}를 field 개수대로 쓸 필요는 없으니

  const handleChage = (e) => { 
  setUser({...user, [e.target.name]:e.target.value});
  }
  return (
    <>
      <form onSubmit={handleSubmit} >
        <label > First Name </label>
        <input type="text" name="firstName" onChange={handleChage} value={firstName} />
        <br />
        <label > Last Name </label>
        <input type="text" name="lastName" onChange={handleChage} value={lastName} />
        <br />
        <label > Email </label>
        <input type="text" name="email" onChange={handleChage} value={email} />
        <br />
        
        <input type="submit" value="제출" />
      </form>
    </>
  );
}
export default MyForm3;