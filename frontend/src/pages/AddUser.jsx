import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddUser() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "USER",
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

      await API.post(
        "/admin/users",
        form
      );

      alert(
        "User Added Successfully"
      );

      navigate(
        "/admin/users"
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to Add User"
      );

    }

  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}

        <div className="bg-blue-600 px-8 py-5 text-white">

          <h1 className="text-2xl font-bold">
            Add User
          </h1>

          <p className="text-blue-100 mt-1">
            Create a new user account
          </p>

        </div>

        {/* Form */}

        <div className="p-6">

          <form onSubmit={handleSubmit}>

            <div className="grid md:grid-cols-2 gap-5">

              {/* Full Name */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter full name"
                  onChange={handleChange}
                  required
                  className="
                  w-full
                  px-4
                  py-2.5
                  text-sm
                  border
                  border-slate-300
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  "
                />

              </div>

              {/* Email */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  onChange={handleChange}
                  required
                  className="
                  w-full
                  px-4
                  py-2.5
                  text-sm
                  border
                  border-slate-300
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  "
                />

              </div>

              {/* Address */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  onChange={handleChange}
                  required
                  className="
                  w-full
                  px-4
                  py-2.5
                  text-sm
                  border
                  border-slate-300
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  "
                />

              </div>

              {/* Role */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  User Role
                </label>

                <select
                  name="role"
                  onChange={handleChange}
                  className="
                  w-full
                  px-4
                  py-2.5
                  text-sm
                  border
                  border-slate-300
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  "
                >

                  <option value="USER">
                    USER
                  </option>

                  <option value="OWNER">
                    OWNER
                  </option>

                  <option value="ADMIN">
                    ADMIN
                  </option>

                </select>

              </div>

              {/* Password */}

              <div className="md:col-span-2">

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  required
                  className="
                  w-full
                  px-4
                  py-2.5
                  text-sm
                  border
                  border-slate-300
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  "
                />

              </div>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3 mt-8">

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/users")
                }
                className="
                px-5
                py-2.5
                rounded-xl
                bg-slate-200
                hover:bg-slate-300
                text-slate-700
                font-medium
                transition
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                px-6
                py-2.5
                rounded-xl
                bg-blue-600
                hover:bg-blue-700
                text-white
                font-medium
                transition
                shadow-md
                "
              >
                Add User
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddUser;