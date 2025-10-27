import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Stack,} from "@mui/material";
import AppList from "./AppList";

type User = {
  username: string;
  password: string;
}


function Login() {

  const [user, setUser] = useState<User>({
    username:"",
    password:"",
  });

  const [isAuth, setAuth] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
  axios.post(`${import.meta.env.VITE_API_URL +"/login"}`,user,{
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(res => {
    const jwtToken = res.headers.authorization;
    if(jwtToken !== null){
      sessionStorage.setItem("jwt", jwtToken);
      setAuth(true);
    }
  }).catch(err => {
  console.log("실패" + err);})
}

  if (isAuth) {
    return <AppList />
  } else {
    return (
      <Stack spacing={2} alignItems="center" mt={2}>
        <TextField
          name="username"
          label="Username"
          onChange={handleChange}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
        />
        <Button variant="contained"
          color="primary"
          onClick={handleLogin}>login
        </Button >
      </Stack>
    )
  }
}

export default Login;