// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const TeacherCourseEditor = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const token = localStorage.getItem("token");
//   const config = { headers: { Authorization: `Token ${token}` } };

//   const [modules, setModules] = useState([]);
//   const [title, setTitle] = useState("");
//   const [order, setOrder] = useState(1);

//   useEffect(() => {
//     fetchModules();
//   }, []);

//   const fetchModules = async () => {
//     const res = await axios.get(`${API_BASE_URL}/api/courses/${courseId}/modules/`, config);

//     setModules(res.data);
//   };

//   const addModule = async () => {
//     await axios.post(`${API_BASE_URL}/api/courses/${courseId}/modules/`, { title, order }, config);
//     setTitle("");
//     setOrder(order + 1);
//     fetchModules();
//   };

//   const deleteModule = async (order) => {
//     await axios.delete(`${API_BASE_URL}/api/modules/${order}/`, config);
//     fetchModules();
//   };

//   const addBundle = async (order, contentType, contentId, description) => {
//     await axios.post(`${API_BASE_URL}/api/modules/${order}/bundles/`, { order: order,content_type: contentType, content_id: contentId, description }, config);
//     fetchModules();
//   };

//   const deleteBundle = async (bundleId) => {
//     await axios.delete(`${API_BASE_URL}/api/bundles/${bundleId}/`, config);
//     fetchModules();
//   };

//   return (
//     <div className="p-6 bg-brandCream min-h-screen">
//       <h1 className="text-3xl font-bold text-brandRed mb-6">Edit Course Roadmap</h1>

//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">Add Module</h2>
//         <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Module Title" className="border p-2 mr-2" />
//         <input value={order} onChange={(e) => setOrder(Number(e.target.value))} type="number" placeholder="order" className="border p-2 mr-2 w-24" />
//         <button onClick={addModule} className="bg-brandRed text-white px-4 py-2 rounded">Add Module</button>
//       </div>

//       {modules.map(module => (
//         <div key={module.id} className="bg-white p-4 rounded shadow mb-6">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-bold text-brandRed">Module {module.order}: {module.title}</h3>
//             <button onClick={() => deleteModule(module.id)} className="text-white bg-red-500 px-3 py-1 rounded">Delete Module</button>
//           </div>

//           <BundlesEditor module={module} addBundle={addBundle} deleteBundle={deleteBundle} />
//         </div>
//       ))}
//     </div>
//   );
// };

// const BundlesEditor = ({ module, addBundle, deleteBundle }) => {
//   const [contentType, setContentType] = useState("video");
//   const [contentId, setContentId] = useState("");
//   const [description, setDescription] = useState("");

//   return (
//     <>
//       <div className="mb-4">
//         <h4 className="font-semibold mb-2">Add Bundle</h4>
//         <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="border p-2 mr-2">
//           <option value="video">Video</option>
//           <option value="study_material">Study Material</option>
//           <option value="assignment">Assignment</option>
//         </select>
//         <input value={contentId} onChange={(e) => setContentId(e.target.value)} placeholder="Content ID" className="border p-2 mr-2 w-24" />
//         <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2 mr-2" />
//         <button onClick={() => addBundle(module.id, contentType, contentId, description)} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
//       </div>

//       {/* <div>
//         {module.bundles.map(bundle => (
//           <div key={bundle.id} className="flex justify-between items-center p-2 border rounded mb-2">
//             <p>{bundle.content_type.toUpperCase()} (ID: {bundle.content_id}) - {bundle.description}</p>
//             <button onClick={() => deleteBundle(bundle.id)} className="text-white bg-red-500 px-3 py-1 rounded">Delete</button>
//           </div>
//         ))}
//       </div> */}
//     </>
//   );
// };

// export default TeacherCourseEditor;


// 2 Working only not showing already present bundle
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const TeacherCourseEditor = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const token = localStorage.getItem("token");
//   const config = { headers: { Authorization: `Token ${token}` } };

//   const [modules, setModules] = useState([]);
//   const [title, setTitle] = useState("");
//   const [order, setOrder] = useState(1);

//   useEffect(() => {
//     fetchModules();
//   }, []);

//   const fetchModules = async () => {
//     const res = await axios.get(`${API_BASE_URL}/api/courses/${courseId}/modules/`, config);
//     setModules(res.data);
//   };

//   const addModule = async () => {
//     await axios.post(`${API_BASE_URL}/api/courses/${courseId}/modules/`, { title, order }, config);
//     setTitle("");
//     setOrder(order + 1);
//     fetchModules();
//   };

