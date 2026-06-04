import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function AdminStores() {


  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] =
    useState("name");

  const [order, setOrder] =
    useState("ASC");
  useEffect(() => {

    const fetchStores = async () => {

      try {


        const res =
          await API.get(
            `/admin/stores?sortBy=${sortBy}&order=${order}`
          );

        setStores(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

    fetchStores();

  }, [sortBy, order]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Stores Management
            </h1>

            <p className="text-slate-500 mt-1">
              View and manage all stores
            </p>

          </div>

          <div className="flex gap-3">

            <Link
              to="/admin/add-store"
              className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-5
              py-2.5
              rounded-xl
              font-medium
              transition
              "
            >
              Add Store
            </Link>

            <Link
              to="/admin"
              className="
              bg-slate-200
              hover:bg-slate-300
              text-slate-700
              px-5
              py-2.5
              rounded-xl
              font-medium
              transition
              "
            >
              Back
            </Link>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">

          <input
            type="text"
            placeholder="Search stores..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
            w-full
            px-4
            py-3
            border
            border-slate-300
            rounded-xl
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
            "
          />

        </div>
        <div className="flex gap-3 mb-6">

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="
    border
    border-slate-300
    rounded-lg
    px-3
    py-2
    "
          >
            <option value="name">
              Store Name
            </option>

            <option value="email">
              Email
            </option>

            <option value="address">
              Address
            </option>

            <option value="overallRating">
              Rating
            </option>

          </select>

          <button
            onClick={() =>
              setOrder(
                order === "ASC"
                  ? "DESC"
                  : "ASC"
              )
            }
            className="
    bg-green-600
    hover:bg-green-700
    text-white
    px-4
    py-2
    rounded-lg
    "
          >
            {order === "ASC"
              ? "↑ Ascending"
              : "↓ Descending"}
          </button>

        </div>
        {/* Table */}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50 border-b">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Store Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Address
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                    Rating
                  </th>

                </tr>

              </thead>

              <tbody>

                {stores
                  .filter(
                    (store) =>

                      store.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||

                      store.email
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||

                      store.address
                        .toLowerCase()
                        .includes(search.toLowerCase())
                  )
                  .map((store) => (

                    <tr
                      key={store.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">
                        {store.id}
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-800">
                        {store.name}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {store.email}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {store.address}
                      </td>

                      <td className="px-6 py-4 text-center">

                        <span
                          className="
                          bg-green-100
                          text-green-700
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-medium
                          "
                        >
                          ⭐ {store.overallRating || 0}
                        </span>

                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminStores;