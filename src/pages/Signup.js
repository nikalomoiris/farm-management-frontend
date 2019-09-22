import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Logo from "../images/icon.png";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
// Redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const useStyles = makeStyles(theme => ({
    form: {
        textAlign: "center"
    },
    image: {
        width: "50px",
        margin: "20px auto 20px auto"
    },
    pageTitle: {
        margin: "10px auto 10px auto"
    },
    textField: {
        margin: "10px auto 10px auto"
    },
    button: {
        marginTop: 40,
        position: "relative"
    },
    customError: {
        color: "red",
        fontSize: "0.8rem",
        marginTop: "30px"
    },
    progress: {
        position: "absolute"
    }
}));

const Signup = props => {
    const classes = useStyles();

    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        handle: "",
        errors: {}
    });

    const handleSubmit = event => {
        event.preventDefault();
        setState({
            ...state,
            loading: true
        });
        const newUserData = {
            email: state.email,
            password: state.password,
            confirmPassword: state.confirmPassword,
            handle: state.handle
        };
        props.signupUser(newUserData, props.history);
    };

    const handleChange = event => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    useEffect(() => {
        if (props.ui.errors) {
            setState({
                ...state,
                errors: props.ui.errors
            });
        }
    }, [props.ui.errors]);

    return (
        <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
                <img src={Logo} alt="Logo" className={classes.image} />
                <Typography variant="h4" className={classes.pageTitle}>
                    Signup
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        helperText={state.errors.email}
                        error={state.errors.email ? true : false}
                        className={classes.TextField}
                        value={state.email}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        helperText={state.errors.password}
                        error={state.errors.password ? true : false}
                        className={classes.TextField}
                        value={state.password}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        helperText={state.errors.confirmPassword}
                        error={state.errors.confirmPassword ? true : false}
                        className={classes.TextField}
                        value={state.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        id="handle"
                        name="handle"
                        type="text"
                        label="Handle"
                        helperText={state.errors.handle}
                        error={state.errors.handle ? true : false}
                        className={classes.TextField}
                        value={state.handle}
                        onChange={handleChange}
                        fullWidth
                    />
                    {state.errors.general && (
                        <Typography
                            variant="body2"
                            className={classes.customError}
                        >
                            {state.errors.general}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={props.ui.loading}
                    >
                        Signup
                        {props.ui.loading && (
                            <CircularProgress
                                size={30}
                                className={classes.progress}
                            />
                        )}
                    </Button>
                    <br />
                    <small>
                        already have an account? login
                        <Link to="/signup">here</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    );
};

const mapStateToProps = state => ({
    user: state.user,
    ui: state.UI
});

const mapActionsToProps = {
    signupUser
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Signup);
