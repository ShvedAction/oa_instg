import React, { useState, useEffect } from 'react';
import { IUser, IResponseError } from './components/User/interfaces';
import { makeStyles } from '@material-ui/core/styles';
import SignIn from './components/SignIn';
import Alert from './components/error';
import { checkAuth } from './api';

const useStyles = makeStyles(() => ({
  error: {
    position: 'fixed',
    right: '10px',
    top: '10px',
    padding: '10px',
    outline: '1px solid lightgray'
  }
}));

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [error, setError] = useState<IResponseError | null>(null);
  const classes = useStyles();

  useEffect(() => {
    if (authChecked) {
      return;
    }
    checkAuth()
      .then((user: IUser) => {
        setAuthChecked(true);
        setUser(user);
      })
      .catch(() => setAuthChecked(true))
  }, [authChecked]);

  return (
    <div className="App">
      {error && <Alert errorMessage={error.body || "Unknown Error"} />}
      {authChecked ? (
        user ? (
          <div>feed</div>
        ) : 
        (
          <SignIn
            setError={setError}
            setUser={setUser} />
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
