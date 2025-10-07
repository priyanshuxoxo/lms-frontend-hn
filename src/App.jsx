import { Route, Routes } from "react-router-dom";
// import "./App.css";

import HomePage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import NotFound from "./Pages/NotFound";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import CourseList from "./Pages/Courses/CourseList";
import Contact from "./Pages/Contact";
import Denied from "./Pages/Denied";
import CourseDescription from "./Pages/Courses/CourseDescription";
import RequireAuth from "./Auth/RequireAuth";
import CreateCourse from "./Pages/Courses/CreateCourse";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/courses" element={<CourseList />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route
          path="/course/description"
          element={<CourseDescription />}
        ></Route>

        <Route path="/denied" element={<Denied />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route element={<RequireAuth allowedRules={["ADMIN"]} />}>
          <Route path="/course/create" element={<CreateCourse />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
