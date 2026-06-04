import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ChangePassword() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      form.newPassword !==
      form.confirmPassword
    ) {

      return alert(
        "Passwords do not match"
      );

    }

    try {

      const res =
        await API.put(
          "/auth/change-password",
          {
            currentPassword:
              form.currentPassword,
            newPassword:
              form.newPassword,
          }
        );

      alert(res.data.message);

      navigate(-1);

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl mb-4"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl mb-4"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full border p-3 rounded-xl mb-4"
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;