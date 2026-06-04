import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddStore() {

  const navigate = useNavigate();

  const [owners, setOwners] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  useEffect(() => {

    const fetchOwners = async () => {

      try {

        const res =
          await API.get(
            "/admin/users?role=OWNER"
          );

        setOwners(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchOwners();

  }, []);

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
        "/stores",
        form
      );

      alert(
        "Store Added Successfully"
      );

      navigate(
        "/admin/stores"
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to Add Store"
      );

    }

  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}

        <div className="bg-green-600 px-8 py-5 text-white">

          <h1 className="text-2xl font-bold">
            Add Store
          </h1>

          <p className="text-green-100 mt-1">
            Create and assign a new store
          </p>

        </div>

        {/* Form */}

        <div className="p-6">

          <form onSubmit={handleSubmit}>

            <div className="grid md:grid-cols-2 gap-5">

              {/* Store Name */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Store Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter store name"
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
                  focus:ring-green-500
                  "
                />

              </div>

              {/* Store Email */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Store Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter store email"
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
                  focus:ring-green-500
                  "
                />

              </div>

              {/* Store Address */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Store Address
                </label>

                <input
                  type="text"
                  name="address"
                  placeholder="Enter store address"
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
                  focus:ring-green-500
                  "
                />

              </div>

              {/* Store Owner */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Store Owner
                </label>

                <select
                  name="owner_id"
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
                  focus:ring-green-500
                  "
                >

                  <option value="">
                    Select Store Owner
                  </option>

                  {owners.map((owner) => (

                    <option
                      key={owner.id}
                      value={owner.id}
                    >
                      {owner.name}
                    </option>

                  ))}

                </select>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3 mt-8">

              <button
                type="button"
                onClick={() =>
                  navigate("/admin/stores")
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
                bg-green-600
                hover:bg-green-700
                text-white
                font-medium
                transition
                shadow-md
                "
              >
                Add Store
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddStore;