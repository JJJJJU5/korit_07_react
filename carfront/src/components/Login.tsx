import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Stack, Snackbar } from "@mui/material";
import Carlist from "./Carlist";

type User = {
  username: string;
  password: string;
}



function Login() {
  useEffect(() => {
    if (sessionStorage.getItem("jwt") !== null) {
      setAuth(true)
    }
  }, []) // 자동 로그

  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setUser({
    ...user, [e.target.name]: e.target.value,
  });

  const handleLogin = async () => {
    console.log(sessionStorage.getItem("jwt"))
    axios.post(`${import.meta.env.VITE_API_URL + "/login"}`, user, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => {
        const jwtToken = res.headers.authorization;
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          setAuth(true)
        }
      }
      ).catch(err => {console.log(err) 
        setOpen(true)})
  }

  if (isAuthenticated) {
    return <Carlist />
  } else {
    return (
      <>
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
          <Button variant="outlined"
            color="primary"
            onClick={handleLogin} >login
          </Button>
        </Stack>
        <Snackbar open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message='로그인실패'/>
      </>
    );
  }
}
export default Login;
