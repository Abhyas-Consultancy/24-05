import { useState } from "react";
import axios from "axios";
import TextContainer from "../../components/TextContainer";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register/", {
        username,
        password,
        role,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("username", response.data.username);
      window.location.href = response.data.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard";
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-brandCream min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-brandRed text-5xl font-extrabold mb-6">Register</h1>
      <TextContainer
        type="cream"
        text="Create an account to start your IELTS journey. Choose your role as a student or teacher and gain access to our comprehensive resources and tools."
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
          />
        </div>
        <div className="mb-4">
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
          />
        </div>
        <div className="mb-6">
          <label htmlFor="role" className="block text-brandRed font-bold mb-2">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-brandRed text-white font-bold py-3 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 ease-in-out"
        >
          Register
        </button>
      </div>
      <p className="mt-4 text-brandRed">
        Already have an account?{" "}
        <a href="/login" className="underline hover:text-brandRed/80">
          Login here
        </a>
      </p>
    </div>
  );
}

export default RegisterPage;