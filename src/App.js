import { Route, Routes } from "react-router-dom";
import Landing from "./Components/Home/Landing";
import Navbar from "./Components/Shared/Navbar";
import TeacherRegistrationForm from "./Components/Login/TeacherRegistrationForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentRegistrationForm from "./Components/Login/StudentRegistrationForm";
import Login from "./Components/Login/Login";
import Error from "./Components/Error/Error";

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
