import React from "react";
import { useAuth } from "../providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const {
    registerUser,
    loading,
    error,
    signInWithGoogle,
   
  } = useAuth();

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    registerUser(email, password)
      .then((userCredential) => {
        console.log("User registered:", userCredential.user);
        form.reset();
      })
      .catch((error) => {
        console.error("Error registering user:", error.code, error.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => console.log("Google sign-in:", result.user))
      .catch((error) => console.error("Google sign-in error:", error));
  };

 

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
           
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <fieldset className="fieldset">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input"
                    placeholder="Email"
                    required
                  />
                  <label className="label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input"
                    placeholder="Password"
                    required
                  />
                  <div>
                    <a className="link link-hover">Already Have an Account?</a>
                  </div>

                  <div className="flex flex-col items-center text-4xl gap-3 ">
                    <p className="text-xl font-bold">Or register with:</p>
                    <div className="flex gap-8 ">
                    <Link
                      
                      onClick={handleGoogleSignIn}
                      className="google hover:bg-blue-400 p-2 rounded-2xl hover:text-white "
                    >
                      <FaGoogle />
                    </Link>
                   
                    </div>
                    
                    
                    </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-neutral mt-4 "
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;