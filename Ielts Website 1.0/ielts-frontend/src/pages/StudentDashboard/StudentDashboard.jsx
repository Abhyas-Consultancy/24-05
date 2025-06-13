// import { useState, useEffect } from "react";
// import axios from "axios";
// import TextContainer from "../../components/TextContainer";

// function StudentDashboard() {
//   const [recordedClasses, setRecordedClasses] = useState([]);
//   const [studyMaterials, setStudyMaterials] = useState([]);
//   const [mockAssignments, setMockAssignments] = useState([]);
//   const [submission, setSubmission] = useState({ mock_assignment: "", submission_text: "", submission_file: null });
//   const [courses, setCourses] = useState([]);
//   const [uploadError, setUploadError] = useState("");
//   const [fileInputKey, setFileInputKey] = useState(Date.now());

//   console.log("Rendering StudentDashboard"); // Debug log

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.log("No token found, redirecting to /login");
//       window.location.replace('/login');
//       return;
//     }

//     const config = { headers: { Authorization: `Token ${token}` } };

//     axios
//       .get("http://127.0.0.1:8000/api/recorded-classes/", config)
//       .then((response) => setRecordedClasses(response.data))
//       .catch((error) => console.error("Error fetching recorded classes:", error));

//     axios
//       .get("http://127.0.0.1:8000/api/study-materials/", config)
//       .then((response) => setStudyMaterials(response.data))
//       .catch((error) => console.error("Error fetching study materials:", error));

//     axios
//       .get("http://127.0.0.1:8000/api/mock-assignments/", config)
//       .then((response) => setMockAssignments(response.data))
//       .catch((error) => console.error("Error fetching mock assignments:", error));

//     axios
//       .get("http://127.0.0.1:8000/api/student-courses/", config)
//       .then((response) => setCourses(response.data))
//       .catch((error) => console.error("Error fetching courses:", error));
//   }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSubmission((prev) => ({ ...prev, submission_file: file }));
//   };

//   const handleSubmissionSubmit = async (e) => {
//     e.preventDefault();
//     setUploadError("");

//     if (!submission.mock_assignment) {
//       setUploadError("Please select a mock assignment.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("mock_assignment", submission.mock_assignment);
//     formData.append("submission_text", submission.submission_text);
//     if (submission.submission_file) {
//       formData.append("submission_file", submission.submission_file);
//     }

//     try {
//       const token = localStorage.getItem("token");
//       await axios.post("http://127.0.0.1:8000/api/submissions/", formData, {
//         headers: {
//           Authorization: `Token ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setSubmission({ mock_assignment: "", submission_text: "", submission_file: null });
//       setFileInputKey(Date.now());
//       alert("Submission successful!");
//     } catch (error) {
//       setUploadError(error.response?.data?.detail || "Error submitting assignment.");
//     }
//   };

//   const handleLogout = () => {
//     console.log("Before logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     localStorage.clear();
//     console.log("After logout:", { token: localStorage.getItem('token'), role: localStorage.getItem('role'), username: localStorage.getItem('username') });
//     window.location.replace('/');
//   };

//   return (
//     <div className="bg-brandCream min-h-screen p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-brandRed text-5xl font-extrabold text-center">
//           Student Dashboard
//         </h1>
//         <button
//           onClick={handleLogout}
//           className="bg-brandRed text-white font-bold py-2 px-4 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 ease-in-out"
//         >
//           Logout
//         </button>
//       </div>
//       <TextContainer
//         type="cream"
//         text="Welcome to your dashboard! Access your enrolled courses, watch recorded classes, download study materials, and submit assignments to track your progress."
//         styleClass="mb-8 max-w-2xl mx-auto text-center"
//       />

