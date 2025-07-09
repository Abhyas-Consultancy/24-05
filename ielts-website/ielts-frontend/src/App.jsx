// import { Route, Routes, Navigate } from "react-router-dom";
// import "./App.css";

// import HomePage from "./pages/HomePage";
// import NavigationBar from "./components/NavigationBar";
// import LoginButton from "./components/Button";

// function App() {
//   return (
//     <>
//     <LoginButton label="Login | Sign up"
//           type="red"
//           styleClass="w-40 mr-5 h-auto p-2 my-5 transition duration-150 ease-in-out justify-self-end hover:bg-brandCream 
//           hover:text-brandRed hover:-translate-y-1 hover:scale-110"
//           redirectLink = 'https://www.google.com/'/>
//       <NavigationBar />
//       <main className="lg:ml-16 p-6 transition-all duration-300">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           {/* Redirect unknown routes to home */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;


// import { Route, Routes, Navigate } from "react-router-dom";
// import "./App.css";
// import HomePage from "./pages/HomePage";
// import NavigationBar from "./components/NavigationBar";
// import LoginButton from "./components/Button";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";

// function App() {
//   const role = localStorage.getItem('role');
  
//   return (
//     <>
//       <LoginButton
//         label={localStorage.getItem('token') ? "Logout" : "Login | Sign up"}
//         type="red"
//         styleClass="w-40 mr-5 h-auto p-2 my-5 transition duration-150 ease-in-out justify-self-end hover:bg-brandCream hover:text-brandRed hover:-translate-y-1 hover:scale-110"
//         redirectLink={localStorage.getItem('token') ? '/' : '/login'}
//         onClick={() => {
//           if (localStorage.getItem('token')) {
//             localStorage.removeItem('token');
//             localStorage.removeItem('role');
//             localStorage.removeItem('username');
//             window.location.href = '/';
//           }
//         }}
//       />
//       <NavigationBar />
//       <main className="lg:ml-16 p-6 transition-all duration-300">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/login"
//             element={localStorage.getItem('token') ? (
//               <Navigate to={
//                 role === 'admin' ? "/admin-dashboard" :
//                 role === 'teacher' ? "/teacher-dashboard" :
//                 "/student-dashboard"
//               } />
//             ) : (
//               <LoginPage />
//             )}
//           />
//           <Route
//             path="/register"
//             element={localStorage.getItem('token') ? (
//               <Navigate to={
//                 role === 'admin' ? "/admin-dashboard" :
//                 role === 'teacher' ? "/teacher-dashboard" :
//                 "/student-dashboard"
//               } />
//             ) : (
//               <RegisterPage />
//             )}
//           />
//           <Route
//             path="/admin-dashboard"
//             element={localStorage.getItem('token') && role === 'admin' ? (
//               <AdminDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route
//             path="/student-dashboard"
//             element={localStorage.getItem('token') && role === 'student' ? (
//               <StudentDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route
//             path="/teacher-dashboard"
//             element={localStorage.getItem('token') && role === 'teacher' ? (
//               <TeacherDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;

// 2. Second
// import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// import "./App.css";
// import HomePage from "./pages/HomePage";
// import NavigationBar from "./components/NavigationBar";
// import LoginButton from "./components/Button";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";

// function App() {
//   const role = localStorage.getItem('role');
//   const location = useLocation(); // To check the current route
  
//   const handleLogout = () => {
//     console.log("Before logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     localStorage.removeItem('username');
//     console.log("After logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     window.location.href = '/'; // Force a full page reload
//   };

//   const isLoggedIn = !!localStorage.getItem('token');
  
//   // Only redirect to dashboard if NOT on /login or /register
//   const shouldRedirectToDashboard = isLoggedIn && !['/login', '/register'].includes(location.pathname);
//   console.log("Routing state:", { isLoggedIn, shouldRedirectToDashboard, role, currentPath: location.pathname });

