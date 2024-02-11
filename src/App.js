import { Route, Routes } from "react-router-dom";
import Landing from "./Components/Home/Landing";
import Navbar from "./Components/Shared/Navbar";
import TeacherRegistrationForm from "./Components/Login/TeacherRegistrationForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentRegistrationForm from "./Components/Login/StudentRegistrationForm";
import Login from "./Components/Login/Login";
import Error from "./Components/Error/Error";
import TeacherProfile from "./Components/Teacher/TeacherProfile/TeacherProfile";
import TeacherCourse from "./Components/Teacher/TeacherCourse/TeacherCourse";
import TeacherProject from "./Components/Teacher/TeacherProject/TeacherProject";
import TeacherAssignment from "./Components/Teacher/TeacherAssignment/TeacherAssignment";
import TeacherResource from "./Components/Teacher/TeacherResource/TeacherResource";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/teacherRegistrationForm"
          element={<TeacherRegistrationForm />}
        />
        <Route path="/teacherProfile" element={<TeacherProfile />} />
        <Route path="/teacherCourse" element={<TeacherCourse />} />
        <Route path="/teacherAssignment" element={<TeacherAssignment />} />
        <Route path="/teacherResource" element={<TeacherResource />} />
        <Route path="/teacherProject" element={<TeacherProject />} />
        <Route
          path="/studentRegistrationForm"
          element={<StudentRegistrationForm />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