//   const deleteModule = async (order) => {
//     await axios.delete(`${API_BASE_URL}/api/modules/${order}/`, config);
//     fetchModules();
//   };

//   const addBundle = async (order, contentType, contentId, description) => {
//     await axios.post(`${API_BASE_URL}/api/modules/${order}/bundles/`, { module: order, content_type: contentType, content_id: contentId, description }, config);
//     fetchModules();
//   };

//   const deleteBundle = async (bundleId) => {
//     await axios.delete(`${API_BASE_URL}/api/bundles/${bundleId}/`, config);
//     fetchModules();
//   };

//   return (
//     <div className="p-6 bg-brandCream min-h-screen">
//       <h1 className="text-3xl font-bold text-brandRed mb-6">Edit Course Roadmap</h1>

//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">Add Module</h2>
//         <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Module Title" className="border p-2 mr-2" />
//         <input value={order} onChange={(e) => setOrder(Number(e.target.value))} type="number" placeholder="order" className="border p-2 mr-2 w-24" />
//         <button onClick={addModule} className="bg-brandRed text-white px-4 py-2 rounded">Add Module</button>
//       </div>

//       {modules.map(module => (
//         <div key={module.id} className="bg-white p-4 rounded shadow mb-6">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-bold text-brandRed">Module {module.order}: {module.title}</h3>
//             <button onClick={() => deleteModule(module.id)} className="text-white bg-red-500 px-3 py-1 rounded">Delete Module</button>
//           </div>

//           <BundlesEditor module={module} addBundle={addBundle} deleteBundle={deleteBundle} config={config} API_BASE_URL={API_BASE_URL} />
//         </div>
//       ))}
//     </div>
//   );
// };

// // UPDATED BUNDLE EDITOR
// const BundlesEditor = ({ module, addBundle, deleteBundle, config, API_BASE_URL }) => {
//   const [contentType, setContentType] = useState("video");
//   const [contentId, setContentId] = useState("");
//   const [description, setDescription] = useState("");
//   const [contentList, setContentList] = useState([]);

//   useEffect(() => {
//     if (contentType) {
//       let url = "";
//       if (contentType === "video") url = `${API_BASE_URL}/api/recorded-classes/`;
//       if (contentType === "study_material") url = `${API_BASE_URL}/api/study-materials/`;
//       if (contentType === "assignment") url = `${API_BASE_URL}/api/mock-assignments/`;

//       axios.get(url, config).then((res) => {
//         setContentList(res.data);
//         setContentId(""); // reset content id when type changes
//       });
//     }
//   }, [contentType]);

//   return (
//     <>
//       <div className="mb-4">
//         <h4 className="font-semibold mb-2">Add Bundle</h4>
//         <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="border p-2 mr-2">
//           <option value="video">Video</option>
//           <option value="study_material">Study Material</option>
//           <option value="assignment">Assignment</option>
//         </select>

//         <select value={contentId} onChange={(e) => setContentId(e.target.value)} className="border p-2 mr-2">
//           <option value="">Select Content</option>
//           {contentList.map(item => (
//             <option key={item.id} value={item.id}>{item.title}</option>
//           ))}
//         </select>

//         <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2 mr-2" />
//         <button onClick={() => addBundle(module.id, contentType, contentId, description)} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
//       </div>
//     </>
//   );
// };

// export default TeacherCourseEditor;







// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const TeacherCourseEditor = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const token = localStorage.getItem("token");
//   const config = { headers: { Authorization: `Token ${token}` } };

//   const [modules, setModules] = useState([]);
//   const [title, setTitle] = useState("");
//   const [order, setOrder] = useState(1);

//   useEffect(() => {
//     fetchModules();
//   }, []);

//   const fetchModules = async () => {
//     const res = await axios.get(`${API_BASE_URL}/api/courses/${courseId}/modules/`, config);
//     setModules(res.data);
//   };

//   const addModule = async () => {
//     await axios.post(`${API_BASE_URL}/api/courses/${courseId}/modules/`, { title, order }, config);
//     setTitle("");
//     setOrder(order + 1);
//     fetchModules();
//   };

//   const deleteModule = async (moduleId) => {
//     await axios.delete(`${API_BASE_URL}/api/modules/${moduleId}/`, config);
//     fetchModules();
//   };

