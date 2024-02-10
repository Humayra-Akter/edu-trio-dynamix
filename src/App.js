import { Route, Routes } from "react-router-dom";
import Landing from "./Components/Home/Landing";
import Navbar from "./Components/Shared/Navbar";
import TeacherRegistrationForm from "./Components/Login/TeacherRegistrationForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentRegistrationForm from "./Components/Login/StudentRegistrationForm";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/teacherRegistrationForm"
          element={<TeacherRegistrationForm />}
        />
        <Route
          path="/studentRegistrationForm"
          element={<StudentRegistrationForm />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
