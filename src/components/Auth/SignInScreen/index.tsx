import React, { useContext, useState } from 'react';
import firebase from 'firebase/app';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { UIContext } from '../../Unknown/UIContext';
import hero from '../../../heroImage.png';
import logo from '../../../Vector.svg';

const SignInScreen: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disadled, setEnableButton] = useState(false);
  const [emailInvalid, setEmailValid] = useState(false);
  const [passwordInvalid, setPasswordValid] = useState(false);
  const [passwordType, setPasswordType] = useState('password');

  const handleChangeEmail = (event: any) => {
    setEmail(event.target.value);
    setEmailValid(false);
  };

  const handleChangePassword = (event: any) => {
    setPassword(event.target.value);
    setPasswordValid(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (email === '') {
      setEmailValid(true);
    }
    if (password === '') {
      setPasswordValid(true);
    }
    setEnableButton(true);
    // for test: email: 'admin@test.com', password: 'adminadmin'
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.error(error);
      })
      .then(() => {
        setEnableButton(false);
      });
  };

  const handleSignIn = React.useCallback(async () => {
    setAlert({
      show: true,
      severity: 'info',
      message: 'Sign in button was clicked.',
    });
  }, [setAlert]);

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
      return;
    }
    setPasswordType('password');
  };

  return (
    <>
      <Box
        height="100vh"
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box height="100vh" width="50%">
          <img src={hero} width="100%" alt="login-store" />
        </Box>
        <Box
          height="100vh"
          width="50%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Toolbar>
            <img src={logo} alt="logo" />
          </Toolbar>
          <Typography component="h1" variant="h4" sx={{ m: 7 }}>
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              error={emailInvalid}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChangeEmail}
            />
            <Box
              display="flex"
              alignItems="center"
              style={{ position: 'relative' }}
            >
              <TextField
                error={passwordInvalid}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={passwordType}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChangePassword}
              />
              <Button
                onClick={togglePassword}
                style={{ padding: '0', position: 'absolute', right: '0' }}
              >
                {passwordType === 'password' ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </Button>
            </Box>
            <Button
              type="submit"
              fullWidth
              disabled={disadled}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignIn}
              style={{
                backgroundColor: '#F50057',
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignInScreen;