//   const addBundle = async (moduleId, contentType, contentId, description) => {
//     await axios.post(`${API_BASE_URL}/api/modules/${moduleId}/bundles/`, 
//       { module: moduleId, content_type: contentType, content_id: contentId, description }, 
//       config
//     );
//     fetchModules();
//   };

//   const deleteBundle = async (bundleId) => {
//     await axios.delete(`${API_BASE_URL}/api/bundles/${bundleId}/`, config);
//     fetchModules();
//   };

//   return (
//     <div className="p-6 bg-brandCream min-h-screen">
//       <h1 className="text-3xl font-bold text-brandRed mb-6">Edit Course Roadmap</h1>

//       {/* Add Module */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">Add Module</h2>
//         <input 
//           value={title} 
//           onChange={(e) => setTitle(e.target.value)} 
//           placeholder="Module Title" 
//           className="border p-2 mr-2" 
//         />
//         <input 
//           value={order} 
//           onChange={(e) => setOrder(Number(e.target.value))} 
//           type="number" 
//           placeholder="Order" 
//           className="border p-2 mr-2 w-24" 
//         />
//         <button onClick={addModule} className="bg-brandRed text-white px-4 py-2 rounded">Add Module</button>
//       </div>

//       {/* Modules List */}
//       {modules.map(module => (
//         <div key={module.id} className="bg-white p-4 rounded shadow mb-6">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-bold text-brandRed">Module {module.order}: {module.title}</h3>
//             <button onClick={() => deleteModule(module.id)} className="text-white bg-red-500 px-3 py-1 rounded">Delete Module</button>
//           </div>

//           <BundlesEditor 
//             module={module} 
//             addBundle={addBundle} 
//             deleteBundle={deleteBundle} 
//             config={config} 
//             API_BASE_URL={API_BASE_URL} 
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// const BundlesEditor = ({ module, addBundle, deleteBundle, config, API_BASE_URL }) => {
//   const [contentType, setContentType] = useState("video");
//   const [contentId, setContentId] = useState("");
//   const [description, setDescription] = useState("");
//   const [contentList, setContentList] = useState([]);

//   useEffect(() => {
//     if (contentType) {
//       let url = "";
//       if (contentType === "video") url = `${API_BASE_URL}/api/recorded-classes/`;
//       if (contentType === "study_material") url = `${API_BASE_URL}/api/study-materials/`;
//       if (contentType === "assignment") url = `${API_BASE_URL}/api/mock-assignments/`;

//       axios.get(url, config).then((res) => {
//         setContentList(res.data);
//         setContentId(""); // Reset selected content when type changes
//       });
//     }
//   }, [contentType]);

//   return (
//     <>
//       {/* Add Bundle Form */}
//       <div className="mb-4">
//         <h4 className="font-semibold mb-2">Add Bundle</h4>
//         <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="border p-2 mr-2">
//           <option value="video">Video</option>
//           <option value="study_material">Study Material</option>
//           <option value="assignment">Assignment</option>
//         </select>

//         <select value={contentId} onChange={(e) => setContentId(e.target.value)} className="border p-2 mr-2">
//           <option value="">Select Content</option>
//           {contentList.map(item => (
//             <option key={item.id} value={item.id}>{item.title}</option>
//           ))}
//         </select>

//         <input 
//           value={description} 
//           onChange={(e) => setDescription(e.target.value)} 
//           placeholder="Description" 
//           className="border p-2 mr-2" 
//         />
//         <button 
//           onClick={() => addBundle(module.id, contentType, contentId, description)} 
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Add
//         </button>
//       </div>

//       {/* Show Existing Bundles */}
//       <div>
//         <h4 className="font-semibold mb-2">Existing Bundles:</h4>
//         {module.bundles.length === 0 ? (
//           <p>No bundles yet.</p>
//         ) : (
//           module.bundles.map(bundle => (
//             <div key={bundle.id} className="flex justify-between bg-gray-100 p-2 mb-1 rounded">
//               <span>{bundle.content_type} - {bundle.content_title} ({bundle.description})</span>
//               <button 
//                 onClick={() => deleteBundle(bundle.id)} 
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default TeacherCourseEditor;
// 5Fith Working assignmetn adding but unttitled
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const TeacherCourseEditor = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const token = localStorage.getItem('token');
//   const config = { headers: { Authorization: `Token ${token}` } };

