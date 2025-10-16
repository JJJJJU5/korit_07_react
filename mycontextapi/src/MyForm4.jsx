import React, { useRef, useState } from 'react';

function MyForm4() {
  const [firstName , setFirstName] = useState('');
  const [lastName , setLastName] = useState('');
  const [email , setEmail] = useState('');


  const handleSubmit = (e) => {
    alert(`Hello ${lastName} ${firstName}`)
    e.preventDefault();
  } 
  
  return (
    <>
      <form onSubmit={handleSubmit}>
      <label >firstName</label>
      <input  type="text"  onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
      <br />
      <label >lastName</label>
      <input  type="text" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
      <br />
      <label >email</label>
      <input  type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
      <br />
      <input type="submit" />
      </form>
    </>
  );
}

export default MyForm4;