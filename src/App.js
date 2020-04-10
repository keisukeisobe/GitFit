import React, {useState, useEffect} from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import {auth} from './services/firebase';
import Login from './pages/login';
import Workout from './pages/workout';
import About from './pages/about';
import Test from './pages/test';

//if user is NOT authenticated, take them to /login
function PrivateRoute({component: Component, authenticated}){
  return (
    <Route 
      render = {
        props => authenticated === true ? 
        (<Component {...props} />): (<Redirect to= { {pathname: '/login', state: {from : props.location}} }/>)
      }
    />
  )
}

//if user is NOT authenticated, take them to the main page
function PublicRoute({component: Component, authenticated}){
  return (
    <Route
      render = {
        props => authenticated === false ?
        (<Component {...props} />) : (<Redirect to={'/'} />)
      }
    />
  )
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
        console.log(auth().currentUser.uid);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    });
  });

  return (
    loading ? (
      <div className="loading-screen" role="status">
        <p className="loading-text">Loading...</p>
      </div>
    ) : (
      <Router>
        <Switch>
          <Route exact path="/" component={About} />
          <PrivateRoute path="/workout" authenticated={authenticated} component={Workout} />
          <PrivateRoute path="/test" authenticated={authenticated} component={Test} />
          <PublicRoute path="/login" authenticated={authenticated} component={Login} />
        </Switch>
      </Router>
    )
  );
}

export default App;
