import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
function UserDashboard() {

    const [stores, setStores] = useState([]);
    const [search, setSearch] = useState("");
    const [ratings, setRatings] = useState({});
    const [sortBy, setSortBy] =
        useState("name");

    const [order, setOrder] =
        useState("ASC");
    const fetchStores = async () => {

        try {

            const res =
                await API.get(
                    `/stores?sortBy=${sortBy}&order=${order}`
                );

            setStores(res.data);

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchStores();

    }, [sortBy, order]);

    const submitRating = async (
        storeId,
        rating
    ) => {

        if (!rating) {
            return alert(
                "Please select a rating"
            );
        }

        try {

            await API.post(
                "/ratings",
                {
                    store_id: storeId,
                    rating
                }
            );

            alert(
                "Rating Submitted"
            );

            fetchStores();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to submit rating"
            );

        }

    };

    const updateRating = async (
        storeId,
        rating
    ) => {

        if (!rating) {
            return alert(
                "Please select a rating"
            );
        }

        try {

            await API.put(
                "/ratings",
                {
                    store_id: storeId,
                    rating
                }
            );

            alert(
                "Rating Updated"
            );

            fetchStores();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update rating"
            );

        }

    };

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

                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                            U
                        </div>

                        <div>

                            <h1 className="text-2xl font-bold text-slate-800">
                                User Dashboard
                            </h1>

                            <p className="text-slate-500 text-sm">
                                Browse stores and submit ratings
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

            <div className="max-w-7xl mx-auto p-6">

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
            focus:ring-blue-500
            "
                    />

                </div>
                <div className="flex gap-3 mt-4 mb-2">

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
                {/* Stores Table */}

                <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-50 border-b">

                                <tr>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                        Store Name
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                                        Address
                                    </th>

                                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                                        Overall Rating
                                    </th>

                                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                                        Submitted Rating
                                    </th>

                                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                                        Submit Rating
                                    </th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                                        Modify Rating
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
                                            store.address
                                                .toLowerCase()
                                                .includes(search.toLowerCase())
                                    )
                                    .map((store) => (

                                        <tr
                                            key={store.id}
                                            className="border-b hover:bg-slate-50"
                                        >

                                            {/* Store Name */}
                                            <td className="px-6 py-4 font-medium text-slate-800">
                                                {store.name}
                                            </td>

                                            {/* Address */}
                                            <td className="px-6 py-4 text-slate-600">
                                                {store.address}
                                            </td>

                                            {/* Overall Rating */}
                                            <td className="px-6 py-4 text-center">

                                                <div className="flex items-center justify-center gap-2">

                                                    <span className="text-yellow-500 text-lg">
                                                        ★
                                                    </span>

                                                    <span className="font-semibold text-slate-700">
                                                        {store.overallRating || 0}
                                                    </span>

                                                </div>

                                            </td>

                                            {/* Submitted Rating */}
                                            <td className="px-6 py-4 text-center">

                                                <span
                                                    className="
            bg-blue-100
            text-blue-700
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
            "
                                                >
                                                    {store.userRating || "Not Rated"}
                                                </span>

                                            </td>

                                            {/* Submit Rating */}
                                            <td className="px-6 py-4">

                                                <div className="flex flex-col items-center">

                                                    <div className="flex gap-1">

                                                        {[1, 2, 3, 4, 5].map((star) => (

                                                            <button
                                                                key={star}
                                                                type="button"
                                                                onClick={() =>
                                                                    setRatings({
                                                                        ...ratings,
                                                                        [store.id]: star
                                                                    })
                                                                }
                                                                className="text-2xl"
                                                            >
                                                                <span
                                                                    className={
                                                                        star <= (ratings[store.id] || 0)
                                                                            ? "text-yellow-400"
                                                                            : "text-gray-300"
                                                                    }
                                                                >
                                                                    ★
                                                                </span>
                                                            </button>

                                                        ))}

                                                    </div>

                                                    <p className="text-xs text-slate-500 mt-2">
                                                        {ratings[store.id]
                                                            ? `${ratings[store.id]} / 5`
                                                            : "Select Rating"}
                                                    </p>

                                                    <button
                                                        onClick={() =>
                                                            submitRating(
                                                                store.id,
                                                                ratings[store.id]
                                                            )
                                                        }
                                                        className="
              mt-3
              bg-green-600
              hover:bg-green-700
              text-white
              px-4
              py-2
              rounded-lg
              text-sm
              transition
              "
                                                    >
                                                        Submit
                                                    </button>

                                                </div>

                                            </td>

                                            {/* Modify Rating */}
                                            <td className="px-6 py-4 text-center">

                                                <button
                                                    onClick={() =>
                                                        updateRating(
                                                            store.id,
                                                            ratings[store.id]
                                                        )
                                                    }
                                                    className="
            bg-yellow-500
            hover:bg-yellow-600
            text-white
            px-4
            py-2
            rounded-lg
            text-sm
            transition
            "
                                                >
                                                    Modify
                                                </button>

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

export default UserDashboard;