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
import TeacherResource from "./Components/Teacher/TeacherResource/TeacherResource";
import Container from "./Components/WhiteBoard/Container";
import StudentCourse from "./Components/Student/StudentCourse/StudentCourse";
import StudentProfile from "./Components/Student/StudentProfile/StudentProfile";
import StudentAssignment from "./Components/Student/StudentAssignment/StudentAssignment";
import StudentResource from "./Components/Student/StudentResource/StudentResource";
import StudentProject from "./Components/Student/StudentProject/StudentProject";
import ViewStudents from "./Components/Teacher/TeacherProject/ViewStudents";
import UploadFile from "./Components/Student/StudentAssignment/UploadFile";
import StudentAnalytics from "./Components/Student/StudentAnalytics/StudentAnalytics";
import MyCourses from "./Components/Student/StudentCourse/MyCourses";
import StudentFeedback from "./Components/Student/StudentAnalytics/StudentFeedback";
import CourseViewStudent from "./Components/Teacher/TeacherCourse/CourseViewStudent";
import StudentReward from "./Components/Student/StudentAnalytics/StudentReward";
import StudentCollaboration from "./Components/Student/StudentCollaboration/StudentCollaboration";
import AddProjects from "./Components/Teacher/TeacherProject/AddProjects";
import TeacherViewProjects from "./Components/Teacher/TeacherViewProjects/TeacherViewProjects";
import About from "./Components/About/About";
import Chat from "./Components/Chat/Chat";
import CodeEditor from "./Components/Student/CodeEditor/CodeEditor";
import AddCourse from "./Components/Teacher/TeacherCourse/AddCourse";

function App() {
  const userRole = localStorage.getItem("userRole");

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/board" element={<Container />} />
        <Route
          path="/teacherRegistrationForm"
          element={<TeacherRegistrationForm />}
        />
        {userRole === "teacher" && (
          // teacher routes
          <>
            <Route path="/teacherProfile" element={<TeacherProfile />} />
            <Route path="/teacherCourse" element={<TeacherCourse />} />
            <Route path="/teacherAddCourse" element={<AddCourse />} />
            <Route
              path="/teacherCourseViewStudent"
              element={<CourseViewStudent />}
            />
            <Route
              path="/teacherViewProject"
              element={<TeacherViewProjects />}
            />
            <Route path="/teacherResource" element={<TeacherResource />} />
            <Route path="/teacherProject" element={<TeacherProject />} />
            <Route path="/teacherAddProject" element={<AddProjects />} />
            <Route
              path="/teacherProjectViewStudent"
              element={<ViewStudents />}
            />
            <Route
              path="/teacherProjectViewStudent/:id"
              element={<ViewStudents />}
            />
          </>
        )}

        <Route
          path="/studentRegistrationForm"
          element={<StudentRegistrationForm />}
        />
        {userRole === "student" && (
          // student routes
          <>
            {" "}
            <Route path="/studentProfile" element={<StudentProfile />} />
            <Route path="/studentCourse" element={<StudentCourse />} />{" "}
            <Route path="/chat" element={<Chat />} />
            <Route path="/codeEditor" element={<CodeEditor />} />
            <Route path="/myCourse" element={<MyCourses />} />
            <Route path="/studentAssignment" element={<StudentAssignment />} />
            <Route
              path="/studentCollaboration"
              element={<StudentCollaboration />}
            />
            <Route path="/uploadFile" element={<UploadFile />} />
            <Route path="/studentResource" element={<StudentResource />} />
            <Route path="/studentProject" element={<StudentProject />} />
            <Route path="/studentAnalytics" element={<StudentAnalytics />}>
              <Route index element={<StudentFeedback />} />
              <Route path="studentReward" element={<StudentReward />} />
            </Route>
          </>
        )}

        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