//   const [modules, setModules] = useState([]);
//   const [title, setTitle] = useState('');
//   const [order, setOrder] = useState(1);

//   useEffect(() => {
//     fetchModules();
//   }, []);

//   const fetchModules = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/courses/${courseId}/modules/`, config);
//       console.log('fetchModules response:', JSON.stringify(res.data, null, 2));
//       setModules(res.data);
//     } catch (error) {
//       console.error('Error fetching modules:', error);
//       toast.error('Failed to load modules');
//     }
//   };

//   const addModule = async () => {
//     try {
//       await axios.post(
//         `${API_BASE_URL}/api/courses/${courseId}/modules/`,
//         { title, order },
//         config
//       );
//       setTitle('');
//       setOrder(order + 1);
//       fetchModules();
//       toast.success('Module added successfully');
//     } catch (error) {
//       console.error('Error adding module:', error);
//       toast.error('Failed to add module');
//     }
//   };

//   const deleteModule = async (moduleId) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/api/modules/${moduleId}/`, config);
//       fetchModules();
//       toast.success('Module deleted successfully');
//     } catch (error) {
//       console.error('Error deleting module:', error);
//       toast.error('Failed to delete module');
//     }
//   };

//   const addBundle = async (moduleId, contentType, contentId, description) => {
//     try {
//       await axios.post(
//         `${API_BASE_URL}/api/modules/${moduleId}/bundles/`,
//         { module: moduleId, content_type: contentType, content_id: contentId, description },
//         config
//       );
//       fetchModules();
//       toast.success('Bundle added successfully');
//     } catch (error) {
//       console.error('Error adding bundle:', error);
//       toast.error('Failed to add bundle');
//     }
//   };

//   const deleteBundle = async (bundleId) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/api/bundles/${bundleId}/`, config);
//       fetchModules();
//       toast.success('Bundle deleted successfully');
//     } catch (error) {
//       console.error('Error deleting bundle:', error);
//       toast.error('Failed to delete bundle');
//     }
//   };

//   return (
//     <div className="p-6 bg-brandCream min-h-screen">
//       <ToastContainer />
//       <h1 className="text-3xl font-bold text-brandRed mb-6">Edit Course Roadmap</h1>

//       {/* Add Module */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">Add Module</h2>
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Module Title"
//           className="border p-2 mr-2"
//         />
//         <input
//           value={order}
//           onChange={(e) => setOrder(Number(e.target.value))}
//           type="number"
//           placeholder="Order"
//           className="border p-2 mr-2 w-24"
//         />
//         <button onClick={addModule} className="bg-brandRed text-white px-4 py-2 rounded">
//           Add Module
//         </button>
//       </div>

//       {/* Modules List */}
//       {modules.map((module) => (
//         <div key={module.id} className="bg-white p-4 rounded shadow mb-6">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-bold text-brandRed">
//               Module {module.order}: {module.title}
//             </h3>
//             <button
//               onClick={() => deleteModule(module.id)}
//               className="text-white bg-red-500 px-3 py-1 rounded"
//             >
//               Delete Module
//             </button>
//           </div>

//           <BundlesEditor
//             module={module}
//             addBundle={addBundle}
//             deleteBundle={deleteBundle}
//             config={config}
//             API_BASE_URL={API_BASE_URL}
//             navigate={navigate}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// const BundlesEditor = ({ module, addBundle, deleteBundle, config, API_BASE_URL, navigate }) => {
//   const [contentType, setContentType] = useState('video');
//   const [contentId, setContentId] = useState('');
//   const [description, setDescription] = useState('');
//   const [contentList, setContentList] = useState([]);

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         let url = '';
//         if (contentType === 'video') url = `${API_BASE_URL}/api/recorded-classes/`;
//         if (contentType === 'study_material') url = `${API_BASE_URL}/api/study-materials/`;
//         if (contentType === 'assignment') url = `${API_BASE_URL}/api/api/assignments/`;

//         const res = await axios.get(url, config);
//         console.log(`fetchContent (${contentType}) response:`, JSON.stringify(res.data, null, 2));
//         setContentList(res.data);
//         setContentId(''); // Reset selected content when type changes
//       } catch (error) {
//         console.error(`Error fetching ${contentType}:`, error);
//         toast.error(`Failed to load ${contentType}`);
//       }
//     };
//     fetchContent();
//   }, [contentType, API_BASE_URL, config]);

