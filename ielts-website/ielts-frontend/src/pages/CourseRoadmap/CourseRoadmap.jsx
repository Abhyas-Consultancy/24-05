// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const CourseRoadmap = () => {
//   const { courseId } = useParams();
//   const [bundles, setBundles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const fetchRoadmap = async () => {
//   //     try {
//   //       const token = localStorage.getItem('token');
//   //       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   //       const response = await axios.get(`${API_BASE_URL}/api/course-roadmap/${courseId}/`, {
//   //         headers: { Authorization: `Token ${token}` },
//   //       });
//   //       setBundles(response.data);
//   //     } catch (err) {
//   //       setError('Failed to load roadmap');
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchRoadmap();
//   // }, [courseId]);

//   useEffect(() => {
//     const fetchRoadmap = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//         const response = await axios.get(`${API_BASE_URL}/api/course-roadmap/${courseId}/`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         console.log('Roadmap Response:', response.data); // ✅ safe here
//         setBundles(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Fetch roadmap error:', err);
//         setError('Failed to load roadmap');
//         setLoading(false);
//       }
//     };
//     fetchRoadmap();
//   }, [courseId]);

//   if (loading) return <div className="text-center mt-10 text-brandRed">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

//   return (
//     <div className="bg-brandCream min-h-screen p-6">
//       <button
//         onClick={() => navigate('/student-dashboard')}
//         className="mb-4 bg-brandRed text-white px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
//       >
//         Back to Dashboard
//       </button>
//       <h2 className="text-brandRed text-3xl font-bold mb-6">Course Roadmap</h2>

//       {bundles.length === 0 ? (
//         <p className="text-gray-600">No roadmap items found for this course.</p>
//       ) : (
//         <div className="space-y-6">
//           {bundles.map((bundle) => {
//             const titleCaseType = bundle.content_type
//               ? bundle.content_type.charAt(0).toUpperCase() + bundle.content_type.slice(1)
//               : 'Unknown';

//             return (
//               <div key={bundle.id} className="bg-white p-4 rounded-lg shadow-lg">
//                 <h3 className="text-brandRed text-lg font-semibold">
//                   Step {bundle.order}: {titleCaseType}
//                 </h3>

//                 {bundle.content ? (
//                   <>
//                     <p className="text-gray-600">{bundle.description}</p>
//                     <h4 className="text-md font-medium mt-2">{bundle.content.title}</h4>

//                     {bundle.content_type === 'video' && (
//                       <>
//                         <p className="text-gray-500">Skill: {bundle.content.skill || 'N/A'}</p>
//                         <video controls className="w-full mt-2 rounded-lg">
//                           <source src={bundle.content.video_file} type="video/mp4" />
//                           Your browser does not support the video tag.
//                         </video>
//                       </>
//                     )}

//                     {bundle.content_type === 'study_material' && (
//                       <>
//                         <p className="text-gray-500">Skill: {bundle.content.skill || 'N/A'}</p>
//                         <a
//                           href={bundle.content.file}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 mt-2 inline-block"
//                         >
//                           View/Download
//                         </a>
//                       </>
//                     )}