//       {/* My Courses Section */}
//       <section className="mb-12">
//         <h2 className="text-brandRed text-3xl font-bold mb-4">My Courses</h2>
//         {courses.length === 0 ? (
//           <p className="text-gray-600">No courses enrolled.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {courses.map((course) => (
//               <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg">
//                 <p className="text-brandRed font-bold">
//                   {course.course.title} - Enrolled on {new Date(course.enrolled_at).toLocaleDateString()}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Recorded Classes Section */}
//       <section className="mb-12 bg-brandRed text-white p-6 rounded-lg">
//         <h2 className="text-3xl font-bold mb-4">Recorded Classes</h2>
//         {recordedClasses.length === 0 ? (
//           <p>No recorded classes available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {recordedClasses.map((item) => (
//               <div key={item.id} className="bg-white text-brandRed p-4 rounded-lg shadow-lg">
//                 <h3 className="font-bold mb-2">{item.title}</h3>
//                 <p className="mb-2">Uploaded on {new Date(item.uploaded_at).toLocaleDateString()}</p>
//                 <video controls className="w-full rounded-lg">
//                   <source src={item.video_file} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Study Materials Section */}
//       <section className="mb-12">
//         <h2 className="text-brandRed text-3xl font-bold mb-4">Study Materials</h2>
//         {studyMaterials.length === 0 ? (
//           <p className="text-gray-600">No study materials available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {studyMaterials.map((item) => (
//               <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
//                 <h3 className="text-brandRed font-bold mb-2">{item.title}</h3>
//                 <p className="mb-2">Uploaded on {new Date(item.uploaded_at).toLocaleDateString()}</p>
//                 <a
//                   href={item.file}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
//                 >
//                   View/Download
//                 </a>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Mock Assignments Section */}
//       <section className="mb-12 bg-brandRed text-white p-6 rounded-lg">
//         <h2 className="text-3xl font-bold mb-4">Mock Assignments</h2>
//         {mockAssignments.length === 0 ? (
//           <p>No mock assignments available.</p>
//         ) : (
//           <ul className="space-y-4">
//             {mockAssignments.map((item) => (
//               <li key={item.id} className="bg-white text-brandRed p-4 rounded-lg shadow-lg">
//                 {item.title} ({item.skill}) - Created on {new Date(item.created_at).toLocaleDateString()}
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       {/* Submit Assignment Section */}
//       <section className="mb-12">
//         <h2 className="text-brandRed text-3xl font-bold mb-4">Submit Assignment</h2>
//         {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
//           <div className="mb-4">
//             <label htmlFor="mockAssignment" className="block text-brandRed font-bold mb-2">
//               Mock Assignment
//             </label>
//             <select
//               id="mockAssignment"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
//               value={submission.mock_assignment}
//               onChange={(e) => setSubmission({ ...submission, mock_assignment: e.target.value })}
//               required
//             >
//               <option value="">Select an assignment</option>
//               {mockAssignments.map((item) => (
//                 <option key={item.id} value={item.id}>{item.title}</option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="submissionText" className="block text-brandRed font-bold mb-2">
//               Submission Text
//             </label>
//             <textarea
//               id="submissionText"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
//               value={submission.submission_text}
//               onChange={(e) => setSubmission({ ...submission, submission_text: e.target.value })}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="submissionFile" className="block text-brandRed font-bold mb-2">
//               Submission File (Optional)
//             </label>
//             <input
//               type="file"
//               id="submissionFile"
//               key={`submission-${fileInputKey}`}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               onChange={handleFileChange}
//             />
//           </div>
//           <button
//             onClick={handleSubmissionSubmit}
//             className="w-full bg-brandRed text-white font-bold py-3 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 ease-in-out"
//           >
//             Submit
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default StudentDashboard;



// 4. video and course not loading

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TextContainer from "../../components/TextContainer";