//   return (
//     <>
//       {/* Add Bundle Form */}
//       <div className="mb-4">
//         <h4 className="font-semibold mb-2">Add Bundle</h4>
//         <select
//           value={contentType}
//           onChange={(e) => setContentType(e.target.value)}
//           className="border p-2 mr-2"
//         >
//           <option value="video">Video</option>
//           <option value="study_material">Study Material</option>
//           <option value="assignment">Assignment</option>
//         </select>

//         {contentType === 'assignment' && contentList.length === 0 ? (
//           <div className="flex items-center">
//             <p className="text-brandRed mr-2">No assignments available</p>
//             <button
//               onClick={() => navigate('/teacher/create-assignment')}
//               className="bg-brandRed text-white px-4 py-2 rounded"
//             >
//               Create Assignment
//             </button>
//           </div>
//         ) : (
//           <select
//             value={contentId}
//             onChange={(e) => setContentId(e.target.value)}
//             className="border p-2 mr-2"
//           >
//             <option value="">Select Content</option>
//             {contentList.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.title}
//               </option>
//             ))}
//           </select>
//         )}

//         <input
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//           className="border p-2 mr-2"
//         />
//         <button
//           onClick={() => addBundle(module.id, contentType, contentId, description)}
//           disabled={!contentId}
//           className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
//         >
//           Add
//         </button>
//       </div>

//       {/* Show Existing Bundles */}
//       <div>
//         <h4 className="font-semibold mb-2">Existing Bundles:</h4>
//         {module.bundles.length === 0 ? (
//           <p>No bundles yet.</p>
//         ) : (
//           module.bundles.map((bundle) => (
//             <div key={bundle.id} className="flex justify-between bg-gray-100 p-2 mb-1 rounded">
//               <span>
//                 {bundle.content_type} -{' '}
//                 {bundle.content_title?.title || bundle.content_title || 'Untitled'} (
//                 {bundle.description})
//               </span>
//               <button
//                 onClick={() => deleteBundle(bundle.id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default TeacherCourseEditor;


// 6.Sixth

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const TeacherCourseEditor = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const token = localStorage.getItem('token');
//   const config = { headers: { Authorization: `Token ${token}` } };

//   const [modules, setModules] = useState([]);
//   const [title, setTitle] = useState('');
//   const [order, setOrder] = useState(1);

//   useEffect(() => {
//     fetchModules();
//   }, []);

//   const fetchModules = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/courses/${courseId}/modules/`, config);
//       console.log('fetchModules response:', JSON.stringify(res.data, null, 2));
//       setModules(res.data);
//     } catch (error) {
//       console.error('Error fetching modules:', error);
//       toast.error('Failed to load modules');
//     }
//   };

//   const addModule = async () => {
//     try {
//       await axios.post(
//         `${API_BASE_URL}/api/courses/${courseId}/modules/`,
//         { title, order },
//         config
//       );
//       setTitle('');
//       setOrder(order + 1);
//       fetchModules();
//       toast.success('Module added successfully');
//     } catch (error) {
//       console.error('Error adding module:', error);
//       toast.error('Failed to add module');
//     }
//   };

//   const deleteModule = async (moduleId) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/api/modules/${moduleId}/`, config);
//       fetchModules();
//       toast.success('Module deleted successfully');
//     } catch (error) {
//       console.error('Error deleting module:', error);
//       toast.error('Failed to delete module');
//     }
//   };

//   const addBundle = async (moduleId, contentType, contentId, description) => {
//     try {
//       await axios.post(
//         `${API_BASE_URL}/api/modules/${moduleId}/bundles/`,
//         { module: moduleId, content_type: contentType, content_id: contentId, description },
//         config
//       );
//       fetchModules();
//       toast.success('Bundle added successfully');
//     } catch (error) {
//       console.error('Error adding bundle:', error);
//       toast.error('Failed to add bundle');
//     }
//   };

//   const deleteBundle = async (bundleId) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/api/bundles/${bundleId}/`, config);
//       fetchModules();
//       toast.success('Bundle deleted successfully');
//     } catch (error) {
//       console.error('Error deleting bundle:', error);
//       toast.error('Failed to delete bundle');
//     }
//   };

//   return (
//     <div className="p-6 bg-brandCream min-h-screen">
//       <ToastContainer />
//       <h1 className="text-3xl font-bold text-brandRed mb-6">Edit Course Roadmap</h1>

