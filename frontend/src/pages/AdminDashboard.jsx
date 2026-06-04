import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function AdminDashboard() {

    const [stats, setStats] = useState({});

    useEffect(() => {

        const fetchData = async () => {

            try {

                const res =
                    await API.get(
                        "/admin/dashboard"
                    );

                setStats(res.data);

            } catch (error) {

                console.log(error);

            }
        };

        fetchData();

    }, []);

    const logout = () => {

        localStorage.clear();

        window.location.href = "/";

    };

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Navbar */}

            <div className="bg-white shadow-sm ">

                <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                            SR
                        </div>

                        <div>

                            <h1 className="text-2xl font-bold text-slate-800">
                                Admin Dashboard
                            </h1>

                            <p className="text-slate-500 text-sm">
                                Store Rating Platform
                            </p>

                        </div>

                    </div>

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

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Welcome */}

                <div className="mb-8">

                    <h2 className="text-3xl font-bold text-slate-800">
                        Welcome Back 👋
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Manage users, stores and ratings from one place.
                    </p>

                </div>

                {/* Statistics */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl">

                        <p className="text-blue-100">
                            Total Users
                        </p>

                        <h2 className="text-5xl font-bold mt-3">
                            {stats.totalUsers || 0}
                        </h2>

                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-6 text-white shadow-xl">

                        <p className="text-green-100">
                            Total Stores
                        </p>

                        <h2 className="text-5xl font-bold mt-3">
                            {stats.totalStores || 0}
                        </h2>

                    </div>

                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 text-white shadow-xl">

                        <p className="text-orange-100">
                            Total Ratings
                        </p>

                        <h2 className="text-5xl font-bold mt-3">
                            {stats.totalRatings || 0}
                        </h2>

                    </div>

                </div>

                {/* Quick Actions */}

                {/* Quick Actions */}

                <div className="mt-12">

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-2xl font-bold text-slate-800">
                            Quick Actions
                        </h2>

                        <span className="text-sm text-slate-500">
                            Manage your platform efficiently
                        </span>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {/* Manage Users */}

                        <Link
                            to="/admin/users"
                            className="
      bg-white
      rounded-2xl
      p-6
      shadow-md
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      border
      border-slate-200
      "
                        >

                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-blue-600 font-bold text-xl">
                                    U
                                </span>
                            </div>

                            <h3 className="font-bold text-lg text-slate-800">
                                Manage Users
                            </h3>

                            <p className="text-slate-500 text-sm mt-2">
                                View and manage registered users
                            </p>

                        </Link>

                        {/* Manage Stores */}

                        <Link
                            to="/admin/stores"
                            className="
      bg-white
      rounded-2xl
      p-6
      shadow-md
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      border
      border-slate-200
      "
                        >

                            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                <span className="text-green-600 font-bold text-xl">
                                    S
                                </span>
                            </div>

                            <h3 className="font-bold text-lg text-slate-800">
                                Manage Stores
                            </h3>

                            <p className="text-slate-500 text-sm mt-2">
                                View and manage stores
                            </p>

                        </Link>

                        {/* Add User */}

                        <Link
                            to="/admin/add-user"
                            className="
      bg-blue-600
      rounded-2xl
      p-6
      text-white
      shadow-md
      hover:bg-blue-700
      hover:-translate-y-1
      transition-all
      duration-300
      "
                        >

                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                <span className="font-bold text-xl">
                                    +
                                </span>
                            </div>

                            <h3 className="font-bold text-lg">
                                Add User
                            </h3>

                            <p className="text-blue-100 text-sm mt-2">
                                Create a new user account
                            </p>

                        </Link>

                        {/* Add Store */}

                        <Link
                            to="/admin/add-store"
                            className="
      bg-green-500
      rounded-2xl
      p-6
      text-white
      shadow-md
      hover:bg-green-600
      hover:-translate-y-1
      transition-all
      duration-300
      "
                        >

                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                <span className="font-bold text-xl">
                                    +
                                </span>
                            </div>

                            <h3 className="font-bold text-lg">
                                Add Store
                            </h3>

                            <p className="text-green-100 text-sm mt-2">
                                Register a new store
                            </p>

                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;