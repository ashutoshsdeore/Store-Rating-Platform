import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, Link } from "react-router-dom";

function UserDetails() {

  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const res =
          await API.get(
            `/admin/users/${id}`
          );

        setUser(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchUser();

  }, [id]);

  if (!user) {

    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex justify-between items-center mb-8">

            <div>

              <h1 className="text-3xl font-bold text-slate-800">
                User Details
              </h1>

              <p className="text-slate-500">
                Complete user information
              </p>

            </div>

            <Link
              to="/admin/users"
              className="
              bg-slate-200
              hover:bg-slate-300
              text-slate-700
              px-4
              py-2
              rounded-xl
              transition
              "
            >
              Back
            </Link>

          </div>

          <div className="space-y-5">

            <div>
              <p className="text-sm text-slate-500">
                Name
              </p>

              <p className="text-lg font-semibold">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Email
              </p>

              <p className="text-lg font-semibold">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Address
              </p>

              <p className="text-lg font-semibold">
                {user.address}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Role
              </p>

              <span
                className={
                  user.role === "ADMIN"
                    ? "bg-red-100 text-red-700 px-3 py-1 rounded-full"
                    : user.role === "OWNER"
                    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                    : "bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                }
              >
                {user.role}
              </span>
            </div>

            {user.role === "OWNER" && (

              <div>

                <p className="text-sm text-slate-500">
                  Store Rating
                </p>

                <p className="text-2xl font-bold text-yellow-500">
                  ⭐ {user.ownerRating || 0}
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default UserDetails;