//   return (
//     <>
//       <LoginButton
//         label={isLoggedIn ? "Logout" : "Login | Sign up"}
//         type="red"
//         styleClass="w-40 mr-5 h-auto p-2 my-5 transition duration-150 ease-in-out justify-self-end hover:bg-brandCream hover:text-brandRed hover:-translate-y-1 hover:scale-110"
//         redirectLink={isLoggedIn ? '/' : '/login'}
//         onClick={isLoggedIn ? handleLogout : undefined}
//       />
//       <NavigationBar />
//       <main className="lg:ml-16 p-6 transition-all duration-300">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/login"
//             element={shouldRedirectToDashboard ? (
//               <Navigate to={
//                 role === 'admin' ? "/admin-dashboard" :
//                 role === 'teacher' ? "/teacher-dashboard" :
//                 "/student-dashboard"
//               } />
//             ) : (
//               <LoginPage />
//             )}
//           />
//           <Route
//             path="/register"
//             element={shouldRedirectToDashboard ? (
//               <Navigate to={
//                 role === 'admin' ? "/admin-dashboard" :
//                 role === 'teacher' ? "/teacher-dashboard" :
//                 "/student-dashboard"
//               } />
//             ) : (
//               <RegisterPage />
//             )}
//           />
//           <Route
//             path="/admin-dashboard"
//             element={localStorage.getItem('token') && role === 'admin' ? (
//               <AdminDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route
//             path="/student-dashboard"
//             element={localStorage.getItem('token') && role === 'student' ? (
//               <StudentDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route
//             path="/teacher-dashboard"
//             element={localStorage.getItem('token') && role === 'teacher' ? (
//               <TeacherDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;

// 3.Third 

// import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// import "./App.css";
// import HomePage from "./pages/HomePage";
// import NavigationBar from "./components/NavigationBar";
// import LoginButton from "./components/Button";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";

// function App() {
//   const role = localStorage.getItem('role');
//   const location = useLocation();
  
//   const handleLogout = () => {
//     console.log("Before logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     localStorage.clear();
//     console.log("After logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     window.location.replace('/');
//   };

//   const isLoggedIn = !!localStorage.getItem('token');
//   const isValidRole = ['student', 'teacher', 'admin'].includes(role);

//   // If logged in but role is invalid, clear localStorage and redirect to login
//   if (isLoggedIn && !isValidRole) {
//     console.log("Invalid role detected, logging out:", role);
//     localStorage.clear();
//     window.location.replace('/login');
//     return null; // Prevent rendering until redirect
//   }

//   const shouldRedirectToDashboard = isLoggedIn && !['/login', '/register'].includes(location.pathname);
//   console.log("Routing state:", { isLoggedIn, shouldRedirectToDashboard, role, currentPath: location.pathname });

//   return (
//     <>
//       <LoginButton
//         label={isLoggedIn ? "Logout" : "Login | Sign up"}
//         type="red"
//         styleClass="w-40 mr-5 h-auto p-2 my-5 transition duration-150 ease-in-out justify-self-end hover:bg-brandCream hover:text-brandRed hover:-translate-y-1 hover:scale-110"
//         redirectLink={isLoggedIn ? '/' : '/login'}
//         onClick={isLoggedIn ? handleLogout : undefined}
//       />
//       <NavigationBar />
//       <main className="lg:ml-16 p-6 transition-all duration-300">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/login"
//             element={shouldRedirectToDashboard ? (
//               <Navigate to={
//                 role === 'admin' ? "/admin-dashboard" :
//                 role === 'teacher' ? "/teacher-dashboard" :
//                 "/student-dashboard"
//               } />
//             ) : (
//               <LoginPage />
//             )}
//           />
//           <Route
//             path="/register"
//             element={shouldRedirectToDashboard ? (
//               <Navigate to={
//                 role === 'admin' ? "/admin-dashboard" :
//                 role === 'teacher' ? "/teacher-dashboard" :
//                 "/student-dashboard"
//               } />
//             ) : (
//               <RegisterPage />
//             )}
//           />
//           <Route
//             path="/admin-dashboard"
//             element={localStorage.getItem('token') && role === 'admin' ? (
//               <AdminDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route
//             path="/student-dashboard"
//             element={localStorage.getItem('token') && role === 'student' ? (
//               <StudentDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route
//             path="/teacher-dashboard"
//             element={localStorage.getItem('token') && role === 'teacher' ? (
//               <TeacherDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;

// 4.Fourth

// import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// import "./App.css";
// import HomePage from "./pages/HomePage";
// import NavigationBar from "./components/NavigationBar";
// import LoginButton from "./components/Button";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";

// function App() {
//   const role = localStorage.getItem('role');
//   const location = useLocation();
  
//   const handleLogout = () => {
//     console.log("Before logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     localStorage.clear();
//     console.log("After logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     window.location.replace('/');
//   };

//   const isLoggedIn = !!localStorage.getItem('token');
//   const isValidRole = ['student', 'teacher', 'admin'].includes(role);

//   // Only clear localStorage if not on /login or /register to allow login to complete
//   if (isLoggedIn && !isValidRole && !['/login', '/register'].includes(location.pathname)) {
//     console.log("Invalid role detected, logging out:", role);
//     localStorage.clear();
//     window.location.replace('/login');
//     return null;
//   }

//   const shouldRedirectToDashboard = isLoggedIn && !['/login', '/register'].includes(location.pathname);
//   console.log("Routing state:", { isLoggedIn, shouldRedirectToDashboard, role, currentPath: location.pathname });

