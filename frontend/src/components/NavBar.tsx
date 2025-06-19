import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm w-full flex">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Notebook
          </Link>
        </div>
        <div className="flex-none mx-5 space-x-2">
          <Link to="/" className="btn btn-outline">
            Home
          </Link>
          <Link to="/Notes" className="btn btn-outline">
            Notes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
