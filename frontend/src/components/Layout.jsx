import { Link } from "react-router-dom";

function Layout({ title, children }) {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="container-fluid">

      <div className="row">

        <div
          className="col-md-2 bg-dark text-white min-vh-100 p-3"
        >
          <h3>Store Rating</h3>

          <hr />

          <Link
            className="d-block text-white mb-3"
            to="/admin"
          >
            Dashboard
          </Link>

          <Link
            className="d-block text-white mb-3"
            to="/admin/users"
          >
            Users
          </Link>

          <Link
            className="d-block text-white mb-3"
            to="/admin/stores"
          >
            Stores
          </Link>

          <button
            className="btn btn-danger mt-3"
            onClick={logout}
          >
            Logout
          </button>

        </div>

        <div className="col-md-10 p-4">

          <h2>{title}</h2>

          {children}

        </div>

      </div>

    </div>
  );
}

export default Layout;