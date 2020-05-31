import React, { useState, useEffect } from 'react';
import { IUser, IResponseError } from './components/User/interfaces';
import { makeStyles } from '@material-ui/core/styles';
import SignIn from './components/SignIn';
import Alert from './components/error';
import { checkAuth, getPosts } from './api';
import { IFeedProps, IFeedItem } from './components/Feed/interfaces'
import Feed from './components/Feed'

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
  const [feedItems, setFeedItems] = useState<IFeedItem[]>([]);
  const classes = useStyles();

  useEffect(() => {
    if (!authChecked) {
      checkAuth()
        .then((user: IUser) => {
          setAuthChecked(true);
          setUser(user);
        })
        .catch(() => setAuthChecked(true))
    } else if (user) {
      getPosts()
        .then((items: IFeedItem[]) => setFeedItems(items))
        .catch((e: IResponseError) => setError(e));
    }
  }, [user, authChecked]);

  return (
    <div className="App">
      {error && <Alert errorMessage={error.body || "Unknown Error"} />}
      {authChecked ? (
        user ? (
          <Feed items={feedItems}/>
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
