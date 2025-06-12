import Header from "./Header";
import background from '../background.jpg';
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { CheckValidData } from "../utils/validate";

const Login = () => {
    const [isSigninForm, setIsSigninForm] = useState(true);
    const [errMessage, setErrMessage] = useState(null);

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);

    const toggleSigninForm = () => {
        setIsSigninForm(!isSigninForm);
    }
    const handleButtonClick = () => {
        // Validate form fields.
        const name_value = !isSigninForm ? name.current.value : null;
        const message = CheckValidData(email.current.value, password.current.value, name_value);
        setErrMessage(message);

        // Do signin or Signup based on form.    
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
                    onSubmit={(e) => e.preventDefault()}
                >
                    <h1 className="font-bold text-3xl py-4">{isSigninForm ? 'Sign In' : 'Sign Up'}</h1>
                    {!isSigninForm && <input
                        type="text"
                        ref={name}
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
                        ref={email}
                        style={{
                            backgroundColor: "#80808008",
                            border: "1px solid"
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 my-4 w-full bg-grey-700"
                        ref={password}
                        style={{
                            backgroundColor: "#80808008",
                            border: "1px solid"
                        }}
                    />
                    <p className="text-red-500 font-bold">{errMessage}</p>
                    <button
                        className="p-2 my-4 bg-red-700 w-full"
                        onClick={handleButtonClick}
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