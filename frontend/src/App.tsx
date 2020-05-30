import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn';

interface IUser{
  email: string
}

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <div className="App">
      {user ? <div>feed</div> : <SignIn setUser={setUser} />}
    </div>
  );
}

export default App;
