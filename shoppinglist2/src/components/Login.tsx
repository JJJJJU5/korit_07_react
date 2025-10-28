import { ChangeEvent, useState } from "react";
import { Button, TextField, Snackbar, Divider, Box, CircularProgress, Stack, Alert } from "@mui/material";
import { AccountCredentials } from "../type";
import { login, authenticateWithGoogleToken } from "../api/shoppingapi";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

type LoginProps = {
  loginSuccess: () => void;
}

function Login({ loginSuccess }: LoginProps) {
  const [user, setUser] = useState<AccountCredentials>({ username: '', password: '' });
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Login failed');
  const [loading, setLoading] = useState(false);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // 아이디 / 비밀번호 로그인
  const handleUsernamePasswordLogin = () => {
    if(!user.username || !user.password){
      //유효성 검사 
      setErrorMsg("아이다와 비밀번호를 확인해주세요");
      setOpen(true)
      return;
    }
    setLoading(true); // 로딩 시작
    login(user).then(authorizationHeader => {
      sessionStorage.setItem('jwt', authorizationHeader)
      loginSuccess();
    })
      .catch(err => {
        console.log("Login error : ", err);
        setErrorMsg(err.message || "예상하지 못한 로그인 관련 에러가 발생했습니다.")
        setOpen(true)
      })
      .finally(() => {
        setLoading(false) // 로딩 종료
      })
  };

  // Google 로그인 관련
  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log('Google Login Success(Frontend상황에서) : ', credentialResponse);
    if (credentialResponse.credential) {
      setLoading(true);
      try {
        // Google ID 토큰을 백엔드로 보내서 JWT 받아오는 과정
        const backendJwt = await authenticateWithGoogleToken(credentialResponse.credential);
        sessionStorage.setItem('jwt', backendJwt)
        loginSuccess();
      }
      catch (error: any) {
        console.log('구글 로그인 후에 백엔드 부분에서 인증 실패했습니다', error);
        setErrorMsg(`구글 로그인은 성공 백엔드 부분에서 문제 발생 ${error?.message || '알수없는 에러'}`)
      }
      finally {
        setLoading(false)
      }}
    else {
      console.error('응답 결과에서 Google Credential을 찾을 수 없습니다.');
      setErrorMsg('Google Login Failed : Credential Not Found');
      setOpen(true);
    }
  };

  // Google 로그인 실패 관련 callback
  const handleGoogleLoginError = () => {
    console.log('Google Login Failed (Frontend)');
    setErrorMsg('구글 로그인 자체가 실패했습니다. 다시 시도하거나 잠시후 시도해주세요')
    setOpen(true);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) { // 로딩 중일 때는 엔터키로 로그인 불가
      handleUsernamePasswordLogin();
    }
  }

  return (
  <>
    <Stack spacing={2} alignItems="center" mt={10}>
      <h2>Login</h2>
    <TextField
    name="username"
    label="Username"
    onChange={handleChange}
    onKeyPress={handleKeyPress}
    disabled={loading}
    autoFocus
    sx={{width:"300px"}}/>
    
    <TextField
    type="password"
    name="password"
    label="Password"
    onChange={handleChange}
    onKeyPress={handleKeyPress}
    disabled={loading}
    sx={{width:"300px"}}
    />
    <Button
    variant="contained"
    color="primary"
    onClick={handleUsernamePasswordLogin}
    disabled={loading}
    sx={{width:"300px"}}>
    {loading ? <CircularProgress size={24} color="inherit"/> : 'Login with Username'}
    </Button>
    <Divider sx={{width:"300px",my: 2}}>OR</Divider>

    {/*Google 로그인 버튼 부분*/}
    <Box sx={{width:"300px", display:'flex' , justifyContent:'center', opacity: loading? 0.5 : 1}}>
      {/** Loading 중일 때는 Google 버튼을 숨기거나 비활성화. 근데 위에 투명도 조절 */}
      {!loading && (
        <GoogleLogin 
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginError}
        useOneTap={false}
        />
      )}
      {loading && <CircularProgress size={24}/>}
    </Box >
    </Stack>
    <Snackbar
    open={open}
    autoHideDuration={4000}
    onClose={() => setOpen(false)}
    anchorOrigin={{vertical: "bottom", horizontal : "center"}}>

      <Alert severity="error" onClose={() => setOpen(false)}>
        {errorMsg}
      </Alert>
    </Snackbar>
  </>
  )

}

export default Login