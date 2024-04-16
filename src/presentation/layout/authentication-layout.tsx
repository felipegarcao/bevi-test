import { Outlet } from "react-router-dom";

export function AuthenticationLayout() {
  return (
    <>
      <nav className="navbar navbar-light bg-light px-5">
        <a className="navbar-brand" href="#">
          <img
            src="https://play-lh.googleusercontent.com/SwhYerB_Htbcgjgr9i9AIc_ocq7Xonh9XIhd9t8zCCFBa9irEHWA9rJX67ljUuUftA"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          bevi
        </a>
      </nav>
      <main className="min-vh-100">
    <Outlet />
      </main>
    </>
  );
}
