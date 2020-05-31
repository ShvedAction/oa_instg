import React, { useState, useEffect } from 'react';
import { IUser, IResponseError } from './components/User/interfaces';
import { makeStyles } from '@material-ui/core/styles';
import SignIn from './components/SignIn';
import Alert from './components/error';
import { checkAuth, getPosts, setLike, setDisLike, uploadImage, logout } from './api';
import { IFeedItem } from './components/Feed/interfaces'
import Feed from './components/Feed'
import SignUp from './components/SignUp/SignUp';

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
  const [signInPage, setSignInPage] = useState<boolean>(true)

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

  const incLikes = (item: IFeedItem) => {
    setLike(item.id);
    return Object.assign(item, {
      likesCount: item.likesCount + 1,
      likedPost: true
    });
  }

  const decLikes = (item: IFeedItem) => {
    setDisLike(item.id);
    return Object.assign(item, {
      likesCount: item.likesCount - 1,
      likedPost: false
    });
  }

  const updateFeed = (id: number, transformer: (item: IFeedItem) => IFeedItem) => {
    setFeedItems(feedItems.map((curr) => (curr.id === id) ? transformer(curr) : curr));
  }

  const signOut = () => {
    logout()
    setUser(null)
  }

  return (
    <div className="App">
      {error && <Alert errorMessage={error.body || "Unknown Error"} />}
      {authChecked ? (
        user ? (
          <Feed
            items={feedItems}
            onLike={(item) => updateFeed(item.id, incLikes)}
            onDislike={(item) => updateFeed(item.id, decLikes)}
            onUpload={(data) => uploadImage(data)}
            onLogout={signOut}
          />
        ) :
          (
            signInPage ?
              <SignIn
                setError={setError}
                setUser={setUser}
                setSignInPage={setSignInPage} />
              :
              <SignUp
                setError={setError}
                setUser={setUser}
                setSignInPage={setSignInPage} />
          )
      ) : (
          <div>Loading...</div>
        )}
    </div>
  );
}

export default App;
