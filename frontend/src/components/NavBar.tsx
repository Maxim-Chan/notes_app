function NavBar() {
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm w-full flex">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Notebook</a>
        </div>
        <div className="flex-none mx-5">
          <button className="btn btn-square btn-ghost w-fit">Click me</button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
