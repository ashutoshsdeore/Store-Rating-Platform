import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const [order, setOrder] = useState("ASC");


  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const res =
          await API.get(
            `/admin/users?sortBy=${sortBy}&order=${order}`
          );

        setUsers(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchUsers();

  }, [sortBy, order]);

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">
              Users Management
            </h1>

            <p className="text-slate-500 mt-1">
              View and manage all registered users
            </p>

          </div>

          <div className="flex gap-3">

            <Link
              to="/admin/add-user"
              className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5
              py-2.5
              rounded-xl
              font-medium
              transition
              "
            >
              Add User
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
            placeholder="Search by Name, Email, Address or Role"
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
            focus:ring-blue-500
            "
          />

        </div>
        <div className="flex gap-3 mb-4">

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="border p-2 rounded-lg"
          >
            <option value="name">
              Name
            </option>

            <option value="email">
              Email
            </option>

            <option value="address">
              Address
            </option>

            <option value="role">
              Role
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
  bg-blue-600
  hover:bg-blue-700
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
        {/* Users Table */}

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50 border-b">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    ID
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Address
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                    Role
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody>

                {users
                  .filter(
                    (user) =>
                      user.name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||

                      user.email
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||

                      user.address
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||

                      user.role
                        .toLowerCase()
                        .includes(search.toLowerCase())
                  )
                  .map((user) => (

                    <tr
                      key={user.id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="px-6 py-4">
                        {user.id}
                      </td>

                      <td className="px-6 py-4 font-medium text-slate-800">
                        {user.name}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {user.address}
                      </td>

                      <td className="px-6 py-4 text-center">

                        <span
                          className={
                            user.role === "ADMIN"
                              ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium"
                              : user.role === "OWNER"
                                ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                                : "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                          }
                        >
                          {user.role}
                        </span>

                      </td>
                      <td className="px-6 py-4 text-center">

                        <Link
                          to={`/admin/users/${user.id}`}
                          className="
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-4
    py-2
    rounded-lg
    text-sm
    transition
    "
                        >
                          View
                        </Link>

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

export default AdminUsers;