//   return (
//     <>
//       <LoginButton
//         label={isLoggedIn ? "Logout" : "Login | Sign up"}
//         type="red"
//         styleClass="w-40 mr-5 h-auto p-2 my-5 transition duration-150 ease-in-out justify-self-end hover:bg-brandCream hover:text-brandRed hover:-translate-y-1 hover:scale-110"
//         redirectLink={isLoggedIn ? '/' : '/login'}
//         onClick={isLoggedIn ? handleLogout : undefined}
//       />
//       <NavigationBar />
//       <main className="lg:ml-16 p-6 transition-all duration-300">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/login"
//             element={shouldRedirectToDashboard ? (
//               <Navigate to={
//                 role === 'admin' ? "/admin-dashboard" :
//                 role === 'teacher' ? "/teacher-dashboard" :
//                 "/student-dashboard"
//               } />
//             ) : (
//               <LoginPage />
//             )}
//           />
//           <Route
//             path="/register"
//             element={shouldRedirectToDashboard ? (
//               <Navigate to={
//                 role === 'admin' ? "/admin-dashboard" :
//                 role === 'teacher' ? "/teacher-dashboard" :
//                 "/student-dashboard"
//               } />
//             ) : (
//               <RegisterPage />
//             )}
//           />
//           <Route
//             path="/admin-dashboard"
//             element={localStorage.getItem('token') && role === 'admin' ? (
//               <AdminDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route
//             path="/student-dashboard"
//             element={localStorage.getItem('token') && role === 'student' ? (
//               <StudentDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route
//             path="/teacher-dashboard"
//             element={localStorage.getItem('token') && role === 'teacher' ? (
//               <TeacherDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;

// 5.Fifth

// import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// import "./App.css";
// import HomePage from "./pages/HomePage";
// import NavigationBar from "./components/NavigationBar";
// import LoginButton from "./components/Button";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";

// function App() {
//   const role = localStorage.getItem('role');
//   const location = useLocation();
  
//   const handleLogout = () => {
//     console.log("Before logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     localStorage.clear();
//     console.log("After logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     window.location.replace('/');
//   };

//   const isLoggedIn = !!localStorage.getItem('token');
//   const isValidRole = ['student', 'teacher', 'admin'].includes(role);

//   // Only clear localStorage if not on /login or /register to allow login to complete
//   if (isLoggedIn && !isValidRole && !['/login', '/register'].includes(location.pathname)) {
//     console.log("Invalid role detected, logging out:", role);
//     localStorage.clear();
//     window.location.replace('/login');
//     return null;
//   }

//   const shouldRedirectToDashboard = isLoggedIn && !['/login', '/register'].includes(location.pathname);
//   console.log("Routing state:", { isLoggedIn, shouldRedirectToDashboard, role, currentPath: location.pathname });

//   return (
//     <>
//       <LoginButton
//         label={isLoggedIn ? "Logout" : "Login | Sign up"}
//         type="red"
//         styleClass="w-40 mr-5 h-auto p-2 my-5 transition duration-150 ease-in-out justify-self-end hover:bg-brandCream hover:text-brandRed hover:-translate-y-1 hover:scale-110"
//         redirectLink={isLoggedIn ? '/' : '/login'}
//         onClick={isLoggedIn ? handleLogout : undefined}
//       />
//       <NavigationBar />
//       <main className="lg:ml-16 p-6 transition-all duration-300">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/login"
//             element={shouldRedirectToDashboard ? (
//               (() => {
//                 console.log("Navigating from /login to dashboard for role:", role);
//                 return <Navigate to={
//                   role === 'admin' ? "/admin-dashboard" :
//                   role === 'teacher' ? "/teacher-dashboard" :
//                   "/student-dashboard"
//                 } />;
//               })()
//             ) : (
//               <LoginPage />
//             )}
//           />
//           <Route
//             path="/register"
//             element={shouldRedirectToDashboard ? (
//               <Navigate to={
//                 role === 'admin' ? "/admin-dashboard" :
//                 role === 'teacher' ? "/teacher-dashboard" :
//                 "/student-dashboard"
//               } />
//             ) : (
//               <RegisterPage />
//             )}
//           />
//           <Route
//             path="/admin-dashboard"
//             element={localStorage.getItem('token') && role === 'admin' ? (
//               <AdminDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route
//             path="/student-dashboard"
//             element={localStorage.getItem('token') && role === 'student' ? (
//               (() => {
//                 console.log("Rendering StudentDashboard for role:", role);
//                 return <StudentDashboard />;
//               })()
//             ) : (
//               (() => {
//                 console.log("Redirecting to /login from /student-dashboard, token:", localStorage.getItem('token'), "role:", role);
//                 return <Navigate to="/login" />;
//               })()
//             )}
//           />
//           <Route
//             path="/teacher-dashboard"
//             element={localStorage.getItem('token') && role === 'teacher' ? (
//               <TeacherDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;

