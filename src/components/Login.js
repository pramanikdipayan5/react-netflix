import Header from "./Header";
import background from '../background.jpg';
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [isSigninForm, setIsSigninForm] = useState(true);
    const toggleSigninForm = () => {
        setIsSigninForm(!isSigninForm);
    }
    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    src={background}
                    alt="Login Background"
                    className="login-background"
                />
            </div>
            <div>
                <form
                    className="w-3/12 absolute p-12  my-36 mx-auto right-0 left-0 text-white"
                    style={{ backgroundColor: "#000000e3" }}
                >
                    <h1 className="font-bold text-3xl py-4">{isSigninForm ? 'Sign In' : 'Sign Up'}</h1>
                    {!isSigninForm && <input
                        type="text"
                        placeholder="Name"
                        className="p-2 my-4 w-full bg-gray-1000"
                        style={{
                            backgroundColor: "#80808008",
                            border: "1px solid"
                        }}
                    />
                    }
                    <input
                        type="email"
                        placeholder="Email or mobile number"
                        className="p-2 my-4 w-full bg-gray-1000"
                        style={{
                            backgroundColor: "#80808008",
                            border: "1px solid"
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 my-4 w-full bg-grey-700"
                        style={{
                            backgroundColor: "#80808008",
                            border: "1px solid"
                        }}
                    />
                    <button
                        className="p-2 my-4 bg-red-700 w-full"
                    >
                        {isSigninForm ? 'Sign In' : 'Sign Up'}
                    </button>
                    <p className="p-2 my-4 cursor-pointer" onClick={toggleSigninForm}>
                        {isSigninForm ?
                            "New to Netflix? Sign up now."
                            :
                            "Already registered? Sign in"
                        }
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;