//       {/* Add Module */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">Add Module</h2>
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Module Title"
//           className="border p-2 mr-2"
//         />
//         <input
//           value={order}
//           onChange={(e) => setOrder(Number(e.target.value))}
//           type="number"
//           placeholder="Order"
//           className="border p-2 mr-2 w-24"
//         />
//         <button onClick={addModule} className="bg-brandRed text-white px-4 py-2 rounded">
//           Add Module
//         </button>
//       </div>

//       {/* Modules List */}
//       {modules.map((module) => (
//         <div key={module.id} className="bg-white p-4 rounded shadow mb-6">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-bold text-brandRed">
//               Module {module.order}: {module.title}
//             </h3>
//             <button
//               onClick={() => deleteModule(module.id)}
//               className="text-white bg-red-500 px-3 py-1 rounded"
//             >
//               Delete Module
//             </button>
//           </div>

//           <BundlesEditor
//             module={module}
//             addBundle={addBundle}
//             deleteBundle={deleteBundle}
//             config={config}
//             API_BASE_URL={API_BASE_URL}
//             navigate={navigate}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// const BundlesEditor = ({ module, addBundle, deleteBundle, config, API_BASE_URL, navigate }) => {
//   const [contentType, setContentType] = useState('video');
//   const [contentId, setContentId] = useState('');
//   const [description, setDescription] = useState('');
//   const [contentList, setContentList] = useState([]);

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         let url = '';
//         if (contentType === 'video') url = `${API_BASE_URL}/api/recorded-classes/`;
//         if (contentType === 'study_material') url = `${API_BASE_URL}/api/study-materials/`;
//         if (contentType === 'assignment') url = `${API_BASE_URL}/api/api/assignments/`;

//         const res = await axios.get(url, config);
//         console.log(`fetchContent (${contentType}) response:`, JSON.stringify(res.data, null, 2));
//         setContentList(res.data);
//         setContentId(''); // Reset selected content when type changes
//       } catch (error) {
//         console.error(`Error fetching ${contentType}:`, error);
//         toast.error(`Failed to load ${contentType}`);
//       }
//     };
//     fetchContent();
//   }, [contentType, API_BASE_URL, config]);

//   return (
//     <>
//       {/* Add Bundle Form */}
//       <div className="mb-4">
//         <h4 className="font-semibold mb-2">Add Bundle</h4>
//         <select
//           value={contentType}
//           onChange={(e) => setContentType(e.target.value)}
//           className="border p-2 mr-2"
//         >
//           <option value="video">Video</option>
//           <option value="study_material">Study Material</option>
//           <option value="assignment">Assignment</option>
//         </select>

//         {contentType === 'assignment' && contentList.length === 0 ? (
//           <div className="flex items-center">
//             <p className="text-brandRed mr-2">No assignments available</p>
//             <button
//               onClick={() => navigate('/teacher/create-assignment')}
//               className="bg-brandRed text-white px-4 py-2 rounded"
//             >
//               Create Assignment
//             </button>
//           </div>
//         ) : (
//           <select
//             value={contentId}
//             onChange={(e) => setContentId(e.target.value)}
//             className="border p-2 mr-2"
//           >
//             <option value="">Select Content</option>
//             {contentList.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.title}
//               </option>
//             ))}
//           </select>
//         )}

//         <input
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//           className="border p-2 mr-2"
//         />
//         <button
//           onClick={() => addBundle(module.id, contentType, contentId, description)}
//           disabled={!contentId}
//           className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
//         >
//           Add
//         </button>
//       </div>

//       {/* Show Existing Bundles */}
//       <div>
//         <h4 className="font-semibold mb-2">Existing Bundles:</h4>
//         {module.bundles.length === 0 ? (
//           <p>No bundles yet.</p>
//         ) : (
//           module.bundles.map((bundle) => (
//             <div key={bundle.id} className="flex justify-between bg-gray-100 p-2 mb-1 rounded">
//               <span>
//                 {bundle.content_type} - {bundle.content_title || 'Untitled'} ({bundle.description})
//               </span>
//               <button
//                 onClick={() => deleteBundle(bundle.id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default TeacherCourseEditor;

// 7Seventh