// 6.Sixth login button issue

// import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// import "./App.css";
// import HomePage from "./pages/HomePage";
// import NavigationBar from "./components/NavigationBar";
// import LoginButton from "./components/Button";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";

// function App() {
//   const role = localStorage.getItem('role');
//   const location = useLocation();
  
//   const handleLogout = () => {
//     console.log("Before logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     localStorage.clear();
//     console.log("After logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     window.location.replace('/');
//   };

//   const isLoggedIn = !!localStorage.getItem('token');
//   const isValidRole = ['student', 'teacher', 'admin'].includes(role);

//   console.log("Checking localStorage at render:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });

//   if (isLoggedIn && !isValidRole && !['/login', '/register'].includes(location.pathname)) {
//     console.log("Invalid role detected, logging out:", role);
//     localStorage.clear();
//     window.location.replace('/login');
//     return null;
//   }

//   const shouldRedirectToDashboard = isLoggedIn && !['/login', '/register'].includes(location.pathname);
//   console.log("Routing state:", { isLoggedIn, shouldRedirectToDashboard, role, currentPath: location.pathname });

//   return (
//     <>
//       <LoginButton
//         label={isLoggedIn ? "Logout" : "Login | Sign up"}
//         type="red"
//         styleClass="w-40 mr-5 h-auto p-2 my-5 transition duration-150 ease-in-out justify-self-end hover:bg-brandCream hover:text-brandRed hover:-translate-y-1 hover:scale-110"
//         redirectLink={isLoggedIn ? '/' : '/login'}
//         onClick={isLoggedIn ? handleLogout : undefined}
//       />
//       <NavigationBar />
//       <main className="lg:ml-16 p-6 transition-all duration-300">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/login"
//             element={shouldRedirectToDashboard ? (
//               (() => {
//                 console.log("Navigating from /login to dashboard for role:", role);
//                 return <Navigate to={
//                   role === 'admin' ? "/admin-dashboard" :
//                   role === 'teacher' ? "/teacher-dashboard" :
//                   "/student-dashboard"
//                 } />;
//               })()
//             ) : (
//               <LoginPage />
//             )}
//           />
//           <Route
//             path="/register"
//             element={shouldRedirectToDashboard ? (
//               <Navigate to={
//                 role === 'admin' ? "/admin-dashboard" :
//                 role === 'teacher' ? "/teacher-dashboard" :
//                 "/student-dashboard"
//               } />
//             ) : (
//               <RegisterPage />
//             )}
//           />
//           <Route
//             path="/admin-dashboard"
//             element={localStorage.getItem('token') && role === 'admin' ? (
//               <AdminDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route
//             path="/student-dashboard"
//             element={localStorage.getItem('token') && role === 'student' ? (
//               (() => {
//                 console.log("Rendering StudentDashboard for role:", role);
//                 return <StudentDashboard />;
//               })()
//             ) : (
//               (() => {
//                 console.log("Redirecting to /login from /student-dashboard, token:", localStorage.getItem('token'), "role:", role);
//                 return <Navigate to="/login" />;
//               })()
//             )}
//           />
//           <Route
//             path="/teacher-dashboard"
//             element={localStorage.getItem('token') && role === 'teacher' ? (
//               (() => {
//                 console.log("Rendering TeacherDashboard for role:", role);
//                 return <TeacherDashboard />;
//               })()
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;

// 7.Sevent

// import { Route, Routes, Navigate, useLocation } from "react-router-dom";
// import "./App.css";
// import HomePage from "./pages/HomePage";
// import NavigationBar from "./components/NavigationBar";
// import LoginButton from "./components/Button";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";

// function App() {
//   const role = localStorage.getItem('role');
//   const location = useLocation();
  
//   const handleLogout = () => {
//     console.log("Before logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     localStorage.clear();
//     console.log("After logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     window.location.replace('/');
//   };

//   const isLoggedIn = !!localStorage.getItem('token');
//   const isValidRole = ['student', 'teacher', 'admin'].includes(role);

//   console.log("Checking localStorage at render:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });

//   if (isLoggedIn && !isValidRole && !['/login', '/register'].includes(location.pathname)) {
//     console.log("Invalid role detected, logging out:", role);
//     localStorage.clear();
//     window.location.replace('/login');
//     return null;
//   }

