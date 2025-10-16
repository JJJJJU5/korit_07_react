import { useState } from 'react';
import Userinfo from './types/types2'

function SimpleUserForm() {


  const [user , setUser] = useState<Userinfo>({
    firstName: "",
    email: "",
  })
  const {firstName, email} = user;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {const {name , value} = e.target;

  setUser(PreUser => ({...PreUser, [name]: value

    }))
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`이름 : ${firstName},이메일 : ${email}`)

    setUser({firstName : "", email : ""});
  }

  return (
  <>
  <h2>사용자 정보 입력</h2>
  <form onSubmit={handleSubmit}>
      <label>
          이름: 
          <input 
              type="text" 
              name="firstName" 
              value={firstName} 
              onChange={handleChange}
          />
      </label>
      <br /><br />
      <label>
          이메일: 
          <input 
              type="text" 
              name="email" 
              value={email} 
              onChange={handleChange}
          />
      </label>
      <br /><br />
      <button type="submit">제출</button>
  </form>
  </>
);
}

export default SimpleUserForm