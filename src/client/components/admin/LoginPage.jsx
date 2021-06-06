import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import useSubmit from "../../hooks/useSubmit";
import InputField from "../shared/InputField";

const LoginPage = ({ api, updateUser }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [inputError, setInputError] = useState("");
    const history = useHistory();

    const { handleSubmit: handleLogin, submitting, error } = useSubmit(
        async () => {
            await api.auth.logIn({ username, password });
        },
        async () => {
            await updateUser();
            history.push("/admin");
        }
    );

    const validateInput = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setInputError("Vennligst fyll inn begge feltene");
            return;
        }
        handleLogin(e);
        setInputError("");
    }

    return (
        <div id="login-page-container">
            <div id="login-card">
                <Link to="/">← Hovedside</Link>
                <h2>Admin - Logg Inn</h2>
                <form onSubmit={validateInput}>
                    {submitting && <h4>Vennligst vent...</h4>}
                    {error && <h4>{error.toString()}</h4>}
                    {inputError && <h4>{inputError.toString()}</h4>}
                    <InputField
                        name={"username"}
                        placeholder={"Brukernavn"}
                        value={username}
                        onValueChange={setUsername}
                    />
                    <InputField
                        name={"password"}
                        placeholder={"Passord"}
                        type={"password"}
                        value={password}
                        onValueChange={setPassword}
                    />
                    <button disabled={submitting}>LOGG INN</button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;