//   const shouldRedirectToDashboard = isLoggedIn && !['/login', '/register'].includes(location.pathname);
//   console.log("Routing state:", { isLoggedIn, shouldRedirectToDashboard, role, currentPath: location.pathname });

//   return (
//     <>
//       <LoginButton
//         label={isLoggedIn ? "Logout" : "Login | Sign up"}
//         type="red"
//         styleClass="w-40 mr-5 h-auto p-2 my-5 transition duration-150 ease-in-out justify-self-end hover:bg-brandCream hover:text-brandRed hover:-translate-y-1 hover:scale-110"
//         redirectLink={isLoggedIn ? '/' : '/login'}
//         onClick={isLoggedIn ? handleLogout : undefined}
//       />
//       <NavigationBar isLoggedIn={isLoggedIn} role={role} />
//       <main className="lg:ml-16 p-6 transition-all duration-300">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/login"
//             element={shouldRedirectToDashboard ? (
//               (() => {
//                 console.log("Navigating from /login to dashboard for role:", role);
//                 return <Navigate to={
//                   role === 'admin' ? "/admin-dashboard" :
//                   role === 'teacher' ? "/teacher-dashboard" :
//                   "/student-dashboard"
//                 } />;
//               })()
//             ) : (
//               <LoginPage />
//             )}
//           />
//           <Route
//             path="/register"
//             element={shouldRedirectToDashboard ? (
//               <Navigate to={
//                 role === 'admin' ? "/admin-dashboard" :
//                 role === 'teacher' ? "/teacher-dashboard" :
//                 "/student-dashboard"
//               } />
//             ) : (
//               <RegisterPage />
//             )}
//           />
//           <Route
//             path="/admin-dashboard"
//             element={localStorage.getItem('token') && role === 'admin' ? (
//               <AdminDashboard />
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route
//             path="/student-dashboard"
//             element={localStorage.getItem('token') && role === 'student' ? (
//               (() => {
//                 console.log("Rendering StudentDashboard for role:", role);
//                 return <StudentDashboard />;
//               })()
//             ) : (
//               (() => {
//                 console.log("Redirecting to /login from /student-dashboard, token:", localStorage.getItem('token'), "role:", role);
//                 return <Navigate to="/login" />;
//               })()
//             )}
//           />
//           <Route
//             path="/teacher-dashboard"
//             element={localStorage.getItem('token') && role === 'teacher' ? (
//               (() => {
//                 console.log("Rendering TeacherDashboard for role:", role);
//                 return <TeacherDashboard />;
//               })()
//             ) : (
//               <Navigate to="/login" />
//             )}
//           />
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;

// 8.Eight Working
// import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
// import "./App.css";
// import HomePage from "./pages/HomePage";
// import NavigationBar from "./components/NavigationBar";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import StudentDashboard from "./pages/StudentDashboard";
// import TeacherDashboard from "./pages/TeacherDashboard";
// import CourseRoadmap from "./pages/CourseRoadmap";
// import SkillContent from "./pages/SkillContent";
// import TeacherCourseEditor from './pages/Teacher/TeacherCourseEditor';
// import CreateAssignment from './pages/CreateAssignment';
// import ViewAssignment from './pages/ViewAssignment';



// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const user = JSON.parse(localStorage.getItem('user')) || {};
//   const role = user.role || localStorage.getItem('role');
//   const isLoggedIn = !!localStorage.getItem('token');
//   const isValidRole = ['student', 'teacher', 'admin'].includes(role);

//   if (isLoggedIn && !isValidRole && !['/login', '/register'].includes(location.pathname)) {
//     console.log("Invalid role detected, logging out:", role);
//     localStorage.clear();
//     navigate('/login');
//     return null;
//   }

//   const shouldRedirectToDashboard = isLoggedIn && !['/login', '/register'].includes(location.pathname);
//   console.log("Routing state:", { isLoggedIn, shouldRedirectToDashboard, role, currentPath: location.pathname });

//   const handleLogout = () => {
//     console.log("Before logout:", { token: localStorage.getItem('token'), user: localStorage.getItem('user') });
//     localStorage.clear();
//     console.log("After logout:", { token: localStorage.getItem('token'), user: localStorage.getItem('user') });
//     navigate('/');
//   };

