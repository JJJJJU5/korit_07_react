import { useState } from "react";

function MyComponent2() {
  const [ name , setName] = useState({
    firstName : 'John',
    lastName : 'Doe'
  });
  const {firstName , lastName} = name;

  return (
    <h1>
      Hello , {firstName} {lastName} 
      <button onClick= {() => 
        {if(lastName == 'Doe') setName({...name, lastName : '도'});
        else setName({...name, lastName : 'Doe'})
      }}>
      </button>      
    </h1>
  )
}
export default MyComponent2