//                     {bundle.content_type === 'assignment' && (
//                       <p className="text-gray-500">Skill: {bundle.content.skill || 'N/A'}</p>
//                     )}
//                   </>
//                 ) : (
//                   <p className="text-gray-500">Content not available.</p>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseRoadmap;
// 
// 2sewncond
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const CourseRoadmap = () => {
//   const { courseId } = useParams();
//   const [modules, setModules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRoadmap = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//         const response = await axios.get(`${API_BASE_URL}/api/course-roadmap/${courseId}/`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         console.log("Roadmap Response:", response.data);
//         setModules(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching roadmap:', err);
//         setError('Failed to load roadmap');
//         setLoading(false);
//       }
//     };
//     fetchRoadmap();
//   }, [courseId]);

//   if (loading) return <div className="text-center mt-10 text-brandRed">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

//   return (
//     <div className="bg-brandCream min-h-screen p-6">
//       <button
//         onClick={() => navigate('/student-dashboard')}
//         className="mb-4 bg-brandRed text-white px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
//       >
//         Back to Dashboard
//       </button>
//       <h2 className="text-brandRed text-3xl font-bold mb-6">Course Roadmap</h2>

//       {modules.length === 0 ? (
//         <p className="text-gray-600">No roadmap items found for this course.</p>
//       ) : (
//         modules.map((module, moduleIndex) => (
//           <div key={module.id} className="mb-8">
//             <h3 className="text-xl font-semibold text-brandRed mb-4">Module {moduleIndex + 1}: {module.title}</h3>
//             {module.bundles.length === 0 ? (
//               <p className="text-gray-600 ml-4">No content available in this module.</p>
//             ) : (
//               module.bundles.map((bundle, index) => (
//                 <div key={bundle.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
//                   <h4 className="text-brandRed font-semibold">
//                     Step {index + 1}: {bundle.content_type.charAt(0).toUpperCase() + bundle.content_type.slice(1)}
//                   </h4>

//                   {bundle.content_title ? (
//                     <>
//                       <p className="text-gray-600 mt-1">{bundle.description}</p>
//                       <p className="text-gray-800 font-medium mt-1">{bundle.content_title.title}</p>

//                       {bundle.content_type === 'video' && (
//                         <>
//                           <p className="text-gray-500">Skill: {bundle.content_title.skill || 'N/A'}</p>
//                           <video controls className="w-full mt-2 rounded-lg">
//                             <source
//                               src={`${import.meta.env.VITE_API_BASE_URL}${bundle.content_title.video_file}`}
//                               type="video/mp4"
//                             />
//                             Your browser does not support the video tag.
//                           </video>
//                         </>
//                       )}

//                       {bundle.content_type === 'study_material' && (
//                         <>
//                           <p className="text-gray-500">Skill: {bundle.content_title.skill || 'N/A'}</p>
//                           <a
//                             href={`${import.meta.env.VITE_API_BASE_URL}${bundle.content_title.file}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 mt-2 inline-block"
//                           >
//                             View/Download Material
//                           </a>
//                         </>
//                       )}

//                       {bundle.content_type === 'assignment' && (
//                         <p className="text-gray-500">Skill: {bundle.content_title.skill || 'N/A'}</p>
//                       )}
//                     </>
//                   ) : (
//                     <p className="text-gray-500">Content not available.</p>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default CourseRoadmap;


// 3third

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CourseRoadmap = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [modules, setModules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const token = localStorage.getItem('token');
//   const config = { headers: { Authorization: `Token ${token}` } };

//   useEffect(() => {
//     const fetchRoadmap = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/course-roadmap/${courseId}/`, config);
//         console.log('Roadmap Response:', JSON.stringify(response.data, null, 2));
//         setModules(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching roadmap:', err);
//         setError('Failed to load roadmap');
//         setLoading(false);
//         toast.error('Failed to load course roadmap');
//       }
//     };
//     fetchRoadmap();
//   }, [courseId]);

//   if (loading) return <div className="text-center mt-10 text-brandRed">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

//   return (
//     <div className="bg-brandCream min-h-screen p-6">
//       <ToastContainer />
//       <button
//         onClick={() => navigate('/student-dashboard')}
//         className="mb-4 bg-brandRed text-white px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
//       >
//         Back to Dashboard
//       </button>
//       <h2 className="text-brandRed text-3xl font-bold mb-6">Course Roadmap</h2>

//       {modules.length === 0 ? (
//         <p className="text-gray-600">No roadmap items found for this course.</p>
//       ) : (
//         modules.map((module, moduleIndex) => (
//           <div key={module.id} className="mb-8">
//             <h3 className="text-xl font-semibold text-brandRed mb-4">
//               Module {moduleIndex + 1}: {module.title}
//             </h3>
//             {module.bundles.length === 0 ? (
//               <p className="text-gray-600 ml-4">No content available in this module.</p>
//             ) : (
//               module.bundles.map((bundle, index) => (
//                 <div key={bundle.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
//                   <h4 className="text-brandRed font-semibold">
//                     Step {index + 1}: {bundle.content_type.charAt(0).toUpperCase() + bundle.content_type.slice(1)}
//                   </h4>

//                   {bundle.content_title ? (
//                     <>
//                       <p className="text-gray-600 mt-1">{bundle.description}</p>
//                       <p className="text-gray-800 font-medium mt-1">{bundle.content_title.title}</p>

//                       {bundle.content_type === 'video' && (
//                         <>
//                           <p className="text-gray-500">Skill: {bundle.content_title.skill || 'N/A'}</p>
//                           <video controls className="w-full mt-2 rounded-lg">
//                             <source
//                               src={`${API_BASE_URL}${bundle.content_title.video_file}`}
//                               type="video/mp4"
//                             />
//                             Your browser does not support the video tag.
//                           </video>
//                         </>
//                       )}

//                       {bundle.content_type === 'study_material' && (
//                         <>
//                           <p className="text-gray-500">Skill: {bundle.content_title.skill || 'N/A'}</p>
//                           <a
//                             href={`${API_BASE_URL}${bundle.content_title.file}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 mt-2 inline-block"
//                           >
//                             View/Download Material
//                           </a>
//                         </>
//                       )}

//                       {bundle.content_type === 'assignment' && (
//                         <>
//                           <p className="text-gray-500">Skill: {bundle.content_title.skill || 'N/A'}</p>
//                           <button
//                             onClick={() => navigate(`/assignment/${bundle.content_id}`)}
//                             className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 mt-2"
//                           >
//                             View Assignment
//                           </button>
//                         </>
//                       )}
//                     </>
//                   ) : (
//                     <p className="text-gray-500">Content not available.</p>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default CourseRoadmap;


// fourth

// src/pages/CourseRoadmap.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const CourseRoadmap = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [modules, setModules] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const token = localStorage.getItem('token');
//   const config = { headers: { Authorization: `Token ${token}` } };

//   useEffect(() => {
//     const fetchRoadmap = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/course-roadmap/${courseId}/`, config);
//         console.log('Roadmap Response:', JSON.stringify(response.data, null, 2));
//         setModules(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching roadmap:', err);
//         setError('Failed to load roadmap');
//         setLoading(false);
//         toast.error('Failed to load course roadmap');
//       }
//     };
//     fetchRoadmap();
//   }, [courseId]);

//   if (loading) return <div className="text-center mt-10 text-brandRed">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

//   return (
//     <div className="bg-brandCream min-h-screen p-6">
//       <ToastContainer />
//       <button
//         onClick={() => navigate('/student-dashboard')}
//         className="mb-4 bg-brandRed text-white px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
//       >
//         Back to Dashboard
//       </button>
//       <h2 className="text-brandRed text-3xl font-bold mb-6">Course Roadmap</h2>

//       {modules.length === 0 ? (
//         <p className="text-gray-600">No roadmap items found for this course.</p>
//       ) : (
//         modules.map((module, moduleIndex) => (
//           <div key={module.id} className="mb-8">
//             <h3 className="text-xl font-semibold text-brandRed mb-4">
//               Module {moduleIndex + 1}: {module.title}
//             </h3>
//             {module.bundles.length === 0 ? (
//               <p className="text-gray-600 ml-4">No content available in this module.</p>
//             ) : (
//               module.bundles.map((bundle, index) => (
//                 <div key={bundle.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
//                   <h4 className="text-brandRed font-semibold">
//                     Step {index + 1}: {bundle.content_type.charAt(0).toUpperCase() + bundle.content_type.slice(1)}
//                   </h4>

//                   {bundle.content_title ? (
//                     <>
//                       <p className="text-gray-600 mt-1">{bundle.description}</p>
//                       <p className="text-gray-800 font-medium mt-1">
//                         {typeof bundle.content_title === 'string' ? bundle.content_title : bundle.content_title.title}
//                       </p>

//                       {bundle.content_type === 'video' && typeof bundle.content_title === 'object' && bundle.content_title.video_file ? (
//                         <>
//                           <p className="text-gray-500">Skill: {bundle.content_title.skill || 'N/A'}</p>
//                           <video controls preload="metadata" className="w-full mt-2 rounded-lg">
//                             <source
//                               src={`${API_BASE_URL}${bundle.content_title.video_file}`}
//                               type="video/mp4"
//                             />
//                             Your browser does not support the video tag.
//                           </video>
//                         </>
//                       ) : bundle.content_type === 'video' ? (
//                         <p className="text-red-500">Video not available</p>
//                       ) : null}

//                       {bundle.content_type === 'study_material' && typeof bundle.content_title === 'object' && bundle.content_title.file ? (
//                         <>
//                           <p className="text-gray-500">Skill: {bundle.content_title.skill || 'N/A'}</p>
//                           <a
//                             href={`${API_BASE_URL}${bundle.content_title.file}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 mt-2 inline-block"
//                           >
//                             View/Download Material
//                           </a>
//                         </>
//                       ) : bundle.content_type === 'study_material' ? (
//                         <p className="text-red-500">Study material not available</p>
//                       ) : null}

//                       {bundle.content_type === 'assignment' && (
//                         <>
//                           <p className="text-gray-500">Skill: {typeof bundle.content_title === 'object' ? bundle.content_title.skill || 'N/A' : 'N/A'}</p>
//                           <button
//                             onClick={() => navigate(`/assignment/${bundle.content_id}`)}
//                             className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 mt-2"
//                           >
//                             View Assignment
//                           </button>
//                         </>
//                       )}
//                     </>
//                   ) : (
//                     <p className="text-gray-500">Content not available.</p>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default CourseRoadmap;

// 5 Fifth

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaFilePdf, FaVideo, FaTasks, FaArrowLeft } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const CourseRoadmap = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Token ${token}` } };

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/course-roadmap/${courseId}/`, config);
        setModules(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching roadmap:', err);
        setError('Failed to load roadmap');
        setLoading(false);
        toast.error('Failed to load course roadmap');
      }
    };
    fetchRoadmap();
  }, [courseId]);

  if (loading) return <div className="text-center text-brandRed mt-10 text-xl font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-8 md:px-16">
      <ToastContainer />
      <button
        onClick={() => navigate('/student-dashboard')}
        className="flex items-center text-brandRed hover:text-white bg-white border border-brandRed px-4 py-2 rounded-lg hover:bg-brandRed transition duration-150 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </button>

      <h2 className="text-3xl font-bold text-brandRed mb-8">📘 Course Roadmap</h2>

      {modules.length === 0 ? (
        <p className="text-gray-600">No roadmap items found for this course.</p>
      ) : (
        modules.map((module, moduleIndex) => (
          <div key={module.id} className="mb-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              📦 Module {moduleIndex + 1}: {module.title}
            </h3>

            {module.bundles.length === 0 ? (
              <p className="text-gray-600 ml-4">No content available in this module.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {module.bundles.map((bundle, index) => (
                  <div key={bundle.id} className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">
                    <div className="mb-2 flex items-center space-x-2 text-sm text-gray-500">
                      <span className="bg-brandRed text-white px-2 py-1 rounded-full font-medium">
                        Step {index + 1}
                      </span>
                      <span className="uppercase tracking-wide font-semibold">
                        {bundle.content_type.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-gray-800 mb-1">
                      {typeof bundle.content_title === 'string'
                        ? bundle.content_title
                        : bundle.content_title?.title || 'Untitled'}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">{bundle.description || 'No description'}</p>
{/* 
                    <p className="text-xs text-gray-500 italic mb-3">
                      Skill: {typeof bundle.content_title === 'object' ? bundle.content_title.skill || 'N/A' : 'N/A'}
                    </p> */}

                    {bundle.content_type === 'video' &&
                      bundle.content_title?.video_file ? (
                        <video
                          controls
                          preload="metadata"
                          className="rounded-lg w-full"
                        >
                          <source src={`${API_BASE_URL}${bundle.content_title.video_file}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : bundle.content_type === 'video' ? (
                        <div className="text-red-500">Video not available</div>
                      ) : null}

                    {bundle.content_type === 'study_material' &&
                      bundle.content_title?.file ? (
                        <a
                          href={`${API_BASE_URL}${bundle.content_title.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-2 bg-brandRed text-white px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition"
                        >
                          <FaFilePdf /> View/Download Material
                        </a>
                      ) : bundle.content_type === 'study_material' ? (
                        <p className="text-red-500">Study material not available</p>
                      ) : null}

                    {bundle.content_type === 'assignment' && (
                      <button
                        onClick={() => navigate(`/assignment/${bundle.content_id}`)}
                        className="mt-3 inline-flex items-center gap-2 bg-brandRed text-white px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition"
                      >
                        <FaTasks /> View Assignment
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CourseRoadmap;
