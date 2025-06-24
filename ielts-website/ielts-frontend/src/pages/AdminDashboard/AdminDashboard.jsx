// 

import { useState, useEffect } from "react";
import axios from "axios";
import TextContainer from "../../components/TextContainer";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Load data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    const config = { headers: { Authorization: `Token ${token}` } };

    axios.get(`${API_BASE_URL}/api/users/`, config)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));

    axios.get(`${API_BASE_URL}/api/courses/`, config)
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  };

  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const token = localStorage.getItem("token");
    axios.delete(`${API_BASE_URL}/api/users/${id}/`, {
      headers: { Authorization: `Token ${token}` }
    })
    .then(() => {
      alert("User deleted successfully");
      fetchAllData();
    })
    .catch(err => console.error("Error deleting user:", err));
  };

  const deleteCourse = (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    const token = localStorage.getItem("token");
    axios.delete(`${API_BASE_URL}/api/courses/${id}/`, {
      headers: { Authorization: `Token ${token}` }
    })
    .then(() => {
      alert("Course deleted successfully");
      fetchAllData();
    })
    .catch(err => console.error("Error deleting course:", err));
  };

  const assignCourse = () => {
    if (!selectedUser || !selectedCourse) {
      alert("Please select both student and course.");
      return;
    }
    const token = localStorage.getItem("token");
    axios.post(`${API_BASE_URL}/api/assign-course/`, {
      student_id: selectedUser,
      course_id: selectedCourse
    }, { headers: { Authorization: `Token ${token}` } })
      .then(() => {
        alert("Course assigned successfully");
        setSelectedUser("");
        setSelectedCourse("");
      })
      .catch(err => console.error("Error assigning course:", err));
  };

  return (
    <div className="bg-brandCream min-h-screen p-6">
      <h1 className="text-brandRed text-5xl font-extrabold mb-6 text-center">
        Admin Dashboard
      </h1>

      <TextContainer
        type="cream"
        text="Manage users, courses, and assign courses to students."
        styleClass="mb-8 max-w-2xl mx-auto text-center"
      />

      {/* Users Section */}
      <section className="mb-12">
        <h2 className="text-brandRed text-3xl font-bold mb-4">Users</h2>
        {users.length === 0 ? (
          <p className="text-gray-600">No users available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <div key={user.id} className="bg-white p-4 rounded-lg shadow-lg">
                <p className="text-brandRed font-bold">{user.username}</p>
                <p>Role: {user.role}</p>
                <button 
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded" 
                  onClick={() => deleteUser(user.id)}
                >
                  Delete User
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Courses Section */}
      <section className="mb-12 bg-brandRed text-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Courses</h2>
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-white text-brandRed p-4 rounded-lg shadow-lg">
                <h3 className="font-bold mb-2">{course.title}</h3>
                <p>Created by: {course.created_by.username}</p>
                <p>Created on: {new Date(course.created_at).toLocaleDateString()}</p>
                <button 
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded" 
                  onClick={() => deleteCourse(course.id)}
                >
                  Delete Course
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Assign Course Section */}
      <section className="mb-12">
        <h2 className="text-brandRed text-3xl font-bold mb-4">Assign Course to Student</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4">
          <select 
            value={selectedUser} 
            onChange={(e) => setSelectedUser(e.target.value)} 
            className="p-2 border rounded"
          >
            <option value="">Select Student</option>
            {users.filter(user => user.role === "student").map(user => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>

          <select 
            value={selectedCourse} 
            onChange={(e) => setSelectedCourse(e.target.value)} 
            className="p-2 border rounded"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>

          <button 
            onClick={assignCourse} 
            className="bg-brandRed text-white py-2 px-4 rounded"
          >
            Assign Course
          </button>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;


// // 2. Second dont know
// import { useState, useEffect } from "react";
// import axios from "axios";
// import TextContainer from "../../components/TextContainer";

// function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       window.location.href = "/login";
//       return;
//     }

//     const config = { headers: { Authorization: `Token ${token}` } };
//     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//     const fetchData = async () => {
//       try {
//         const [usersResponse, coursesResponse, submissionsResponse] = await Promise.all([
//           axios.get(`${API_BASE_URL}/api/users/`, config),
//           axios.get(`${API_BASE_URL}/api/courses/`, config),
//           axios.get(`${API_BASE_URL}/api/submission-list/`, config),
//         ]);
//         console.log("Users response:", usersResponse.data);
//         console.log("Courses response:", coursesResponse.data);
//         console.log("Submissions response:", submissionsResponse.data);
//         setUsers(Array.isArray(usersResponse.data) ? usersResponse.data : []);
//         setCourses(Array.isArray(coursesResponse.data) ? coursesResponse.data : []);
//         setSubmissions(Array.isArray(submissionsResponse.data) ? submissionsResponse.data : []);
//         setLoading(false);
//       } catch (err) {
//         console.log("Error fetching data:", err.response?.data);
//         setError('Failed to load data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div className="text-center mt-10 text-brandRed">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

//   return (
//     <div className="bg-brandCream min-h-screen p-6">
//       <h1 className="text-brandRed text-5xl font-extrabold mb-6 text-center">
//         Admin Dashboard
//       </h1>
//       <TextContainer
//         type="cream"
//         text="Manage the IELTS platform: oversee users, courses, and student submissions."
//         styleClass="mb-8 max-w-2xl mx-auto text-center"
//       />

//       {/* Users Section */}
//       <section className="mb-12">
//         <h2 className="text-brandRed text-3xl font-bold mb-4">Users</h2>
//         {users.length === 0 ? (
//           <p className="text-gray-600">No users available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {users.map((user) => (
//               <div key={user.id} className="bg-white p-4 rounded-lg shadow-lg">
//                 <p className="text-brandRed font-bold">{user.username}</p>
//                 <p>Role: {user.role}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Courses Section */}
//       <section className="mb-12 bg-brandRed text-white p-6 rounded-lg">
//         <h2 className="text-3xl font-bold mb-4">Courses</h2>
//         {courses.length === 0 ? (
//           <p>No courses available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {courses.map((course) => (
//               <div key={course.id} className="bg-white text-brandRed p-4 rounded-lg shadow-lg">
//                 <h3 className="font-bold mb-2">{course.title}</h3>
//                 <p>Created by User ID: {course.created_by}</p>
//                 <p>Created on: {new Date(course.created_at).toLocaleDateString()}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Submissions Section */}
//       <section className="mb-12">
//         <h2 className="text-brandRed text-3xl font-bold mb-4">Submissions</h2>
//         {submissions.length === 0 ? (
//           <p className="text-gray-600">No submissions available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {submissions.map((submission) => (
//               <div key={submission.id} className="bg-white p-4 rounded-lg shadow-lg">
//                 <p className="text-brandRed font-bold">
//                   Assignment ID: {submission.mock_assignment}
//                 </p>
//                 <p>Student ID: {submission.student}</p>
//                 <p>Submitted on: {new Date(submission.submitted_at).toLocaleDateString()}</p>
//                 <p>AI Score: {submission.ai_score || 'N/A'}</p>
//                 <p>Teacher Score: {submission.teacher_score || 'N/A'}</p>
//                 {submission.submission_file && (
//                   <a
//                     href={submission.submission_file}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
//                   >
//                     View File
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// export default AdminDashboard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);

//   const token = localStorage.getItem('token');
//   const config = { headers: { Authorization: `Token ${token}` } };

// useEffect(() => {
//   axios.get('/api/users/', config)
//     .then(res => {
//       const data = Array.isArray(res.data) ? res.data : res.data.results || [];
//       setUsers(data);
//     })
//     .catch(err => {
//       console.error('Error fetching users:', err);
//       setUsers([]);
//     });

//   axios.get('/api/courses/', config)
//     .then(res => {
//       const data = Array.isArray(res.data) ? res.data : res.data.results || [];
//       setCourses(data);
//     })
//     .catch(err => {
//       console.error('Error fetching courses:', err);
//       setCourses([]);
//     });
// }, []);

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
//       <div className="grid grid-cols-2 gap-6">
//         <div>
//           <h2 className="text-xl font-bold mb-2">Students</h2>
//           <ul>
//             {users.filter(u => u.role === 'student').map(user => (
//               <li key={user.id} className="border p-2 mb-2">
//                 {user.username}
//                 <button className="ml-4 bg-blue-500 text-white px-2 py-1 rounded" onClick={() => setSelectedUser(user.id)}>Assign Course</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           {selectedUser && (
//             <>
//               <h2 className="text-xl font-bold mb-2">Assign Course to User #{selectedUser}</h2>
//               {courses.map(course => (
//                 <button
//                   key={course.id}
//                   className="block bg-green-600 text-white px-3 py-1 mb-2 rounded"
//                   onClick={() => assignCourse(selectedUser, course.id)}
//                 >
//                   {course.title}
//                 </button>
//               ))}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
