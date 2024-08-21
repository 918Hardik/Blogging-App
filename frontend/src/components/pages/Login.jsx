import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Context } from '../../main'
import toast from 'react-hot-toast'
import { Navigate, useNavigate ,Link} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { mode, isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios.post("https://blogging-app-backend-mqk7.onrender.com/api/v1/user/login", { email, password, role }, { withCredentials: true, headers: { "Content-Type": "application/json" } })
      .then(res => {
        toast.success(res.data.message);
        setEmail("");
        setPassword("");
        setRole("");
        navigateTo("/");
      }).catch((error) => {
        toast.error(error.response.data.message);
      });
  }
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
        <section className="auth-form">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">SELECT ROLE</option>
              <option value="Reader">READER</option>
              <option value="Author">AUTHOR</option>
            </select>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p>
              Don't have any account? <Link to={"/register"}>Register Now</Link>
            </p>
            <button className="submit-btn" type="submit">
              LOGIN
            </button>
          </form>
        </section>
      </article>
    </>
  )
}

export default Login