// src/components/TeacherCourseEditor.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherCourseEditor = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Token ${token}` } };

  const [modules, setModules] = useState([]);
  const [title, setTitle] = useState('');
  const [order, setOrder] = useState(1);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/courses/${courseId}/modules/`, config);
      console.log('fetchModules response:', JSON.stringify(res.data, null, 2));
      setModules(res.data);
    } catch (error) {
      console.error('Error fetching modules:', error);
      toast.error('Failed to load modules');
    }
  };

  const addModule = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/courses/${courseId}/modules/`,
        { title, order },
        config
      );
      setTitle('');
      setOrder(order + 1);
      fetchModules();
      toast.success('Module added successfully');
    } catch (error) {
      console.error('Error adding module:', error);
      toast.error('Failed to add module');
    }
  };

  const deleteModule = async (moduleId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/modules/${moduleId}/`, config);
      fetchModules();
      toast.success('Module deleted successfully');
    } catch (error) {
      console.error('Error deleting module:', error);
      toast.error('Failed to delete module');
    }
  };

  const addBundle = async (moduleId, contentType, contentId, description) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/modules/${moduleId}/bundles/`,
        { module: moduleId, content_type: contentType, content_id: contentId, description },
        config
      );
      fetchModules();
      toast.success('Bundle added successfully');
    } catch (error) {
      console.error('Error adding bundle:', error);
      toast.error('Failed to add bundle');
    }
  };

  const deleteBundle = async (bundleId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/bundles/${bundleId}/`, config);
      fetchModules();
      toast.success('Bundle deleted successfully');
    } catch (error) {
      console.error('Error deleting bundle:', error);
      toast.error('Failed to delete bundle');
    }
  };

  return (
    <div className="p-6 bg-brandCream min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-brandRed mb-6">Edit Course Roadmap</h1>

      {/* Add Module */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Module</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Module Title"
          className="border p-2 mr-2"
        />
        <input
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          type="number"
          placeholder="Order"
          className="border p-2 mr-2 w-24"
        />
        <button onClick={addModule} className="bg-brandRed text-white px-4 py-2 rounded">
          Add Module
        </button>
      </div>

      {/* Modules List */}
      {modules.map((module) => (
        <div key={module.id} className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-brandRed">
              Module {module.order}: {module.title}
            </h3>
            <button
              onClick={() => deleteModule(module.id)}
              className="text-white bg-red-500 px-3 py-1 rounded"
            >
              Delete Module
            </button>
          </div>

          <BundlesEditor
            module={module}
            addBundle={addBundle}
            deleteBundle={deleteBundle}
            config={config}
            API_BASE_URL={API_BASE_URL}
            navigate={navigate}
          />
        </div>
      ))}
    </div>
  );
};

// const BundlesEditor = ({ module, addBundle, deleteBundle, config, API_BASE_URL, navigate }) => {
//   const [contentType, setContentType] = useState('video');
//   const [contentId, setContentId] = useState('');
//   const [description, setDescription] = useState('');
//   const [contentList, setContentList] = useState([]);

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         let url = '';
//         if (contentType === 'video') url = `${API_BASE_URL}/api/recorded-classes/`;
//         if (contentType === 'study_material') url = `${API_BASE_URL}/api/study-materials/`;
//         if (contentType === 'assignment') url = `${API_BASE_URL}/api/api/assignments/`;

//         const res = await axios.get(url, config);
//         console.log(`fetchContent (${contentType}) response:`, JSON.stringify(res.data, null, 2));
//         setContentList(res.data);
//         setContentId(''); // Reset selected content when type changes
//       } catch (error) {
//         console.error(`Error fetching ${contentType}:`, error);
//         toast.error(`Failed to load ${contentType}`);
//       }
//     };
//     fetchContent();
//   }, [contentType, API_BASE_URL, config]);

//   return (
//     <>
//       {/* Add Bundle Form */}
//       <div className="mb-4">
//         <h4 className="font-semibold mb-2">Add Bundle</h4>
//         <select
//           value={contentType}
//           onChange={(e) => setContentType(e.target.value)}
//           className="border p-2 mr-2"
//         >
//           <option value="video">Video</option>
//           <option value="study_material">Study Material</option>
//           <option value="assignment">Assignment</option>
//         </select>

//         {contentType === 'assignment' && contentList.length === 0 ? (
//           <div className="flex items-center">
//             <p className="text-brandRed mr-2">No assignments available</p>
//             <button
//               onClick={() => navigate('/teacher/create-assignment')}
//               className="bg-brandRed text-white px-4 py-2 rounded"
//             >
//               Create Assignment
//             </button>
//           </div>
//         ) : (
//           <select
//             value={contentId}
//             onChange={(e) => setContentId(e.target.value)}
//             className="border p-2 mr-2"
//           >
//             <option value="">Select Content</option>
//             {contentList.map((item) => (
//               <option key={item.id} value={item.id}>
//                 {item.title}
//               </option>
//             ))}
//           </select>
//         )}

//         <input
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Description"
//           className="border p-2 mr-2"
//         />
//         <button
//           onClick={() => addBundle(module.id, contentType, contentId, description)}
//           disabled={!contentId}
//           className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
//         >
//           Add
//         </button>
//       </div>

//       {/* Show Existing Bundles */}
//       <div>
//         <h4 className="font-semibold mb-2">Existing Bundles:</h4>
//         {module.bundles.length === 0 ? (
//           <p>No bundles yet.</p>
//         ) : (
//           module.bundles.map((bundle) => (
//             <div key={bundle.id} className="flex justify-between bg-gray-100 p-2 mb-1 rounded">
//               <span>
//                 {bundle.content_type} - {bundle.content_title || 'Untitled'} ({bundle.description})
//                 {bundle.content_type === 'assignment' && (
//                   <button
//                     onClick={() => navigate(`/teacher/view-assignment/${bundle.content_id}`)}
//                     className="ml-2 text-blue-500 underline"
//                   >
//                     View
//                   </button>
//                 )}
//               </span>
//               <button
//                 onClick={() => deleteBundle(bundle.id)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };
const BundlesEditor = ({ module, addBundle, deleteBundle, config, API_BASE_URL, navigate }) => {
  const [contentType, setContentType] = useState('video');
  const [contentId, setContentId] = useState('');
  const [description, setDescription] = useState('');
  const [contentList, setContentList] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        let url = '';
        if (contentType === 'video') url = `${API_BASE_URL}/api/recorded-classes/`;
        if (contentType === 'study_material') url = `${API_BASE_URL}/api/study-materials/`;
        if (contentType === 'assignment') url = `${API_BASE_URL}/api/api/assignments/`; // Fixed URL typo

        const res = await axios.get(url, config);
        console.log(`fetchContent (${contentType}) response:`, JSON.stringify(res.data, null, 2));
        setContentList(res.data);
        setContentId(''); // Reset selected content when type changes
      } catch (error) {
        console.error(`Error fetching ${contentType}:`, error);
        toast.error(`Failed to load ${contentType}`);
      }
    };
    fetchContent();
  }, [contentType, API_BASE_URL, config]);

  return (
    <>
      {/* Add Bundle Form */}
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Add Bundle</h4>
        <select
          value={contentType}
          onChange={(e) => setContentType(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="video">Video</option>
          <option value="study_material">Study Material</option>
          <option value="assignment">Assignment</option>
        </select>

        {contentType === 'assignment' && contentList.length === 0 ? (
          <div className="flex items-center">
            <p className="text-brandRed mr-2">No assignments available</p>
            <button
              onClick={() => navigate('/teacher/create-assignment')}
              className="bg-brandRed text-white px-4 py-2 rounded"
            >
              Create Assignment
            </button>
          </div>
        ) : (
          <select
            value={contentId}
            onChange={(e) => setContentId(e.target.value)}
            className="border p-2 mr-2"
          >
            <option value="">Select Content</option>
            {contentList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        )}

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 mr-2"
        />
        <button
          onClick={() => addBundle(module.id, contentType, contentId, description)}
          disabled={!contentId}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Add
        </button>
      </div>

      {/* Show Existing Bundles */}
      <div>
        <h4 className="font-semibold mb-2">Existing Bundles:</h4>
        {module.bundles.length === 0 ? (
          <p>No bundles yet.</p>
        ) : (
          module.bundles.map((bundle) => (
            <div key={bundle.id} className="flex justify-between bg-gray-100 p-2 mb-1 rounded">
              <span>
                {bundle.content_type} -{' '}
                {bundle.content_type === 'video' || bundle.content_type === 'study_material'
                  ? bundle.content_title?.title || 'Untitled'
                  : bundle.content_title || 'Untitled'}{' '}
                ({bundle.description})
                {bundle.content_type === 'assignment' && (
                  <button
                    onClick={() => navigate(`/teacher/view-assignment/${bundle.content_id}`)}
                    className="ml-2 text-blue-500 underline"
                  >
                    View
                  </button>
                )}
              </span>
              <button
                onClick={() => deleteBundle(bundle.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TeacherCourseEditor;