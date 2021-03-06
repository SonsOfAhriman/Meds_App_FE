import React from "react";
import axios from "axios";
import UseForm from "../UseForm/UseForm";
import { Link } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";
import { useHistory } from "react-router-dom";
import { ROOT_URL } from "../../apiRoot";
import "./Login.css";

const Login = () => {
    const { values, handleChange, handleSubmit } = UseForm(login);
    const { setJwt, userHasAuthenticated, setLoggedInUser} = useAppContext();
    const history = useHistory();

    //After login, take the user to home page and set token value in isAuthenticated variable from localStorage
    async function login() {
        await axios
            .post(`${ROOT_URL}api/v1/sign_in`, { "user": values })
            .then((response) => {
                
                localStorage.setItem("token", response.data.data.user.authentication_token);
                let parsedUser = JSON.parse(response.config.data);
                console.log(localStorage.getItem("token"));
                setLoggedInUser(parsedUser);
                console.log(parsedUser);
                localStorage.setItem('email', parsedUser.user.email)
                localStorage.setItem('password', parsedUser.user.password)
                userHasAuthenticated(true);
                setJwt(localStorage.getItem("token"));
                history.push("/home");
            })
            .catch((error) => {
                console.log(error);
                alert(error.response.data);
            });
    }

    return (
        <div className="container form-group">
            <h1 className="login-title">User Login</h1>
            <form onSubmit={handleSubmit} className="container">
                <label className="form-label">Email </label>
                <input
                    className="form-control"
                    name="email"
                    value={values.email || ""}
                    onChange={handleChange}
                />
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    value={values.password || ""}
                    className="form-control"
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ margin: "20px" }}>
                    Submit
                </button>
            </form>

            <Link to="/home">
                <button className="btn btn-dark">Back to Home </button>
            </Link>
        </div>
    );
};

export default Login;