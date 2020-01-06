import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import mainTheme from './util/mainTheme';
import AuthRoute from './util/AuthRoute';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './redux/store';
import {logoutUser, getUserData} from './redux/actions/userActions';
import {SET_AUTHENTICATED} from './redux/types';
import axios from 'axios';

// MUI stufff
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import users from "./pages/users";

//Components
import Navbar from "./components/Navbar";
const theme = createMuiTheme(mainTheme);

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp*1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/users/:handle" component={users} />
              <AuthRoute exact path="/login"  component={login} />
              <AuthRoute exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
