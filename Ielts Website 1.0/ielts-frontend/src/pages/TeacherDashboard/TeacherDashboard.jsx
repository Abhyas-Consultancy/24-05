  import { useState, useEffect } from "react";
  import axios from "axios";
  import TextContainer from "../../components/TextContainer";

  function TeacherDashboard() {
    const [recordedClasses, setRecordedClasses] = useState([]);
    const [studyMaterials, setStudyMaterials] = useState([]);
    const [mockAssignments, setMockAssignments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [uploadData, setUploadData] = useState({
      title: "",
      description: "",
      video_file: null,
      file: null,
      skill: "",
      course: "",
    });
    const [courseBundle, setCourseBundle] = useState({
      title: "",
      description: "",
      recorded_classes: [],
      study_materials: [],
      mock_assignments: [],
    });
    const [uploadError, setUploadError] = useState("");
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const config = { headers: { Authorization: `Token ${token}` } };

      axios
        .get("http://127.0.0.1:8000/api/recorded-classes/", config)
        .then((response) => setRecordedClasses(response.data))
        .catch((error) => console.error("Error fetching recorded classes:", error));

      axios
        .get("http://127.0.0.1:8000/api/study-materials/", config)
        .then((response) => setStudyMaterials(response.data))
        .catch((error) => console.error("Error fetching study materials:", error));

      axios
        .get("http://127.0.0.1:8000/api/mock-assignments/", config)
        .then((response) => setMockAssignments(response.data))
        .catch((error) => console.error("Error fetching mock assignments:", error));

      axios
        .get("http://127.0.0.1:8000/api/courses/", config)
        .then((response) => setCourses(response.data))
        .catch((error) => console.error("Error fetching courses:", error));
    }, []);

    const handleFileChange = (e, type) => {
      const file = e.target.files[0];
      setUploadData((prev) => ({ ...prev, [type]: file }));
    };

    const handleUploadSubmit = async (e, endpoint) => {
      e.preventDefault();
      setUploadError("");

      const formData = new FormData();
      formData.append("title", uploadData.title);
      formData.append("description", uploadData.description);
      if (uploadData.course) formData.append("course", uploadData.course);
      if (endpoint === "recorded-classes" && uploadData.video_file) {
        formData.append("video_file", uploadData.video_file);
      } else if (endpoint === "study-materials" && uploadData.file) {
        formData.append("file", uploadData.file);
      } else if (endpoint === "mock-assignments" && uploadData.skill) {
        formData.append("skill", uploadData.skill);
      } else {
        setUploadError("Please provide all required fields.");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        await axios.post(`http://127.0.0.1:8000/api/${endpoint}/`, formData, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setUploadData({ title: "", description: "", video_file: null, file: null, skill: "", course: "" });
        setFileInputKey(Date.now());
        alert("Upload successful!");
        const response = await axios.get(`http://127.0.0.1:8000/api/${endpoint}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        if (endpoint === "recorded-classes") setRecordedClasses(response.data);
        else if (endpoint === "study-materials") setStudyMaterials(response.data);
        else if (endpoint === "mock-assignments") setMockAssignments(response.data);
      } catch (error) {
        setUploadError(error.response?.data?.detail || "Upload failed.");
      }
    };

    const handleCourseBundleSubmit = async (e) => {
      e.preventDefault();
      setUploadError("");

      try {
        const token = localStorage.getItem("token");
        await axios.post("http://127.0.0.1:8000/api/create-course-bundle/", courseBundle, {
          headers: { Authorization: `Token ${token}` },
        });
        setCourseBundle({
          title: "",
          description: "",
          recorded_classes: [],
          study_materials: [],
          mock_assignments: [],
        });
        alert("Course bundle created successfully!");
        const response = await axios.get("http://127.0.0.1:8000/api/courses/", {
          headers: { Authorization: `Token ${token}` },
        });
        setCourses(response.data);
      } catch (error) {
        setUploadError(error.response?.data?.error || "Course bundle creation failed.");
      }
    };

    return (
      <div className="bg-brandCream min-h-screen p-6">
        <h1 className="text-brandRed text-5xl font-extrabold mb-6 text-center">
          Teacher Dashboard
        </h1>
        <TextContainer
          type="cream"
          text="Manage your IELTS courses, upload recorded classes and study materials, create mock assignments, and bundle them into courses for your students."
          styleClass="mb-8 max-w-2xl mx-auto text-center"
        />

        {/* Upload Recorded Class Section */}
        <section className="mb-12">
          <h2 className="text-brandRed text-3xl font-bold mb-4">Upload Recorded Class</h2>
          {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <div className="mb-4">
              <label htmlFor="title" className="block text-brandRed font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={uploadData.title}
                onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-brandRed font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={uploadData.description}
                onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="course" className="block text-brandRed font-bold mb-2">
                Course (Optional)
              </label>
              <select
                id="course"
                value={uploadData.course}
                onChange={(e) => setUploadData({ ...uploadData, course: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="video_file" className="block text-brandRed font-bold mb-2">
                Video File
              </label>
              <input
                type="file"
                id="video_file"
                key={`video-${fileInputKey}`}
                accept="video/*"
                onChange={(e) => handleFileChange(e, "video_file")}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <button
              onClick={(e) => handleUploadSubmit(e, "recorded-classes")}
              className="w-full bg-brandRed text-white font-bold py-3 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 ease-in-out"
            >
              Upload
            </button>
          </div>
        </section>

        {/* Upload Study Material Section */}
        <section className="mb-12 bg-brandRed text-white p-6 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Upload Study Material</h2>
          {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}
          <div className="bg-white text-brandRed rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <div className="mb-4">
              <label htmlFor="title" className="block font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={uploadData.title}
                onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={uploadData.description}
                onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="course" className="block font-bold mb-2">
                Course (Optional)
              </label>
              <select
                id="course"
                value={uploadData.course}
                onChange={(e) => setUploadData({ ...uploadData, course: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block font-bold mb-2">
                File
              </label>
              <input
                type="file"
                id="file"
                key={`file-${fileInputKey}`}
                onChange={(e) => handleFileChange(e, "file")}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <button
              onClick={(e) => handleUploadSubmit(e, "study-materials")}
              className="w-full bg-brandRed text-white font-bold py-3 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 ease-in-out"
            >
              Upload
            </button>
          </div>
        </section>

        {/* Create Mock Assignment Section */}
        <section className="mb-12">
          <h2 className="text-brandRed text-3xl font-bold mb-4">Create Mock Assignment</h2>
          {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <div className="mb-4">
              <label htmlFor="title" className="block text-brandRed font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={uploadData.title}
                onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-brandRed font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={uploadData.description}
                onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="skill" className="block text-brandRed font-bold mb-2">
                Skill
              </label>
              <select
                id="skill"
                value={uploadData.skill}
                onChange={(e) => setUploadData({ ...uploadData, skill: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
                required
              >
                <option value="">Select a skill</option>
                <option value="Listening">Listening</option>
                <option value="Reading">Reading</option>
                <option value="Speaking">Speaking</option>
                <option value="Writing">Writing</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="course" className="block text-brandRed font-bold mb-2">
                Course (Optional)
              </label>
              <select
                id="course"
                value={uploadData.course}
                onChange={(e) => setUploadData({ ...uploadData, course: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
            <button
              onClick={(e) => handleUploadSubmit(e, "mock-assignments")}
              className="w-full bg-brandRed text-white font-bold py-3 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 ease-in-out"
            >
              Create
            </button>
          </div>
        </section>

        {/* Create Course Bundle Section */}
        <section className="mb-12 bg-brandRed text-white p-6 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Create Course Bundle</h2>
          {uploadError && <p className="text-red-500 mb-4">{uploadError}</p>}
          <div className="bg-white text-brandRed rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <div className="mb-4">
              <label htmlFor="bundleTitle" className="block font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="bundleTitle"
                value={courseBundle.title}
                onChange={(e) => setCourseBundle({ ...courseBundle, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bundleDescription" className="block font-bold mb-2">
                Description
              </label>
              <textarea
                id="bundleDescription"
                value={courseBundle.description}
                onChange={(e) => setCourseBundle({ ...courseBundle, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="recordedClasses" className="block font-bold mb-2">
                Recorded Classes (Optional)
              </label>
              <select
                multiple
                id="recordedClasses"
                value={courseBundle.recorded_classes}
                onChange={(e) =>
                  setCourseBundle({
                    ...courseBundle,
                    recorded_classes: Array.from(e.target.selectedOptions, (option) => option.value),
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
              >
                {recordedClasses.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="studyMaterials" className="block font-bold mb-2">
                Study Materials (Optional)
              </label>
              <select
                multiple
                id="studyMaterials"
                value={courseBundle.study_materials}
                onChange={(e) =>
                  setCourseBundle({
                    ...courseBundle,
                    study_materials: Array.from(e.target.selectedOptions, (option) => option.value),
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
              >
                {studyMaterials.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="mockAssignments" className="block font-bold mb-2">
                Mock Assignments (Optional)
              </label>
              <select
                multiple
                id="mockAssignments"
                value={courseBundle.mock_assignments}
                onChange={(e) =>
                  setCourseBundle({
                    ...courseBundle,
                    mock_assignments: Array.from(e.target.selectedOptions, (option) => option.value),
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
              >
                {mockAssignments.map((item) => (
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleCourseBundleSubmit}
              className="w-full bg-brandRed text-white font-bold py-3 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 ease-in-out"
            >
              Create Bundle
            </button>
          </div>
        </section>
      </div>
    );
  }

  export default TeacherDashboard;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TextContainer from "../../components/TextContainer";

// const TeacherDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [bundles, setBundles] = useState([]);
//   const [newBundle, setNewBundle] = useState({
//     order: '',
//     content_type: '',
//     content_id: '',
//     description: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       window.location.href = "/login";
//       return;
//     }

//     const config = { headers: { Authorization: `Token ${token}` } };
//     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/courses/`, config);
//         setCourses(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load courses');
//         setLoading(false);
//       }
//     };
//     fetchCourses();
//   }, []);

//   const fetchBundles = async (courseId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//       const response = await axios.get(`${API_BASE_URL}/api/course-bundles/${courseId}/`, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setBundles(response.data);
//     } catch (err) {
//       setError('Failed to load bundles');
//     }
//   };

//   const handleCourseSelect = (course) => {
//     setSelectedCourse(course);
//     fetchBundles(course.id);
//   };

//   const handleAddBundle = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//       await axios.post(
//         `${API_BASE_URL}/api/course-bundles/${selectedCourse.id}/`,
//         newBundle,
//         { headers: { Authorization: `Token ${token}` } }
//       );
//       fetchBundles(selectedCourse.id);
//       setNewBundle({ order: '', content_type: '', content_id: '', description: '' });
//     } catch (err) {
//       setError('Failed to add bundle');
//     }
//   };

//   const handleUpdateBundle = async (bundleId, updatedData) => {
//     try {
//       const token = localStorage.getItem('token');
//       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//       await axios.put(
//         `${API_BASE_URL}/api/course-bundle/${bundleId}/`,
//         updatedData,
//         { headers: { Authorization: `Token ${token}` } }
//       );
//       fetchBundles(selectedCourse.id);
//     } catch (err) {
//       setError('Failed to update bundle');
//     }
//   };

//   const handleDeleteBundle = async (bundleId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//       await axios.delete(`${API_BASE_URL}/api/course-bundle/${bundleId}/`, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       fetchBundles(selectedCourse.id);
//     } catch (err) {
//       setError('Failed to delete bundle');
//     }
//   };

//   if (loading) return <div className="text-center mt-10 text-brandRed">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

//   return (
//     <div className="bg-brandCream min-h-screen p-6">
//       <h2 className="text-brandRed text-3xl font-bold mb-6 text-center">Teacher Dashboard</h2>
//       <TextContainer
//         type="cream"
//         text="Manage your courses and create structured learning paths for your students."
//         styleClass="mb-8 max-w-2xl mx-auto text-center"
//       />
//       <div className="mb-6">
//         <h3 className="text-brandRed text-xl font-semibold mb-4">Select a Course</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map((course) => (
//             <button
//               key={course.id}
//               onClick={() => handleCourseSelect(course)}
//               className={`p-4 rounded-lg shadow-lg ${
//                 selectedCourse?.id === course.id ? 'bg-brandRed text-white' : 'bg-white text-brandRed'
//               } hover:bg-brandRed hover:text-white transition duration-150`}
//             >
//               <h4 className="text-lg font-semibold">{course.title}</h4>
//               <p>{course.description}</p>
//             </button>
//           ))}
//         </div>
//       </div>

//       {selectedCourse && (
//         <>
//           <div className="mb-6">
//             <h3 className="text-brandRed text-xl font-semibold mb-4">Add New Bundle to {selectedCourse.title}</h3>
//             <div className="bg-white p-4 rounded-lg shadow-lg">
//               <div className="mb-4">
//                 <label className="block text-brandRed font-bold mb-2">Order</label>
//                 <input
//                   type="number"
//                   value={newBundle.order}
//                   onChange={(e) => setNewBundle({ ...newBundle, order: e.target.value })}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-brandRed font-bold mb-2">Content Type</label>
//                 <select
//                   value={newBundle.content_type}
//                   onChange={(e) => setNewBundle({ ...newBundle, content_type: e.target.value })}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
//                   required
//                 >
//                   <option value="">Select Type</option>
//                   <option value="video">Video</option>
//                   <option value="study_material">Study Material</option>
//                   <option value="assignment">Assignment</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <label className="block text-brandRed font-bold mb-2">Content ID</label>
//                 <input
//                   type="number"
//                   value={newBundle.content_id}
//                   onChange={(e) => setNewBundle({ ...newBundle, content_id: e.target.value })}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-brandRed font-bold mb-2">Description</label>
//                 <textarea
//                   value={newBundle.description}
//                   onChange={(e) => setNewBundle({ ...newBundle, description: e.target.value })}
//                   className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandRed"
//                 />
//               </div>
//               <button
//                 onClick={handleAddBundle}
//                 className="w-full bg-brandRed text-white font-bold py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
//               >
//                 Add Bundle
//               </button>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-brandRed text-xl font-semibold mb-4">Course Bundles</h3>
//             {bundles.length === 0 ? (
//               <p className="text-gray-600">No bundles found for this course.</p>
//             ) : (
//               <div className="space-y-6">
//                 {bundles.map((bundle) => (
//                   <div key={bundle.id} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-start">
//                     <div>
//                       <h4 className="text-brandRed text-lg font-semibold">Step {bundle.order}: {bundle.content_type.charAt(0).toUpperCase() + bundle.content_type.slice(1)}</h4>
//                       <p className="text-gray-600">{bundle.description}</p>
//                       {bundle.content ? (
//                         <>
//                           <h5 className="text-md font-medium mt-2">{bundle.content.title}</h5>
//                           {bundle.content_type === 'video' && (
//                             <>
//                               <p className="text-gray-500">Skill: {bundle.content.skill || 'N/A'}</p>
//                               <p className="text-gray-500">Video URL: {bundle.content.video_file}</p>
//                             </>
//                           )}
//                           {bundle.content_type === 'study_material' && (
//                             <>
//                               <p className="text-gray-500">Skill: {bundle.content.skill || 'N/A'}</p>
//                               <p className="text-gray-500">File URL: {bundle.content.file}</p>
//                             </>
//                           )}
//                           {bundle.content_type === 'assignment' && (
//                             <p className="text-gray-500">Skill: {bundle.content.skill}</p>
//                           )}
//                         </>
//                       ) : (
//                         <p className="text-gray-500">Content not available.</p>
//                       )}
//                     </div>
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleUpdateBundle(bundle.id, { description: prompt('Enter new description:', bundle.description) })}
//                         className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-150"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteBundle(bundle.id)}
//                         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-150"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default TeacherDashboard;