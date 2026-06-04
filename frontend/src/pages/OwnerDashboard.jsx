import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
function OwnerDashboard() {
  const [sortBy, setSortBy] =
    useState("name");

  const [order, setOrder] =
    useState("ASC");
  const [data, setData] = useState({
    averageRating: 0,
    totalRatings: 0,
    users: [],
  });

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res =
          await API.get(
            "/owner/dashboard"
          );

        setData(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

    fetchDashboard();

  }, []);

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-white shadow-sm border-b">

        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              SO
            </div>

            <div>

              <h1 className="text-2xl font-bold text-slate-800">
                Store Owner Dashboard
              </h1>

              <p className="text-slate-500 text-sm">
                Monitor your store ratings
              </p>

            </div>

          </div>

          <div className="flex gap-3">

            <Link
              to="/change-password"
              className="
    bg-blue-600
    hover:bg-blue-700
    text-white
    px-5
    py-2.5
    rounded-xl
    font-medium
    transition
    shadow-md
    no-underline
    "
            >
              Change Password
            </Link>

            <button
              onClick={logout}
              className="
    bg-red-500
    hover:bg-red-600
    text-white
    px-5
    py-2.5
    rounded-xl
    font-medium
    transition
    shadow-md
    "
            >
              Logout
            </button>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Welcome */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-slate-800">
            Welcome Back 👋
          </h2>

          <p className="text-slate-500 mt-2">
            Track ratings and customer feedback.
          </p>

        </div>

        {/* Stats Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-xl">

            <p className="text-green-100">
              Average Rating
            </p>

            <h2 className="text-5xl font-bold mt-3">
              <div className="flex items-center gap-2">
                <span>⭐</span>
                <span>{data.averageRating || 0}</span>
              </div>
            </h2>

          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl">

            <p className="text-blue-100">
              Total Ratings
            </p>

            <h2 className="text-5xl font-bold mt-3">
              {data.totalRatings || 0}
            </h2>

          </div>

        </div>
        <div className="flex gap-3 mb-4 mt-4">

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
              Name
            </option>

            <option value="email">
              Email
            </option>

            <option value="rating">
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
        {/* Users Table */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Users Who Rated
          </h2>

          <div className="bg-white rounded-2xl shadow-md overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-50 border-b">

                  <tr>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Name
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Email
                    </th>

                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                      Rating
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {data.users?.length > 0 ? (

                    [...data.users]
                      .sort((a, b) => {

                        let valueA = a[sortBy];
                        let valueB = b[sortBy];

                        if (typeof valueA === "string") {
                          valueA = valueA.toLowerCase();
                          valueB = valueB.toLowerCase();
                        }

                        if (order === "ASC") {
                          return valueA > valueB ? 1 : -1;
                        }

                        return valueA < valueB ? 1 : -1;

                      })
                      .map((user) => (

                        <tr
                          key={user.id}
                          className="border-b hover:bg-slate-50"
                        >

                          <td className="px-6 py-4 font-medium text-slate-800">
                            {user.name}
                          </td>

                          <td className="px-6 py-4 text-slate-600">
                            {user.email}
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
                              ⭐ {user.rating}
                            </span>

                          </td>

                        </tr>

                      ))

                  ) : (

                    <tr>

                      <td
                        colSpan="3"
                        className="
                        text-center
                        py-8
                        text-slate-500
                        "
                      >
                        No ratings available yet.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OwnerDashboard;