function StudentDashboard() {
  const [recordedClasses, setRecordedClasses] = useState([]);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [mockAssignments, setMockAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [submission, setSubmission] = useState({ mock_assignment: "", submission_text: "", submission_file: null });
  const [courses, setCourses] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, redirecting to /login");
      window.location.replace('/login');
      return;
    }

    const config = { headers: { Authorization: `Token ${token}` } };
    // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const fetchData = async () => {
      try {
        const [recordedClassesResponse, studyMaterialsResponse, mockAssignmentsResponse, coursesResponse, submissionsResponse] = await Promise.all([
          axios.get(`/api/recorded-classes/`, config),
          axios.get(`/api/study-materials/`, config),
          axios.get(`/api/student-mock-assignments/`, config),
          axios.get(`/api/student-courses/`, config),
          axios.get(`/api/submissions/`, config),
        ]);
        console.log("Courses response:", coursesResponse.data);
        setRecordedClasses(Array.isArray(recordedClassesResponse.data) ? recordedClassesResponse.data : []);
        setStudyMaterials(Array.isArray(studyMaterialsResponse.data) ? studyMaterialsResponse.data : []);
        setMockAssignments(Array.isArray(mockAssignmentsResponse.data) ? mockAssignmentsResponse.data : []);
        setCourses(Array.isArray(coursesResponse.data) ? coursesResponse.data : []);
        setSubmissions(Array.isArray(submissionsResponse.data) ? submissionsResponse.data : []);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err.response?.data);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSubmission((prev) => ({ ...prev, submission_file: file }));
  };

  const handleSubmissionSubmit = async (e) => {
    e.preventDefault();
    setUploadError("");

    if (!submission.mock_assignment) {
      setUploadError("Please select a mock assignment.");
      return;
    }

    const formData = new FormData();
    formData.append("mock_assignment", submission.mock_assignment);
    formData.append("submission_text", submission.submission_text);
    if (submission.submission_file) {
      formData.append("submission_file", submission.submission_file);
    }

    try {
      const token = localStorage.getItem("token");
      // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`/api/submissions/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSubmissions([...submissions, response.data]);
      setSubmission({ mock_assignment: "", submission_text: "", submission_file: null });
      setFileInputKey(Date.now());
      alert("Submission successful!");
    } catch (error) {
      setUploadError(error.response?.data?.detail || "Error submitting assignment.");
    }
  };

  const handleEvaluateSubmission = async (submissionId) => {
    try {
      const token = localStorage.getItem("token");
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(
        `${API_BASE_URL}/api/evaluate-submission/`,
        { submission_id: submissionId, evaluate_by_teacher: false },
        { headers: { Authorization: `Token ${token}` } }
      );
      const updatedSubmission = submissions.map((sub) =>
        sub.id === submissionId ? { ...sub, ai_score: response.data.ai_score, ai_feedback: response.data.ai_feedback } : sub
      );
      setSubmissions(updatedSubmission);
      alert("Evaluation completed! Check the updated scores.");
    } catch (error) {
      alert("Error evaluating submission: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  if (loading) return <div className="text-center mt-10 text-brandRed">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="bg-brandCream min-h-screen p-6">
      <h1 className="text-brandRed text-5xl font-extrabold mb-6 text-center">
        Student Dashboard
      </h1>
      <TextContainer
        type="cream"
        text="Welcome to your dashboard! Access your enrolled courses, watch recorded classes, download study materials, and submit assignments to track your progress."
        styleClass="mb-8 max-w-2xl mx-auto text-center"
      />

      <section className="mb-12">
        <h2 className="text-brandRed text-3xl font-bold mb-4">Skill Navigation</h2>
        <div className="flex flex-wrap gap-4">
          {['speaking', 'listening', 'reading', 'writing'].map((skill) => (
            <Link
              key={skill}
              to={`/skill-content/${skill}`}
              className="bg-brandRed text-white px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 capitalize"
            >
              {skill}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-brandRed text-3xl font-bold mb-4">My Courses</h2>
        {courses.length === 0 ? (
          <p className="text-gray-600">No courses enrolled.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-brandRed font-bold">
                  {course.course.title} - Enrolled on {new Date(course.enrolled_at).toLocaleDateString()}
                </p>
                <Link
                  to={`/course-roadmap/${course.course.id}`}
                  className="mt-2 inline-block bg-brandRed text-white px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
                >
                  View Roadmap
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-12 bg-brandRed text-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Recorded Classes</h2>
        {recordedClasses.length === 0 ? (
          <p>No recorded classes available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recordedClasses.map((item) => (
              <div key={item.id} className="bg-white text-brandRed p-4 rounded-lg shadow-lg">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="mb-2">Uploaded on {new Date(item.uploaded_at).toLocaleDateString()}</p>
                <p className="mb-2">Skill: {item.skill || 'N/A'}</p>
                <video controls className="w-full rounded-lg">
                  <source src={item.video_file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-brandRed text-3xl font-bold mb-4">Study Materials</h2>
        {studyMaterials.length === 0 ? (
          <p className="text-gray-600">No study materials available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyMaterials.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-brandRed font-bold mb-2">{item.title}</h3>
                <p className="mb-2">Uploaded on {new Date(item.uploaded_at).toLocaleDateString()}</p>
                <p className="mb-2">Skill: {item.skill || 'N/A'}</p>
                <a
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
                >
                  View/Download
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mb-12 bg-brandRed text-white p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Mock Assignments</h2>
        {mockAssignments.length === 0 ? (
          <p>No mock assignments available.</p>
        ) : (
          <ul className="space-y-4">
            {mockAssignments.map((item) => (
              <li key={item.id} className="bg-white text-brandRed p-4 rounded-lg shadow-lg">
                {item.title} ({item.skill}) - Created on {new Date(item.created_at).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-brandRed text-3xl font-bold mb-4">Submit Assignment</h2>
        {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <div className="mb-4">
            <label htmlFor="mockAssignment" className="block text-brandRed font-bold mb-2">
              Mock Assignment
            </label>
            <select
              id="mockAssignment"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
              value={submission.mock_assignment}
              onChange={(e) => setSubmission({ ...submission, mock_assignment: e.target.value })}
              required
            >
              <option value="">Select an assignment</option>
              {mockAssignments.map((item) => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="submissionText" className="block text-brandRed font-bold mb-2">
              Submission Text
            </label>
            <textarea
              id="submissionText"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
              value={submission.submission_text}
              onChange={(e) => setSubmission({ ...submission, submission_text: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="submissionFile" className="block text-brandRed font-bold mb-2">
              Submission File (Optional)
            </label>
            <input
              type="file"
              id="submissionFile"
              key={`submission-${fileInputKey}`}
              className="w-full p-3 border border-gray-300 rounded-lg"
              onChange={handleFileChange}
            />
          </div>
          <button
            onClick={handleSubmissionSubmit}
            className="w-full bg-brandRed text-white font-bold py-3 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-brandRed text-3xl font-bold mb-4">My Submissions</h2>
        {submissions.length === 0 ? (
          <p className="text-gray-600">No submissions available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((sub) => (
              <div key={sub.id} className="bg-white p-4 rounded-lg shadow-lg">
                <p className="text-brandRed font-bold">
                  Assignment ID: {sub.mock_assignment}
                </p>
                <p>Submitted on: {new Date(sub.submitted_at).toLocaleDateString()}</p>
                <p>AI Score: {sub.ai_score || 'Not evaluated'}</p>
                <p>AI Feedback: {sub.ai_feedback || 'N/A'}</p>
                <p>Teacher Score: {sub.teacher_score || 'N/A'}</p>
                {sub.submission_file && (
                  <a
                    href={sub.submission_file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 mt-2 inline-block"
                  >
                    View File
                  </a>
                )}
                {!sub.ai_score && (
                  <button
                    onClick={() => handleEvaluateSubmission(sub.id)}
                    className="mt-2 bg-brandRed text-white px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
                  >
                    Evaluate Submission
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default StudentDashboard;
// 5.  Dont knwo
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import TextContainer from "../../components/TextContainer";

// function StudentDashboard() {
//   const [recordedClasses, setRecordedClasses] = useState([]);
//   const [studyMaterials, setStudyMaterials] = useState([]);
//   const [mockAssignments, setMockAssignments] = useState([]);
//   const [submissions, setSubmissions] = useState([]);
//   const [submission, setSubmission] = useState({ mock_assignment: "", submission_text: "", submission_file: null });
//   const [courses, setCourses] = useState([]);
//   const [uploadError, setUploadError] = useState("");
//   const [fileInputKey, setFileInputKey] = useState(Date.now());
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.log("No token found, redirecting to /login");
//       window.location.replace('/login');
//       return;
//     }

//     const config = { headers: { Authorization: `Token ${token}` } };
//     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//     const fetchData = async () => {
//       try {
//         const [recordedClassesResponse, studyMaterialsResponse, mockAssignmentsResponse, coursesResponse, submissionsResponse] = await Promise.all([
//           axios.get(`${API_BASE_URL}/api/recorded-classes/`, config),
//           axios.get(`${API_BASE_URL}/api/study-materials/`, config),
//           axios.get(`${API_BASE_URL}/api/student-mock-assignments/`, config),
//           axios.get(`${API_BASE_URL}/api/student-courses/`, config),
//           axios.get(`${API_BASE_URL}/api/submissions/`, config),
//         ]);
//         console.log("Courses response:", coursesResponse.data);
//         setRecordedClasses(Array.isArray(recordedClassesResponse.data) ? recordedClassesResponse.data : []);
//         setStudyMaterials(Array.isArray(studyMaterialsResponse.data) ? studyMaterialsResponse.data : []);
//         setMockAssignments(Array.isArray(mockAssignmentsResponse.data) ? mockAssignmentsResponse.data : []);
//         setCourses(Array.isArray(coursesResponse.data) ? coursesResponse.data : []);
//         setSubmissions(Array.isArray(submissionsResponse.data) ? submissionsResponse.data : []);
//         setLoading(false);
//       } catch (err) {
//         console.log("Error fetching data:", err.response?.data);
//         setError('Failed to load data');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSubmission((prev) => ({ ...prev, submission_file: file }));
//   };

//   const handleSubmissionSubmit = async (e) => {
//     e.preventDefault();
//     setUploadError("");

//     if (!submission.mock_assignment) {
//       setUploadError("Please select a mock assignment.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("mock_assignment", submission.mock_assignment);
//     formData.append("submission_text", submission.submission_text);
//     if (submission.submission_file) {
//       formData.append("submission_file", submission.submission_file);
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//       const response = await axios.post(`${API_BASE_URL}/api/submissions/`, formData, {
//         headers: {
//           Authorization: `Token ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setSubmissions([...submissions, response.data]);
//       setSubmission({ mock_assignment: "", submission_text: "", submission_file: null });
//       setFileInputKey(Date.now());
//       alert("Submission successful!");
//     } catch (error) {
//       setUploadError(error.response?.data?.detail || "Error submitting assignment.");
//     }
//   };

//   const handleEvaluateSubmission = async (submissionId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//       const response = await axios.post(
//         `${API_BASE_URL}/api/evaluate-submission/`,
//         { submission_id: submissionId, evaluate_by_teacher: false },
//         { headers: { Authorization: `Token ${token}` } }
//       );
//       const updatedSubmission = submissions.map((sub) =>
//         sub.id === submissionId ? { ...sub, ai_score: response.data.ai_score, ai_feedback: response.data.ai_feedback } : sub
//       );
//       setSubmissions(updatedSubmission);
//       alert("Evaluation completed! Check the updated scores.");
//     } catch (error) {
//       alert("Error evaluating submission: " + (error.response?.data?.error || "Unknown error"));
//     }
//   };

//   if (loading) return <div className="text-center mt-10 text-brandRed">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

//   return (
//     <div className="bg-brandCream min-h-screen p-6">
//       <h1 className="text-brandRed text-5xl font-extrabold mb-6 text-center">
//         Student Dashboard
//       </h1>
//       <TextContainer
//         type="cream"
//         text="Welcome to your dashboard! Access your enrolled courses, watch recorded classes, download study materials, and submit assignments to track your progress."
//         styleClass="mb-8 max-w-2xl mx-auto text-center"
//       />

//       <section className="mb-12">
//         <h2 className="text-brandRed text-3xl font-bold mb-4">Skill Navigation</h2>
//         <div className="flex flex-wrap gap-4">
//           {['speaking', 'listening', 'reading', 'writing'].map((skill) => (
//             <Link
//               key={skill}
//               to={`/skill-content/${skill}`}
//               className="bg-brandRed text-white px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 capitalize"
//             >
//               {skill}
//             </Link>
//           ))}
//         </div>
//       </section>

//       <section className="mb-12">
//         <h2 className="text-brandRed text-3xl font-bold mb-4">My Courses</h2>
//         {courses.length === 0 ? (
//           <p className="text-gray-600">No courses enrolled.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {courses.map((course) => (
//               <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg">
//                 <p className="text-brandRed font-bold">
//                   {course.course.title} - Enrolled on {new Date(course.enrolled_at).toLocaleDateString()}
//                 </p>
//                 <Link
//                   to={`/course-roadmap/${course.course.id}`}
//                   className="mt-2 inline-block bg-brandRed text-white px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
//                 >
//                   View Roadmap
//                 </Link>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       <section className="mb-12 bg-brandRed text-white p-6 rounded-lg">
//         <h2 className="text-3xl font-bold mb-4">Recorded Classes</h2>
//         {recordedClasses.length === 0 ? (
//           <p>No recorded classes available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {recordedClasses.map((item) => (
//               <div key={item.id} className="bg-white text-brandRed p-4 rounded-lg shadow-lg">
//                 <h3 className="font-bold mb-2">{item.title}</h3>
//                 <p className="mb-2">Uploaded on {new Date(item.uploaded_at).toLocaleDateString()}</p>
//                 <p className="mb-2">Skill: {item.skill || 'N/A'}</p>
//                 <video controls className="w-full rounded-lg">
//                   <source src={item.video_file} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       <section className="mb-12">
//         <h2 className="text-brandRed text-3xl font-bold mb-4">Study Materials</h2>
//         {studyMaterials.length === 0 ? (
//           <p className="text-gray-600">No study materials available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {studyMaterials.map((item) => (
//               <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg">
//                 <h3 className="text-brandRed font-bold mb-2">{item.title}</h3>
//                 <p className="mb-2">Uploaded on {new Date(item.uploaded_at).toLocaleDateString()}</p>
//                 <p className="mb-2">Skill: {item.skill || 'N/A'}</p>
//                 <a
//                   href={item.file}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
//                 >
//                   View/Download
//                 </a>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       <section className="mb-12 bg-brandRed text-white p-6 rounded-lg">
//         <h2 className="text-3xl font-bold mb-4">Mock Assignments</h2>
//         {mockAssignments.length === 0 ? (
//           <p>No mock assignments available.</p>
//         ) : (
//           <ul className="space-y-4">
//             {mockAssignments.map((item) => (
//               <li key={item.id} className="bg-white text-brandRed p-4 rounded-lg shadow-lg">
//                 {item.title} ({item.skill}) - Created on {new Date(item.created_at).toLocaleDateString()}
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       <section className="mb-12">
//         <h2 className="text-brandRed text-3xl font-bold mb-4">Submit Assignment</h2>
//         {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
//           <div className="mb-4">
//             <label htmlFor="mockAssignment" className="block text-brandRed font-bold mb-2">
//               Mock Assignment
//             </label>
//             <select
//               id="mockAssignment"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
//               value={submission.mock_assignment}
//               onChange={(e) => setSubmission({ ...submission, mock_assignment: e.target.value })}
//               required
//             >
//               <option value="">Select an assignment</option>
//               {mockAssignments.map((item) => (
//                 <option key={item.id} value={item.id}>{item.title}</option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-4">
//             <label htmlFor="submissionText" className="block text-brandRed font-bold mb-2">
//               Submission Text
//             </label>
//             <textarea
//               id="submissionText"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
//               value={submission.submission_text}
//               onChange={(e) => setSubmission({ ...submission, submission_text: e.target.value })}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="submissionFile" className="block text-brandRed font-bold mb-2">
//               Submission File (Optional)
//             </label>
//             <input
//               type="file"
//               id="submissionFile"
//               key={`submission-${fileInputKey}`}
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               onChange={handleFileChange}
//             />
//           </div>
//           <button
//             onClick={handleSubmissionSubmit}
//             className="w-full bg-brandRed text-white font-bold py-3 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 ease-in-out"
//           >
//             Submit
//           </button>
//         </div>
//       </section>

//       <section className="mb-12">
//         <h2 className="text-brandRed text-3xl font-bold mb-4">My Submissions</h2>
//         {submissions.length === 0 ? (
//           <p className="text-gray-600">No submissions available.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {submissions.map((sub) => (
//               <div key={sub.id} className="bg-white p-4 rounded-lg shadow-lg">
//                 <p className="text-brandRed font-bold">
//                   Assignment ID: {sub.mock_assignment}
//                 </p>
//                 <p>Submitted on: {new Date(sub.submitted_at).toLocaleDateString()}</p>
//                 <p>AI Score: {sub.ai_score || 'Not evaluated'}</p>
//                 <p>AI Feedback: {sub.ai_feedback || 'N/A'}</p>
//                 <p>Teacher Score: {sub.teacher_score || 'N/A'}</p>
//                 {sub.submission_file && (
//                   <a
//                     href={sub.submission_file}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 mt-2 inline-block"
//                   >
//                     View File
//                   </a>
//                 )}
//                 {!sub.ai_score && (
//                   <button
//                     onClick={() => handleEvaluateSubmission(sub.id)}
//                     className="mt-2 bg-brandRed text-white px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
//                   >
//                     Evaluate Submission
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// export default StudentDashboard;