// import { useState } from "react";
// import axios from "axios";
// import TextContainer from "../../components/TextContainer";

// function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/login/", {
//         username,
//         password,
//       });
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("role", response.data.role);
//       localStorage.setItem("username", response.data.username);
//       window.location.href = response.data.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard";
//     } catch (error) {
//       setError(error.response?.data?.error || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="bg-brandCream min-h-screen flex flex-col items-center justify-center p-6">
//       <h1 className="text-brandRed text-5xl font-extrabold mb-6">Login</h1>
//       <TextContainer
//         type="cream"
//         text="Sign in to access your IELTS coaching dashboard. Whether you're a student preparing for your exam or a teacher managing courses, log in to get started."
//         styleClass="mb-8 max-w-lg text-center"
//       />
//       {error && (
//         <p className="text-red-500 mb-4">{error}</p>
//       )}
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <div className="mb-4">
//           <label htmlFor="username" className="block text-brandRed font-bold mb-2">
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="password" className="block text-brandRed font-bold mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
//             required
//           />
//         </div>
//         <button
//           onClick={handleSubmit}
//           className="w-full bg-brandRed text-white font-bold py-3 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 ease-in-out"
//         >
//           Login
//         </button>
//       </div>
//       <p className="mt-4 text-brandRed">
//         Don’t have an account?{" "}
//         <a href="/register" className="underline hover:text-brandRed/80">
//           Register here
//         </a>
//       </p>
//     </div>
//   );
// }

// export default LoginPage;




// 2.Second
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import axios from "axios";
// import TextContainer from "../../components/TextContainer";

// function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/login/", {
//         username,
//         password,
//       });
//       console.log("Login response:", response.data);
//       const role = response.data.role;
//       // Validate role
//       if (!['student', 'teacher', 'admin'].includes(role)) {
//         setError("Invalid role received from server. Please contact support.");
//         return;
//       }
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("role", role);
//       localStorage.setItem("username", response.data.username);
//       const redirectPath = role === "admin" ? "/admin-dashboard" :
//                           role === "teacher" ? "/teacher-dashboard" :
//                           "/student-dashboard";
//       console.log("Redirecting to:", redirectPath);
//       navigate(redirectPath); // Use navigate instead of window.location.href
//     } catch (error) {
//       setError(error.response?.data?.error || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="bg-brandCream min-h-screen flex flex-col items-center justify-center p-6">
//       <h1 className="text-brandRed text-5xl font-extrabold mb-6">Login</h1>
//       <TextContainer
//         type="cream"
//         text="Sign in to access your IELTS coaching dashboard. Whether you're a student preparing for your exam or a teacher managing courses, log in to get started."
//         styleClass="mb-8 max-w-lg text-center"
//       />
//       {error && (
//         <p className="text-red-500 mb-4">{error}</p>
//       )}
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
//         <div className="mb-4">
//           <label htmlFor="username" className="block text-brandRed font-bold mb-2">
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="password" className="block text-brandRed font-bold mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
//             required
//           />
//         </div>
//         <button
//           onClick={handleSubmit}
//           className="w-full bg-brandRed text-white font-bold py-3 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 ease-in-out"
//         >
//           Login
//         </button>
//       </div>
//       <p className="mt-4 text-brandRed">
//         Don’t have an account?{" "}
//         <a href="/register" className="underline hover:text-brandRed/80">
//           Register here
//         </a>
//       </p>
//     </div>
//   );
// }

// export default LoginPage;

// 3.Third


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextContainer from "../../components/TextContainer";
import logger from "../../utils/logger";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");
    try {
      const response = await axios.post("/api/login/", {
        username,
        password,
      });
      const role = response.data.user?.role;
      if (!['student', 'teacher', 'admin'].includes(role)) {
        setError("Invalid role received from server. Please contact support.");
        setIsSubmitting(false);
        return;
      }
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", response.data.user?.username);
      logger.info(`User ${username} logged in with role ${role}`);
      const redirectPath = role === "admin" ? "/admin-dashboard" :
                          role === "teacher" ? "/teacher-dashboard" :
                          "/student-dashboard";
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
      logger.error("Login error: " + err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brandCream min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-brandRed text-5xl font-extrabold mb-6">Login</h1>
      <TextContainer
        type="cream"
        text="Sign in to access your IELTS coaching dashboard. Whether you're a student preparing for your exam or a teacher managing courses, log in to get started."
        styleClass="mb-8 max-w-lg text-center"
      />
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-brandRed font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-brandRed font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
            required
            disabled={isSubmitting}
          />
        </div>
        <button
          onClick={handleSubmit}
          className={`w-full bg-brandRed text-white font-bold py-3 rounded-lg transition duration-150 ease-in-out ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-brandCream hover:text-brandRed"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </div>
      <p className="mt-4 text-brandRed">
        Don’t have an account?{" "}
        <a href="/register" className="underline hover:text-brandRed/80">
          Register here
        </a>
      </p>
    </div>
  );
}

export default LoginPage;