//   return (
//     <>
//       <NavigationBar isLoggedIn={isLoggedIn} role={role} onLogout={handleLogout} />
//       <main className="lg:ml-16 p-6 transition-all duration-300">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/login"
//             element={
//               shouldRedirectToDashboard ? (
//                 (() => {
//                   console.log("Navigating from /login to dashboard for role:", role);
//                   return <Navigate to={
//                     role === 'admin' ? "/admin-dashboard" :
//                     role === 'teacher' ? "/teacher-dashboard" :
//                     "/student-dashboard"
//                   } />;
//                 })()
//               ) : (
//                 <LoginPage />
//               )
//             }
//           />
//           <Route path="/teacher/course-editor/:courseId" element={<TeacherCourseEditor />} />
//           <Route
//             path="/register"
//             element={
//               shouldRedirectToDashboard ? (
//                 <Navigate to={
//                   role === 'admin' ? "/admin-dashboard" :
//                   role === 'teacher' ? "/teacher-dashboard" :
//                   "/student-dashboard"
//                 } />
//               ) : (
//                 <RegisterPage />
//               )
//             }
//           />
//           <Route
//             path="/admin-dashboard"
//             element={
//               isLoggedIn && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />
//             }
//           />
//           <Route
//             path="/student-dashboard"
//             element={
//               isLoggedIn && role === 'student' ? (
//                 (() => {
//                   console.log("Rendering StudentDashboard for role:", role);
//                   return <StudentDashboard />;
//                 })()
//               ) : (
//                 (() => {
//                   console.log("Redirecting to /login from /student-dashboard, token:", localStorage.getItem('token'), "role:", role);
//                   return <Navigate to="/login" />;
//                 })()
//               )
//             }
//           />
//           <Route
//             path="/teacher-dashboard"
//             element={
//               isLoggedIn && role === 'teacher' ? (
//                 (() => {
//                   console.log("Rendering TeacherDashboard for role:", role);
//                   return <TeacherDashboard />;
//                 })()
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />
//           <Route
//             path="/course-roadmap/:courseId"
//             element={
//               isLoggedIn && role === 'student' ? <CourseRoadmap /> : <Navigate to="/login" />
//             }
//           />
//           <Route
//             path="/skill-content/:skill"
//             element={
//               isLoggedIn && role === 'student' ? <SkillContent /> : <Navigate to="/login" />
//             }
//           />
//           <Route path="*" element={<Navigate to="/" />} />
//           {/* <Route path="/teacher/create-assignment" element={<CreateAssignment />} /> */}
//           <Route path="/teacher/view-assignment" element={<ViewAssignment />} />
//           {/* <Route path="/assignments/:assignmentId" element={<ViewAssignment />} /> */}

//           {isLoggedIn ? (
//             <>
//               {role === 'teacher' && (
//                 <>
                  
//                   <Route path="/teacher/create-assignment" element={<CreateAssignment />} />
//                   {/* <Route path="/assignment/:id" element={<ViewAssignment />} /> */}
//                 </>
//               )}
//               {role === 'student' && (
//                 <>
//                   {/* <Route path="/student-dashboard" element={<StudentDashboard />} /> */}
//                   {/* <Route path="/assignment/:id" element={<ViewAssignment />} /> */}
//                 </>
//               )}
//               <Route
//                 path="*"
//                 element={
//                   <div className="p-4 text-center text-brandRed">
//                     {role === 'student' ? 'Access Denied: Teachers Only' : 'Please log in'}
//                   </div>
//                 }
//               />
//             </>
//           ) : (
//             <>
//               <Route path="/login" element={<div className="p-4 text-center">Login Page</div>} />
//               <Route
//                 path="*"
//                 element={<div className="p-4 text-center text-brandRed">Please log in</div>}
//               />
//             </>
//           )}


//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;


// 9.Ninth

// import React, { useEffect } from 'react';
// import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
// import './App.css';
// import HomePage from './pages/HomePage';
// import NavigationBar from './components/NavigationBar';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import AdminDashboard from './pages/AdminDashboard';
// import StudentDashboard from './pages/StudentDashboard';
// import TeacherDashboard from './pages/TeacherDashboard';
// import CourseRoadmap from './pages/CourseRoadmap';
// import SkillContent from './pages/SkillContent';
// import TeacherCourseEditor from './pages/Teacher/TeacherCourseEditor';
// import CreateAssignment from './pages/CreateAssignment';
// import ViewAssignment from './pages/ViewAssignment';

// function App() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const user = JSON.parse(localStorage.getItem('user')) || {};
//   const role = user.role || localStorage.getItem('role');
//   const isLoggedIn = !!localStorage.getItem('token');
//   const isValidRole = ['student', 'teacher', 'admin'].includes(role);

