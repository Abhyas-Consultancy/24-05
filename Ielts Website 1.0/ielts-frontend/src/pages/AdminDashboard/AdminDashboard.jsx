// import { useState, useEffect } from "react";
// import axios from "axios";
// import TextContainer from "../../components/TextContainer";

// function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [submissions, setSubmissions] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       window.location.href = "/login";
//       return;
//     }

//     const config = { headers: { Authorization: `Token ${token}` } };

//     // Placeholder API calls (update with actual endpoints if available)
//     axios
//       .get("http://127.0.0.1:8000/api/users/", config)
//       .then((response) => setUsers(response.data))
//       .catch((error) => console.error("Error fetching users:", error));

//     axios
//       .get("http://127.0.0.1:8000/api/courses/", config)
//       .then((response) => setCourses(response.data))
//       .catch((error) => console.error("Error fetching courses:", error));

//     axios
//       .get("http://127.0.0.1:8000/api/submissions/", config)
//       .then((response) => setSubmissions(response.data))
//       .catch((error) => console.error("Error fetching submissions:", error));
//   }, []);

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
//                 <p>Created by: {course.created_by.username}</p>
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
//                   Assignment: {submission.mock_assignment.title}
//                 </p>
//                 <p>Student: {submission.student.username}</p>
//                 <p>Submitted on: {new Date(submission.submitted_at).toLocaleDateString()}</p>
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
  

import { useState, useEffect } from "react";
import axios from "axios";
import TextContainer from "../../components/TextContainer";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const config = { headers: { Authorization: `Token ${token}` } };
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchData = async () => {
      try {
        const [usersResponse, coursesResponse, submissionsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/users/`, config),
          axios.get(`${API_BASE_URL}/api/courses/`, config),
          axios.get(`${API_BASE_URL}/api/submission-list/`, config),
        ]);
        console.log("Users response:", usersResponse.data);
        console.log("Courses response:", coursesResponse.data);
        console.log("Submissions response:", submissionsResponse.data);
        setUsers(Array.isArray(usersResponse.data) ? usersResponse.data : []);
        setCourses(Array.isArray(coursesResponse.data) ? coursesResponse.data : []);
        setSubmissions(Array.isArray(submissionsResponse.data) ? submissionsResponse.data : []);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err.response?.data);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10 text-brandRed">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="bg-brandCream min-h-screen p-6">
      <h1 className="text-brandRed text-5xl font-extrabold mb-6 text-center">
        Admin Dashboard
      </h1>
      <TextContainer
        type="cream"
        text="Manage the IELTS platform: oversee users, courses, and student submissions."
        styleClass="mb-8 max-w-2xl mx-auto text-center"
      />

      {/* Users Section */}
      <section className="mb-12">
        <h2 className="text-brandRed text-3xl font-bold mb-4">Users</h2>
        {users.length === 0 ? (
          <p className="text-gray-600">No users available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-white p-4 rounded-lg shadow-lg">
                <p className="text-brandRed font-bold">{user.username}</p>
                <p>Role: {user.role}</p>
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
            {courses.map((course) => (
              <div key={course.id} className="bg-white text-brandRed p-4 rounded-lg shadow-lg">
                <h3 className="font-bold mb-2">{course.title}</h3>
                <p>Created by User ID: {course.created_by}</p>
                <p>Created on: {new Date(course.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Submissions Section */}
      <section className="mb-12">
        <h2 className="text-brandRed text-3xl font-bold mb-4">Submissions</h2>
        {submissions.length === 0 ? (
          <p className="text-gray-600">No submissions available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-white p-4 rounded-lg shadow-lg">
                <p className="text-brandRed font-bold">
                  Assignment ID: {submission.mock_assignment}
                </p>
                <p>Student ID: {submission.student}</p>
                <p>Submitted on: {new Date(submission.submitted_at).toLocaleDateString()}</p>
                <p>AI Score: {submission.ai_score || 'N/A'}</p>
                <p>Teacher Score: {submission.teacher_score || 'N/A'}</p>
                {submission.submission_file && (
                  <a
                    href={submission.submission_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
                  >
                    View File
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;