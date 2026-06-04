import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      }

      if (res.data.role === "USER") {
        navigate("/user");
      }

      if (res.data.role === "OWNER") {
        navigate("/owner");
      }

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">

          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            SR
          </div>

          <h1 className="text-3xl font-bold text-slate-800 mt-5">
            Store Rating
          </h1>

          <p className="text-slate-500 mt-2">
            Sign in to your account
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="mb-4">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
              className="
              w-full
              px-4
              py-3
              border
              border-slate-300
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
              "
            />

          </div>

          <div className="mb-6">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              className="
              w-full
              px-4
              py-3
              border
              border-slate-300
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition
              "
            />

          </div>

          <button
            type="submit"
            className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-xl
            font-semibold
            shadow-md
            transition
            duration-300
            "
          >
            Sign In
          </button>

        </form>

        <div className="text-center mt-6">

          <span className="text-slate-500">
            Don't have an account?
          </span>

          <Link
            to="/register"
            className="ml-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            Register
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;