import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";

function HomeLayout({ children }) {
  const dispacth = useDispatch();
  const navigate = useNavigate();

  //for checking if user is logged in or not
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  //for displaying the options acc to role
  const role = useSelector((state) => state?.auth?.role);

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }
  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
  }

  function handleLogout(e) {
    e.preventDefault();
    // const res=await dispacth(logout());
    // if(res?.payload?.success)
    navigate("/");
  }

  return (
    <div className="min-h-[90vh] ">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"22px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label className="drawer-overlay" htmlFor="my-drawer"></label>
          <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>
            <li>
              <Link to="/">Home </Link>
            </li>
            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </li>
            )}
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us </Link>
            </li>
            <li>
              <Link to="/about">About Us </Link>
            </li>
            {!isLoggedIn && (
              <li className="">
                <div className="w-full flex items-center justify-center gap-2 mt-2">
                  <Link
                    to="/login"
                    className="btn btn-primary flex-1 font-semibold text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-secondary flex-1 font-semibold text-center"
                  >
                    Signup
                  </Link>
                </div>
              </li>
            )}
            {isLoggedIn && (
              <li className="">
                <div className="w-full flex items-center justify-center gap-2 mt-2">
                  <Link
                    to="/user/profile"
                    className="btn btn-primary flex-1 font-semibold text-center"
                  >
                    Profile
                  </Link>
                  <Link
                    onClick={handleLogout}
                    className="btn btn-secondary flex-1 font-semibold text-center"
                  >
                    Logout
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
}

export default HomeLayout;
