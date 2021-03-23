import {
  createStyles,
  makeStyles,
  Typography,
  Card,
  TextField,
  Checkbox,
  Button,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Router from 'next/router';
import React from 'react';
import { Status, AuthenticateUserConfig, AuthResponse, Claims } from '../../types';
import { authenticateUser } from '../../api/user';
import jwtDecode from 'jwt-decode';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginPanel: {
      backgroundColor: theme.colors.bgColor1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      height: '100vh',
      display: 'flex',
    },
    activeArea: {
      width: '80%',
      margin: 'auto',
      textAlign: 'center',
    },
    logo: {
      display: 'block',
      margin: `${theme.spacing(6)}px auto`,
    },
    title: {
      margin: `${theme.spacing(6)}px auto`,
      fontWeight: 'bold',
      fontSize: '2rem',
    },
    loginTitle: {
      margin: `0 auto`,
      padding: `0 0 ${theme.spacing(3.875)}px`,
      fontWeight: 'bold',
      fontSize: '1.75rem',
    },
    cardRoot: {
      minWidth: 300,
      maxWidth: 512,
      minHeight: 200,
      backgroundColor: '#1d2b37',
      borderRadius: 16,
      margin: '0 auto',
      padding: `${theme.spacing(5)}px 0`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
    },
    loginInputGroup: {
      margin: '0 auto',
      width: '60%',
      textAlign: 'left',
    },
    textField: {
      display: 'block',
    },
    inputRoot: {
      width: '100%',
      padding: `${theme.spacing(1.125)}px 0`,
    },
    input: {
      textAlign: 'center',
      backgroundColor: 'white',
      height: '1.75rem',
      fontSize: '1rem',
    },
    stayLogin: {
      padding: `${theme.spacing(1.125)}px 0`,
      display: 'flex',
      opacity: '80%',
    },
    stayLoginText: {
      fontSize: '0.83rem',
      lineHeight: '24px',
      fontWeight: 300,
    },
    checkbox: {
      padding: 0,
      marginLeft: '-4px',
    },
    colorPrimary: {
      color: 'white',
    },
    loginButton: {
      borderRadius: 8,
      margin: `${theme.spacing(1.125)}px 0`,
      width: 120,
      fontWeight: 'bold',
    },
    forgetText: {
      fontSize: '0.83rem',
      lineHeight: '24px',
      fontWeight: 300,
      opacity: '80%',

      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
    error: {
      color: 'red',
    },
  }),
);

const LoginPanel = () => {
  const classes = useStyles();
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [stayLogin, setStayLogin] = React.useState<boolean>(false);
  const [fetchLoginStatus, setFetchLoginStatus] = React.useState<Status>(
    Status.blank,
  );
  const [failureMessage, setFailureMessage] = React.useState<string>('');

  React.useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      if (fetchLoginStatus !== Status.inProgress) return;
      try {
        const authConfig: AuthenticateUserConfig = {
          username,
          password,
        };
        const result: AuthResponse = await authenticateUser(authConfig);
        const accessToken = result.access_token;
        const refreshToken = result.refresh_token;
        const claims: Claims = jwtDecode(accessToken || '');
        if (stayLogin) {
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);
          localStorage.setItem('token_exp', claims.exp);
        } else {
          sessionStorage.setItem('access_token', accessToken);
          sessionStorage.setItem('refresh_token', refreshToken);
          sessionStorage.setItem('token_exp', claims.exp);
        }
        await Router.push('/');
      } catch (err) {
        if (!ignore) {
          if (err.response.data.info === 'login fail'){
            setFailureMessage('用戶名或密碼錯誤')
          } else {
            setFailureMessage('出錯了');
          }
          setFetchLoginStatus(Status.failure);
        }
      }
    };
    fetchData();
  },[fetchLoginStatus]);

  const handleLoginClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFetchLoginStatus(Status.inProgress);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleStayLoginChange = () => {
    setStayLogin(!stayLogin);
  };

  const renderInputGroup = () => (
    <div className={classes.loginInputGroup}>
      {renderUsernamePanel()}
      {renderPasswordPanel()}
      {renderStayLoginPanel()}
    </div>
  );

  const renderUsernamePanel = () => (
    <TextField
      label=''
      placeholder="用戶名"
      value={username}
      onChange={handleUsernameChange}
      required
      InputLabelProps={{
        shrink: false,
      }}
      classes={{
        root: classes.textField,
      }}
      InputProps={{
        disableUnderline: true,
        classes: {
          root: classes.inputRoot,
          input: classes.input,
        },
      }}
    />
  );

  const renderPasswordPanel = () => (
    <TextField
      placeholder="密碼"
      type="password"
      value={password}
      onChange={handlePasswordChange}
      required
      classes={{
        root: classes.textField,
      }}
      InputProps={{
        disableUnderline: true,
        classes: {
          root: classes.inputRoot,
          input: classes.input,
        },
      }}
    />
  );

  const renderStayLoginPanel = () => (
    <div className={classes.stayLogin}>
      <Checkbox
        checked={stayLogin}
        onChange={handleStayLoginChange}
        className={classes.checkbox}
        color="primary"
        classes={{
          checked: classes.colorPrimary,
          colorPrimary: classes.colorPrimary
        }}
      />
      <Typography variant='body1' className={classes.stayLoginText}>保持登入30日</Typography>
    </div>
  );

  const renderErrorMessage = () => (
    <Typography variant='body1' className={classes.error}>{failureMessage}</Typography>
  );

  return (
    <div id="login-page" className={classes.loginPanel}>
      <div className={classes.activeArea}>
        <img src="/static/images/blutech_logo_new_white.svg" className={classes.logo} />
        <Typography variant='h1' className={classes.title}>智能洗手間管理平台</Typography>
        <Card className={classes.cardRoot}>
          <Typography variant='h1' className={classes.loginTitle}>登入</Typography>
          <form onSubmit={handleLoginClick} className={classes.form}>
            {renderInputGroup()}
            {renderErrorMessage()}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.loginButton}
            >
              登入
            </Button>
          </form>
          {/* <Typography variant='body1' className={classes.forgetText}>忘記用戶名或密碼？</Typography> */}
        </Card>
      </div>
    </div>
  );
};

export default LoginPanel;