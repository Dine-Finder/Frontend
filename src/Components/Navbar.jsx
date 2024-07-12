import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="container-fluid black navbar-width">
      <div className="row">
        <div className="col-12 ">
          <nav className="navbar navbar-expand-lg navbar-light  black">
            <div
              className="container-fluid "
              style={{ backgroundColor: "#1a257d" }}
            >
              <a className="navbar-brand fs-2 text-white fw-bold" href="#">
                <span>
                  <img src={`/vite.svg`} />
                  <span className="text-uppercase text-white fw-bold  font font1 font-mid ">
                    Group 10 Project
                  </span>
                </span>
              </a>

              <button
                className="navbar-toggler me-2 bg-white text-success"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse "
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 col-lg-12 justify-content-around  justify-content-lg-end ">
                  <li style={{ padding: 8 + "px" }} className="nav-item ">
                    <span className="hover-item">
                      <Link to={"/"}>Home</Link>
                    </span>
                  </li>
                  {/* <li style={{ padding: 8 + "px" }} className="nav-item ">
                      <span className="hover-item">
                        <Link to={"/courses"}>Courses</Link>
                      </span>
                    </li> */}
                  <li style={{ padding: 8 + "px" }} className="nav-item ">
                    <span className="hover-item">
                      <Link to={"/login"}>Login</Link>
                    </span>
                  </li>
                  {/* <li style={{ padding: 8 + "px" }} className="nav-item ">
                      <span className="hover-item">
                        <Link to={"/register"}>Register</Link>
                      </span>
                    </li> */}
                  {/* <li style={{ padding: 8 + "px" }} className="nav-item ">
                      <span className="hover-item">
                        <Link to={"/test"}>Mock-Tests</Link>
                      </span>
                    </li> */}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
