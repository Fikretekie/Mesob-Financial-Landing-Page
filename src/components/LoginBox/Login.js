import React from "react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="login-box">
      <Image src="/logo.png" alt="Logo" className="logo_img" width={100} height={100} />
      <h2>Login</h2>
      <p>Welcome! Login to access the Mesob Store</p>
      <form>
        <div className="login-input-group">
          <label>Email</label>
          <input type="email" required autoComplete="on" />
        </div>
      </form>
    </div>
  );
};

export default Login;

  