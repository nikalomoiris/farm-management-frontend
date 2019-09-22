import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import axios from "axios";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

// Pages
import Home from "./pages/Home";
import login from "./pages/Login";
import signup from "./pages/Signup";
import Axios from "axios";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#4fb3bf",
            main: "#00838f",
            dark: "#005662",
            contrastText: "#ffffff"
        },
        secondary: {
            light: "#a98274",
            main: "#795548",
            dark: "#4b2c20",
            contrastText: "#ffffff"
        }
    },
    typography: {
        useNextVariants: true
    }
});

const token = localStorage.FBIdToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = "/login";
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        store.dispatch(getUserData());
    }
}

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <Router>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <AuthRoute path="/login" component={login} />
                            <AuthRoute path="/signup" component={signup} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        </MuiThemeProvider>
    );
};

export default App;