import React, {useState} from 'react';
import {signInWithGoogle} from '../helpers/auth';

function Login() {
  const [error, setError] = useState(null);

  const googleSignIn = () => {
    try {
      signInWithGoogle();
    } catch(error) {
      setError(error.message);
    }
    console.log(error);
  }

  return (
    <div>
      <button className="btn" type="button" onClick={googleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default Login;