import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });

  };

  const validateForm = () => {

    const newErrors = {};

    if (
      form.name.trim().length < 20 ||
      form.name.trim().length > 60
    ) {
      newErrors.name =
        "Name must be between 20 and 60 characters";
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(form.email)
    ) {
      newErrors.email =
        "Please enter a valid email address";
    }

    if (
      form.address.length > 400
    ) {
      newErrors.address =
        "Address cannot exceed 400 characters";
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

    if (
      !passwordRegex.test(
        form.password
      )
    ) {
      newErrors.password =
        "Password must be 8-16 characters and include 1 uppercase letter and 1 special character";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {

      await API.post(
        "/auth/register",
        form
      );

      alert(
        "Registration Successful"
      );

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">

        <div className="text-center mb-6">

          <div className="w-14 h-14 bg-blue-600 rounded-xl mx-auto flex items-center justify-center text-white text-xl font-bold shadow-md">
            SR
          </div>

          <h1 className="text-4xl font-bold text-slate-800 mt-4">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Join Store Rating Platform
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}

          <div className="mb-4">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              minLength={20}
              maxLength={60}
              required
              className="
              w-full
              px-4
              py-2.5
              border
              border-slate-300
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name}
              </p>
            )}

          </div>

          {/* Email */}

          <div className="mb-4">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="
              w-full
              px-4
              py-2.5
              border
              border-slate-300
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}

          </div>

          {/* Address */}

          <div className="mb-4">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Address
            </label>

            <textarea
              name="address"
              placeholder="Enter your address"
              value={form.address}
              onChange={handleChange}
              maxLength={400}
              rows="3"
              required
              className="
              w-full
              px-4
              py-2.5
              border
              border-slate-300
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

            <div className="text-xs text-slate-500 mt-1">
              {form.address.length}/400
            </div>

            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address}
              </p>
            )}

          </div>

          {/* Password */}

          <div className="mb-5">

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              maxLength={16}
              required
              className="
              w-full
              px-4
              py-2.5
              border
              border-slate-300
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

            <p className="text-xs text-slate-500 mt-1">
              Must contain 8-16 characters, 1 uppercase letter and 1 special character.
            </p>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}

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
            shadow-lg
            transition-all
            duration-300
            "
          >
            Create Account
          </button>

        </form>

        <div className="text-center mt-5">

          <span className="text-slate-500">
            Already have an account?
          </span>

          <Link
            to="/"
            className="ml-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;