//   useEffect(() => {
//     if (isLoggedIn && !isValidRole && !['/login', '/register'].includes(location.pathname)) {
//       console.log('Invalid role detected, logging out:', role);
//       localStorage.clear();
//       navigate('/login');
//     } else if (isLoggedIn) {
//       console.log('Routing state:', {
//         isLoggedIn,
//         role,
//         currentPath: location.pathname,
//       });
//       // Redirect from /login or /register to appropriate dashboard
//       if (['/login', '/register'].includes(location.pathname)) {
//         const target =
//           role === 'admin' ? '/admin-dashboard' :
//           role === 'teacher' ? '/teacher-dashboard' :
//           '/student-dashboard';
//         console.log(`Navigating from ${location.pathname} to ${target} for role: ${role}`);
//         navigate(target);
//       }
//       // Prevent students from accessing teacher routes
//       else if (role === 'student' && location.pathname.startsWith('/teacher')) {
//         console.log(`Unauthorized access attempt by student to ${location.pathname}`);
//         navigate('/student-dashboard');
//       }
//       // Prevent teachers from accessing student-specific routes
//       else if (role === 'teacher' && (
//         location.pathname === '/student-dashboard' ||
//         location.pathname.startsWith('/course-roadmap') ||
//         location.pathname.startsWith('/skill-content')
//       )) {
//         console.log(`Redirecting teacher from ${location.pathname} to /teacher-dashboard`);
//         navigate('/teacher-dashboard');
//       }
//       // Prevent admins from accessing teacher or student routes
//       else if (role === 'admin' && (
//         location.pathname.startsWith('/teacher') ||
//         location.pathname === '/student-dashboard' ||
//         location.pathname.startsWith('/course-roadmap') ||
//         location.pathname.startsWith('/skill-content')
//       )) {
//         console.log(`Redirecting admin from ${location.pathname} to /admin-dashboard`);
//         navigate('/admin-dashboard');
//       }
//     } else if (!['/login', '/register', '/'].includes(location.pathname)) {
//       console.log(`Redirecting to /login from ${location.pathname}, token: ${localStorage.getItem('token')}, role: ${role}`);
//       navigate('/login');
//     }
//   }, [isLoggedIn, isValidRole, role, location.pathname, navigate]);

//   const handleLogout = () => {
//     console.log('Before logout:', { token: localStorage.getItem('token'), user: localStorage.getItem('user') });
//     localStorage.clear();
//     console.log('After logout:', { token: localStorage.getItem('token'), user: localStorage.getItem('user') });
//     navigate('/');
//   };

//   return (
//     <>
//       <NavigationBar isLoggedIn={isLoggedIn} role={role} onLogout={handleLogout} />
//       <main className="lg:ml-16 p-6 transition-all duration-300">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/login"
//             element={isLoggedIn ? <Navigate to={
//               role === 'admin' ? '/admin-dashboard' :
//               role === 'teacher' ? '/teacher-dashboard' :
//               '/student-dashboard'
//             } /> : <LoginPage />}
//           />
//           <Route
//             path="/register"
//             element={isLoggedIn ? <Navigate to={
//               role === 'admin' ? '/admin-dashboard' :
//               role === 'teacher' ? '/teacher-dashboard' :
//               '/student-dashboard'
//             } /> : <RegisterPage />}
//           />
//           <Route
//             path="/admin-dashboard"
//             element={isLoggedIn && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/student-dashboard"
//             element={isLoggedIn && role === 'student' ? <StudentDashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/teacher-dashboard"
//             element={isLoggedIn && role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/course-roadmap/:courseId"
//             element={isLoggedIn && role === 'student' ? <CourseRoadmap /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/skill-content/:skill"
//             element={isLoggedIn && role === 'student' ? <SkillContent /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/teacher/course-editor/:courseId"
//             element={isLoggedIn && role === 'teacher' ? <TeacherCourseEditor /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/teacher/create-assignment"
//             element={isLoggedIn && role === 'teacher' ? <CreateAssignment /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/teacher/view-assignment"
//             element={isLoggedIn && role === 'teacher' ? <ViewAssignment /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="/assignment/:assignmentId"
//             element={isLoggedIn ? <ViewAssignment /> : <Navigate to="/login" />}
//           />
//           <Route
//             path="*"
//             element={
//               <div className="p-4 text-center text-brandRed">
//                 {isLoggedIn && role === 'student' ? 'Access Denied: Teachers Only' : 'Please log in'}
//               </div>
//             }
//           />
//         </Routes>
//       </main>
//     </>
//   );
// }

// export default App;


// 1Tenth

// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import NavigationBar from './components/NavigationBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import CourseRoadmap from './pages/CourseRoadmap';
import SkillContent from './pages/SkillContent';
import TeacherCourseEditor from './pages/Teacher/TeacherCourseEditor';
import CreateAssignment from './pages/CreateAssignment';
import ViewAssignment from './pages/ViewAssignment';
import EvaluationPage from './pages/EvaluationPage';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user')) || {};
  const role = user.role || localStorage.getItem('role');
  const isLoggedIn = !!localStorage.getItem('token');
  const isValidRole = ['student', 'teacher', 'admin'].includes(role);

  useEffect(() => {
    if (isLoggedIn && !isValidRole && !['/login', '/register'].includes(location.pathname)) {
      console.log('Invalid role detected, logging out:', role);
      localStorage.clear();
      navigate('/login');
    } else if (isLoggedIn) {
      console.log('Routing state:', {
        isLoggedIn,
        role,
        currentPath: location.pathname,
      });
      // Redirect from /login or /register to appropriate dashboard
      if (['/login', '/register'].includes(location.pathname)) {
        const target =
          role === 'admin' ? '/admin-dashboard' :
          role === 'teacher' ? '/teacher-dashboard' :
          '/student-dashboard';
        console.log(`Navigating from ${location.pathname} to ${target} for role: ${role}`);
        navigate(target);
      }
      // Prevent students from accessing teacher routes
      else if (role === 'student' && location.pathname.startsWith('/teacher')) {
        console.log(`Unauthorized access attempt by student to ${location.pathname}`);
        navigate('/student-dashboard');
      }
      // Prevent teachers from accessing student-specific routes
      else if (role === 'teacher' && (
        location.pathname === '/student-dashboard' ||
        location.pathname.startsWith('/course-roadmap') ||
        location.pathname.startsWith('/skill-content')
      )) {
        console.log(`Redirecting teacher from ${location.pathname} to /teacher-dashboard`);
        navigate('/teacher-dashboard');
      }
      // Prevent admins from accessing teacher or student routes
      else if (role === 'admin' && (
        location.pathname.startsWith('/teacher') ||
        location.pathname === '/student-dashboard' ||
        location.pathname.startsWith('/course-roadmap') ||
        location.pathname.startsWith('/skill-content')
      )) {
        console.log(`Redirecting admin from ${location.pathname} to /admin-dashboard`);
        navigate('/admin-dashboard');
      }
    } else if (!['/login', '/register', '/'].includes(location.pathname)) {
      console.log(`Redirecting to /login from ${location.pathname}, token: ${localStorage.getItem('token')}, role: ${role}`);
      navigate('/login');
    }
  }, [isLoggedIn, isValidRole, role, location.pathname, navigate]);

  const handleLogout = () => {
    console.log('Before logout:', { token: localStorage.getItem('token'), user: localStorage.getItem('user') });
    localStorage.clear();
    console.log('After logout:', { token: localStorage.getItem('token'), user: localStorage.getItem('user') });
    navigate('/');
  };

  return (
    <>
      <NavigationBar isLoggedIn={isLoggedIn} role={role} onLogout={handleLogout} />
      <main className="lg:ml-16 p-6 transition-all duration-300">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to={
              role === 'admin' ? '/admin-dashboard' :
              role === 'teacher' ? '/teacher-dashboard' :
              '/student-dashboard'
            } /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to={
              role === 'admin' ? '/admin-dashboard' :
              role === 'teacher' ? '/teacher-dashboard' :
              '/student-dashboard'
            } /> : <RegisterPage />}
          />
          <Route
            path="/admin-dashboard"
            element={isLoggedIn && role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/student-dashboard"
            element={isLoggedIn && role === 'student' ? <StudentDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/teacher-dashboard"
            element={isLoggedIn && role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/course-roadmap/:courseId"
            element={isLoggedIn && role === 'student' ? <CourseRoadmap /> : <Navigate to="/login" />}
          />
          <Route
            path="/skill-content/:skill"
            element={isLoggedIn && role === 'student' ? <SkillContent /> : <Navigate to="/login" />}
          />
          <Route
            path="/teacher/course-editor/:courseId"
            element={isLoggedIn && role === 'teacher' ? <TeacherCourseEditor /> : <Navigate to="/login" />}
          />
          <Route
            path="/teacher/create-assignment"
            element={isLoggedIn && role === 'teacher' ? <CreateAssignment /> : <Navigate to="/login" />}
          />
          <Route
            path="/teacher/view-assignment/:assignmentId" // Updated route
            element={isLoggedIn && role === 'teacher' ? <ViewAssignment /> : <Navigate to="/login" />}
          />
          <Route
            path="/assignment/:assignmentId"
            element={isLoggedIn && role === 'student' ? <ViewAssignment /> : <Navigate to="/login" />}
          />
          <Route path="/evaluation/:submissionId" element={<EvaluationPage />} />
          <Route
            path="*"
            element={
              <div className="p-4 text-center text-brandRed">
                {isLoggedIn && role === 'student' ? 'Access Denied: Teachers Only' : 'Please log in'}
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;