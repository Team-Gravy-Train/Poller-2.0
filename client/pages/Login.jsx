import React from "react";
// import { AuthContext } from '../context/AuthContext.jsx';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    // const { setCurrentUser } = useContext(AuthContext);
    const usernameInput = useRef();
    const passwordInput = useRef();
    const navigate = useNavigate();

    const getUser = async (e) => {
        e.preventDefault();

        const { username, password } = user;

        const reqBody = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: usernameInput.current.value,
                password: passwordInput.current.value
            })
        }
        // url?
        const result = await fetch('', reqBody);
        const data = await rseult.json();

        setCurrentUser(data);
        navigate('/home');
    }

    return (
        <div>
            <h1>Log In</h1>
            <form>
                <label>
                    <input
                        type="text"
                        placeholder="Username"
                    ></input>
                </label>
            </form>
            <form>
                <label>
                    <input
                        type="password"
                        placeholder="Password"
                    ></input>
                </label>
            </form>
            <form>
                <button onClick={getUser}>Log In!</button>
            </form>
        </div>
    );
}

export default Login;
