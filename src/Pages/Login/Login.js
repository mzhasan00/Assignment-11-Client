import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { AuthContext } from '../../Context/Authprovider/Authprovider';

const Login = () => {
    
    //Login with email and password
    const {login, providerLogin} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';
    
    //Login with email and pass
    const handleLogin = event =>{
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
        .then( result => {
            const user = result.user;
            navigate(from, {replace: true});
        })
        .catch(error => console.error(error));
    }

    //Login with Google
    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = () =>{
        providerLogin(googleProvider)
        .then(result =>{
            const user = result.user;
            navigate(from, {replace: true});
        })
        .catch(err => console.error(err))
    }

    return (
        <div className="hero my-20">
            <div className="hero-content flex-col lg:flex-row my-10 py-10">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <h1 className="text-4xl text-center font-bold">Login now!</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <div className="form-control my-8">
                        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-primary">Google Signin</button>
                    </div>
                    <p className='text-center my-5'>New User? <Link to="/signup" className='text-orange-600 font-bold'>Sign Up</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;