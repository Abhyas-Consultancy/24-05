// import React, { useState, useEffect } from 'react';
// import assignmentData from './Assignment_1.json';

// const ViewAssignment = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     setData(assignmentData);
//   }, []);

//   if (!data) {
//     return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center">{data.title}</h1>

//         {data.sections.map((section) => (
//           <div key={section.section_id} className="mb-8">
//             <h2 className="text-2xl font-semibold mb-4 text-blue-600">{section.name}</h2>

//             {section.tasks && section.tasks.length > 0 && (
//               <div className="mb-6">
//                 {section.tasks.map((task) => (
//                   <div key={task.id} className="mb-6 border-b pb-4">
//                     <h3 className="text-xl font-medium mb-2">{task.title}</h3>
//                     <p className="text-gray-700 mb-2 whitespace-pre-line">{task.instructions}</p>
//                     {task.image && (
//                       <img
//                         src={task.image}
//                         alt="Task Image"
//                         className="max-w-full h-auto mb-4 rounded"
//                       />
//                     )}
//                     <textarea
//                       className="w-full p-2 border rounded mt-2"
//                       rows="6"
//                       placeholder="Type your response here..."
//                     />
//                   </div>
//                 ))}
//               </div>
//             )}

//             {section.passages && section.passages.length > 0 && (
//               <div className="mb-6">
//                 {section.passages.map((passage) => (
//                   <div key={passage.id} className="mb-6">
//                     <h3 className="text-xl font-medium mb-2">{passage.title}</h3>
//                     <p className="text-gray-700 mb-2 whitespace-pre-line">{passage.instructions}</p>
//                     <div className="text-gray-600 mb-4 whitespace-pre-line">{passage.content}</div>
//                     {passage.questions.map((questionSet) => (
//                       <div key={questionSet.set_id} className="mb-4">
//                         <p className="text-gray-700 mb-2 whitespace-pre-line">{questionSet.instructions}</p>
//                         {questionSet.questions.map((question) => (
//                           <div key={question.question_id} className="mb-4">
//                             <p className="font-medium">
//                               {question.number}. {question.text}
//                             </p>
//                             {question.type === 'multiple_choice' ? (
//                               <div className="ml-4 mt-2">
//                                 {question.options.map((option, index) => (
//                                   <label key={index} className="block">
//                                     <input
//                                       type="checkbox"
//                                       name={`question-${question.question_id}`}
//                                       value={option}
//                                       className="mr-2"
//                                     />
//                                     {option}
//                                   </label>
//                                 ))}
//                               </div>
//                             ) : (
//                               <input
//                                 type="text"
//                                 className="w-full p-2 border rounded mt-2"
//                                 placeholder="Type your answer here..."
//                               />
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewAssignment;


// 2Second
// import React, { useState, useEffect, useRef } from 'react';
// import assignmentData from './Assignment_1.json';

// const ViewAssignment = () => {
//   const [data, setData] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const audioRefs = useRef({});
//   const mediaRecorderRef = useRef(null);
//   const [recording, setRecording] = useState({});

//   useEffect(() => {
//     setData(assignmentData);
//     // Initialize answers structure
//     const initialAnswers = {};
//     assignmentData.sections.forEach((section) => {
//       section.tasks.forEach((task) => {
//         if (section.name === 'WRITING' || section.name === 'SPEAKING') {
//           initialAnswers[task.id] = '';
//         }
//         if (section.name === 'WRITING' || section.name === 'READING' || section.name === 'LISTENING') {
//           task.questions.forEach((questionSet) => {
//             questionSet.questions.forEach((question) => {
//               initialAnswers[question.question_id] = question.type === 'table' ? [] : '';
//             });
//           });
//         }
//       });
//     });
//     setAnswers(initialAnswers);
//   }, []);

//   const handleAnswerChange = (id, value, rowIndex = null) => {
//     setAnswers((prev) => {
//       if (rowIndex !== null) {
//         const newAnswers = [...(prev[id] || [])];
//         newAnswers[rowIndex] = value;
//         return { ...prev, [id]: newAnswers };
//       }
//       return { ...prev, [id]: value };
//     });
//   };

//   const handleAudioControl = (taskId, action) => {
//     const audio = audioRefs.current[taskId];
//     if (!audio) return;
//     if (action === 'play') audio.play();
//     if (action === 'pause') audio.pause();
//     if (action === 'rewind') audio.currentTime = 0;
//   };

//   const startRecording = async (taskId) => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);
//       const chunks = [];
//       mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
//       mediaRecorderRef.current.onstop = () => {
//         const blob = new Blob(chunks, { type: 'audio/webm' });
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setAnswers((prev) => ({ ...prev, [taskId]: reader.result }));
//           stream.getTracks().forEach((track) => track.stop());
//         };
//         reader.readAsDataURL(blob);
//       };
//       mediaRecorderRef.current.start();
//       setRecording((prev) => ({ ...prev, [taskId]: true }));
//     } catch (error) {
//       console.error('Error starting recording:', error);
//     }
//   };

//   const stopRecording = (taskId) => {
//     if (mediaRecorderRef.current && recording[taskId]) {
//       mediaRecorderRef.current.stop();
//       setRecording((prev) => ({ ...prev, [taskId]: false }));
//     }
//   };

//   const saveAnswers = () => {
//     const json = JSON.stringify(answers, null, 2);
//     const blob = new Blob([json], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `Answers_${data.test_id}.json`;
//     link.click();
//     URL.revokeObjectURL(url);
//   };

//   if (!data) {
//     return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center">{data.title}</h1>

//         {data.sections.map((section) => (
//           <div key={section.section_id} className="mb-8">
//             <h2 className="text-2xl font-semibold mb-4 text-blue-600">{section.name}</h2>
//             {section.instructions && (
//               <p className="text-gray-700 mb-4 whitespace-pre-line">{section.instructions}</p>
//             )}

//             {section.tasks && section.tasks.length > 0 && (
//               <div className="mb-6">
//                 {section.tasks.map((task) => (
//                   <div key={task.id} className="mb-6 border-b pb-4">
//                     <h3 className="text-xl font-medium mb-2">{task.title}</h3>
//                     <p className="text-gray-700 mb-2 whitespace-pre-line">{task.instructions}</p>
//                     {task.image && (
//                       <img
//                         src={task.image}
//                         alt="Task Image"
//                         className="max-w-full h-auto mb-4 rounded"
//                       />
//                     )}
//                     {section.name === 'LISTENING' && task.audio && (
//                       <div className="mb-4">
//                         <audio
//                           ref={(el) => (audioRefs.current[task.id] = el)}
//                           src={task.audio}
//                           className="w-full mb-2"
//                         />
//                         <div className="flex space-x-2">
//                           <button
//                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                             onClick={() => handleAudioControl(task.id, 'play')}
//                           >
//                             Play
//                           </button>
//                           <button
//                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                             onClick={() => handleAudioControl(task.id, 'pause')}
//                           >
//                             Pause
//                           </button>
//                           <button
//                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                             onClick={() => handleAudioControl(task.id, 'rewind')}
//                           >
//                             Rewind
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                     {(section.name === 'READING' || section.name === 'LISTENING') && task.content && (
//                       <div className="text-gray-600 mb-4 whitespace-pre-line">{task.content}</div>
//                     )}
//                     {task.optionalText && (
//                       <p className="text-gray-600 mb-2 whitespace-pre-line">{task.optionalText}</p>
//                     )}
//                     {section.name === 'SPEAKING' ? (
//                       <div className="mb-4">
//                         <div className="flex space-x-2 mb-2">
//                           <button
//                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                             onClick={() => startRecording(task.id)}
//                             disabled={recording[task.id]}
//                           >
//                             Start Recording
//                           </button>
//                           <button
//                             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                             onClick={() => stopRecording(task.id)}
//                             disabled={!recording[task.id]}
//                           >
//                             Stop Recording
//                           </button>
//                         </div>
//                         {answers[task.id] && (
//                           <audio controls src={answers[task.id]} className="w-full" />
//                         )}
//                       </div>
//                     ) : section.name === 'WRITING' && !task.questions.length ? (
//                       <textarea
//                         className="w-full p-2 border rounded mt-2"
//                         rows="6"
//                         placeholder="Type your response here..."
//                         value={answers[task.id] || ''}
//                         onChange={(e) => handleAnswerChange(task.id, e.target.value)}
//                       />
//                     ) : null}
//                     {(section.name === 'WRITING' || section.name === 'READING' || section.name === 'LISTENING') &&
//                       task.questions.map((questionSet) => (
//                         <div key={questionSet.set_id} className="mb-4">
//                           <p className="text-gray-700 mb-2 whitespace-pre-line">{questionSet.instructions}</p>
//                           {questionSet.optionalText && (
//                             <p className="text-gray-600 mb-2 whitespace-pre-line">{questionSet.optionalText}</p>
//                           )}
//                           {questionSet.questions.map((question) => (
//                             <div key={question.question_id} className="mb-4">
//                               <p className="font-medium">
//                                 {question.number}. {question.text}
//                               </p>
//                               {question.type === 'multiple_choice' ? (
//                                 <div className="ml-4 mt-2">
//                                   {question.options.map((option, index) => (
//                                     <label key={index} className="block">
//                                       <input
//                                         type="radio"
//                                         name={`question-${question.question_id}`}
//                                         value={option}
//                                         checked={answers[question.question_id] === option}
//                                         onChange={() => handleAnswerChange(question.question_id, option)}
//                                         className="mr-2"
//                                       />
//                                       {option}
//                                     </label>
//                                   ))}
//                                 </div>
//                               ) : question.type === 'table' ? (
//                                 <div className="ml-4 mt-2">
//                                   <div className="flex mb-2">
//                                     {question.columns.map((column, colIndex) => (
//                                       <span key={colIndex} className="flex-1 font-medium">
//                                         {column.label}
//                                       </span>
//                                     ))}
//                                   </div>
//                                   {question.table.map((row, rowIndex) => (
//                                     <div key={rowIndex} className="flex mb-2">
//                                       {question.columns.map((column, colIndex) => (
//                                         <div key={colIndex} className="flex-1 p-2">
//                                           {colIndex === 0 ? (
//                                             <span>{row.content}</span>
//                                           ) : colIndex === 1 ? (
//                                             <span>{row.question}</span>
//                                           ) : column.isAnswer ? (
//                                             <input
//                                               type="text"
//                                               className="w-full p-2 border rounded"
//                                               placeholder="Type your answer here..."
//                                               value={answers[question.question_id]?.[rowIndex] || ''}
//                                               onChange={(e) =>
//                                                 handleAnswerChange(question.question_id, e.target.value, rowIndex)
//                                               }
//                                             />
//                                           ) : (
//                                             <span></span>
//                                           )}
//                                         </div>
//                                       ))}
//                                     </div>
//                                   ))}
//                                 </div>
//                               ) : (
//                                 <input
//                                   type="text"
//                                   className="w-full p-2 border rounded mt-2"
//                                   placeholder="Type your answer here..."
//                                   value={answers[question.question_id] || ''}
//                                   onChange={(e) => handleAnswerChange(question.question_id, e.target.value)}
//                                 />
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       ))}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}

//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           onClick={saveAnswers}
//         >
//           Save Answers
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewAssignment;

// 3Third
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ViewAssignment = () => {
//   const { assignmentId } = useParams();
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const token = localStorage.getItem('token');
//   const config = { headers: { Authorization: `Token ${token}` } };
//   const [assignment, setAssignment] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const role = localStorage.getItem('role');

//   useEffect(() => {
//     const fetchAssignment = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}/api/api/api/api/assignments/${assignmentId}/`, config);
//         console.log('fetchAssignment response:', JSON.stringify(res.data, null, 2));
//         setAssignment(res.data);
//       } catch (error) {
//         console.error('Error fetching assignment:', error);
//         toast.error('Failed to load assignment');
//       }
//     };
//     fetchAssignment();
//   }, [assignmentId]);

//   const handleAnswerChange = (sectionId, taskId, questionId, value) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [`${sectionId}_${taskId}_${questionId}`]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.post(
//         `${API_BASE_URL}/api/api/api/api/assignments/${assignmentId}/submit/`,
//         { answers },
//         config
//       );
//       toast.success('Answers submitted successfully');
//     } catch (error) {
//       console.error('Error submitting answers:', error);
//       toast.error('Failed to submit answers');
//     }
//   };

//   if (!assignment) {
//     return <div className="p-4 text-center text-brandRed">Loading...</div>;
//   }

//   return (
//     <div className="p-6 bg-brandCream min-h-screen">
//       <ToastContainer />
//       <h1 className="text-3xl font-bold text-brandRed mb-6">{assignment.title}</h1>
//       {assignment.json_content.sections.map((section) => (
//         <div key={section.section_id} className="bg-white p-4 rounded shadow mb-6">
//           <h2 className="text-xl font-semibold text-brandRed mb-2">{section.name}</h2>
//           <p className="mb-2">{section.instructions}</p>
//           {section.tasks.map((task) => (
//             <div key={task.task_id} className="mb-4">
//               <h3 className="font-semibold">{task.title}</h3>
//               {task.audio_url && (
//                 <audio controls className="my-2">
//                   <source src={`${API_BASE_URL}${task.audio_url}`} type="audio/mpeg" />
//                   Your browser does not support the audio element.
//                 </audio>
//               )}
//               {task.image_url && (
//                 <img
//                   src={`${API_BASE_URL}${task.image_url}`}
//                   alt={task.title}
//                   className="max-w-full h-auto my-2"
//                 />
//               )}
//               {task.questions && task.questions.length > 0 && (
//                 <div>
//                   {task.questions.map((question, index) => (
//                     <div key={question.id || index} className="mb-2">
//                       <p>{question.text}</p>
//                       {question.type === 'true_false_not_given' ? (
//                         <div className="flex gap-4">
//                           {['True', 'False', 'Not Given'].map((option) => (
//                             <label key={option} className="flex items-center">
//                               <input
//                                 type="radio"
//                                 name={`question_${section.section_id}_${task.task_id}_${question.id}`}
//                                 value={option}
//                                 checked={
//                                   answers[`${section.section_id}_${task.task_id}_${question.id}`] === option
//                                 }
//                                 onChange={() =>
//                                   handleAnswerChange(section.section_id, task.task_id, question.id, option)
//                                 }
//                                 className="mr-2"
//                                 disabled={role !== 'student'}
//                               />
//                               {option}
//                             </label>
//                           ))}
//                         </div>
//                       ) : (
//                         <p className="text-gray-500">Question type: {question.type}</p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//       {role === 'student' && (
//         <button
//           onClick={handleSubmit}
//           className="bg-brandRed text-white px-4 py-2 rounded mt-4"
//         >
//           Submit Answers
//         </button>
//       )}
//     </div>
//   );
// };

// export default ViewAssignment;


// 4Fourth
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ViewAssignment = () => {
//   const { assignmentId } = useParams();
//   const navigate = useNavigate();
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
//   const token = localStorage.getItem('token');
//   const config = { headers: { Authorization: `Token ${token}` } };

//   const [assignment, setAssignment] = useState(null);
//   const [submission, setSubmission] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const fetchAssignment = async () => {
//     if (!assignmentId || assignmentId === 'undefined') {
//       console.error('Invalid assignment ID:', assignmentId);
//       toast.error('Invalid assignment ID');
//       navigate('/student-dashboard');
//       return;
//     }
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/api/assignments/${assignmentId}/`, config);
//       console.log('fetchAssignment response:', JSON.stringify(res.data, null, 2));
//       setAssignment(res.data);
//       // Initialize answers for valid keys only
//       const initialAnswers = {};
//       const validKeys = new Set();
//       (res.data.json_content.sections || []).forEach((section) => {
//         (section.tasks || []).forEach((task) => {
//           if (section.name === 'SPEAKING') {
//             const key = `${section.section_id}_${task.id}`;
//             validKeys.add(key);
//             initialAnswers[key] = '';
//           } else if (task.questions) {
//             task.questions.forEach((questionSet) => {
//               (questionSet.questions || []).forEach((question) => {
//                 const key = `${section.section_id}_${task.id}_${question.question_id}`;
//                 validKeys.add(key);
//                 if (question.type === 'short_answer' || question.type === 'essay') {
//                   initialAnswers[key] = '';
//                 } else if (question.type === 'multiple_choice' || question.type === 'true_false_not_given') {
//                   initialAnswers[key] = '';
//                 } else if (question.type === 'table') {
//                   initialAnswers[key] = Array(question.table?.length || 0).fill('');
//                 }
//               });
//             });
//           }
//         });
//       });
//       setAnswers(initialAnswers);
//     } catch (error) {
//       console.error('Error fetching assignment:', error);
//       toast.error('Failed to load assignment');
//       if (error.response?.status === 404) {
//         navigate('/student-dashboard');
//       }
//     }
//   };

//   const fetchSubmission = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/api/assignments/${assignmentId}/submit/`, config);
//       console.log('fetchSubmission response:', JSON.stringify(res.data, null, 2));
//       setSubmission(res.data);
//       if (res.data.answers) {
//         // Filter answers to include only valid keys
//         const validAnswers = {};
//         const validKeys = new Set();
//         (assignment?.json_content.sections || []).forEach((section) => {
//           (section.tasks || []).forEach((task) => {
//             if (section.name === 'SPEAKING') {
//               validKeys.add(`${section.section_id}_${task.id}`);
//             } else if (task.questions) {
//               task.questions.forEach((questionSet) => {
//                 (questionSet.questions || []).forEach((question) => {
//                   validKeys.add(`${section.section_id}_${task.id}_${question.question_id}`);
//                 });
//               });
//             }
//           });
//         });
//         Object.keys(res.data.answers).forEach((key) => {
//           if (validKeys.has(key)) {
//             validAnswers[key] = res.data.answers[key];
//           } else {
//             console.warn(`Ignoring invalid answer key: ${key}`);
//           }
//         });
//         setAnswers(validAnswers);
//       }
//     } catch (error) {
//       console.error('Error fetching submission:', error);
//       if (error.response?.status === 405 || error.response?.status === 404) {
//         console.warn('No submission exists yet or GET not supported.');
//         setSubmission(null);
//       } else {
//         toast.error('Failed to load submission');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchAssignment();
//     fetchSubmission();
//   }, [assignmentId]);

//   const handleAnswerChange = (key, value, index = null) => {
//     setAnswers((prev) => {
//       if (index !== null) {
//         const newArray = [...(prev[key] || [])];
//         newArray[index] = value;
//         return { ...prev, [key]: newArray };
//       }
//       return { ...prev, [key]: value };
//     });
//   };
//   const splitAnswerKey = (key) => {
//   const parts = key.split("_");
//   if (parts.length >= 3) {
//     return {
//       sectionId: parts[0],
//       taskId: parts[1],
//       questionId: parts.slice(2).join("_"), // in case `questionId` had underscores
//     };
//   }
//   return { sectionId: "", taskId: "", questionId: "" };
// };
//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       // Filter answers to include only valid keys
//       const validKeys = new Set();
//       (assignment?.json_content.sections || []).forEach((section) => {
//         (section.tasks || []).forEach((task) => {
//           if (section.name === 'SPEAKING') {
//             validKeys.add(`${section.section_id}_${task.id}`);
//           } else if (task.questions) {
//             task.questions.forEach((questionSet) => {
//               (questionSet.questions || []).forEach((question) => {
//                 validKeys.add(`${section.section_id}_${task.id}_${question.question_id}`);
//               });
//             });
//           }
//         });
//       });
//       const filteredAnswers = {};
//       Object.keys(answers).forEach((key) => {
//         if (validKeys.has(key)) {
//           filteredAnswers[key] = answers[key];
//         } else {
//           console.warn(`Excluding invalid answer key from submission: ${key}`);
//         }
//       });
//       const payload = { answers: filteredAnswers, assignment: parseInt(assignmentId) };
//       console.log('Submitting payload:', JSON.stringify(payload, null, 2));
//       const res = await axios.post(
//         `${API_BASE_URL}/api/api/assignments/${assignmentId}/submit/`,
//         payload,
//         config
//       );
//       console.log('Submission response:', JSON.stringify(res.data, null, 2));
//       toast.success('Assignment submitted successfully');
//       setSubmission(res.data);
//       await axios.post(`${API_BASE_URL}/api/api/assignments/${res.data.submission_id}/ai-evaluate/`, {}, config);
//       toast.success('AI evaluation requested');
//     } catch (error) {
//       console.error('Error submitting assignment:', error);
//       toast.error(`Failed to submit assignment: ${error.response?.data?.detail || error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!assignment) {
//     return <div className="p-6 bg-brandCream min-h-screen">Loading...</div>;
//   }

//   return (
//     <div className="p-6 bg-brandCream min-h-screen">
//       <ToastContainer />
//       <h1 className="text-3xl font-bold text-brandRed mb-6">{assignment.title}</h1>
//       <div className="bg-white p-4 rounded shadow mb-6">
//         {(assignment.json_content.sections || []).map((section) => (
//           <div key={section.section_id} className="mb-4">
//             <h2 className="text-xl font-semibold mb-2">{section.name}</h2>
//             <p className="mb-2">{section.instructions}</p>
//             {(section.tasks || []).map((task) => (
//               <div key={task.id} className={section.name === 'READING' ? 'flex flex-col md:flex-row' : 'mb-4'}>
//                 {section.name === 'READING' && task.content ? (
//                   <>
//                     <div className="md:w-3/5 pr-4 mb-4 md:mb-0">
//                       <h3 className="text-lg font-medium">{task.title}</h3>
//                       <p className="mb-2 whitespace-pre-wrap">{task.content}</p>
//                     </div>
//                     <div className="md:w-2/5">
//                       <p className="mb-2">{task.instructions}</p>
//                       {task.questions && task.questions.map((questionSet) => (
//                         <div key={questionSet.set_id} className="mb-2">
//                           <p className="mb-1">{questionSet.instructions}</p>
//                           <p className="mb-1">{questionSet.optionalText}</p>
//                           {(questionSet.questions || []).map((question) => (
//                             <div key={question.question_id} className="mb-2">
//                               <p className="mb-1">{question.number}. {question.text}</p>
//                               {question.type === 'short_answer' && (
//                                 <textarea
//                                   value={answers[`${section.section_id}_${task.id}_${question.question_id}`] || ''}
//                                   onChange={(e) =>
//                                     handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                   }
//                                   placeholder="Enter your response"
//                                   className="border p-2 w-full h-32"
//                                   disabled={submission && submission.score !== null}
//                                 />
//                               )}
//                               {question.type === 'essay' && (
//                                 <>
//                                   <textarea
//                                     value={answers[`${section.section_id}_${task.id}_${question.question_id}`] || ''}
//                                     onChange={(e) =>
//                                       handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                     }
//                                     placeholder="Write your essay response (250 words)"
//                                     className="border p-2 w-full h-64"
//                                     disabled={submission && submission.score !== null}
//                                   />
//                                   <p className="text-gray-500">Essay responses will be evaluated by AI.</p>
//                                 </>
//                               )}
//                               {question.type === 'multiple_choice' && (
//                                 <div>
//                                   {question.options.map((option, index) => (
//                                     <label key={index} className="block mb-1">
//                                       <input
//                                         type="radio"
//                                         name={`${section.section_id}_${task.id}_${question.question_id}`}
//                                         value={option}
//                                         checked={answers[`${section.section_id}_${task.id}_${question.question_id}`] === option}
//                                         onChange={(e) =>
//                                           handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                         }
//                                         disabled={submission && submission.score !== null}
//                                       />
//                                       {' '}{String.fromCharCode(65 + index)}. {option}
//                                     </label>
//                                   ))}
//                                 </div>
//                               )}
//                               {question.type === 'true_false_not_given' && (
//                                 <div>
//                                   {question.options.map((option, index) => (
//                                     <label key={index} className="block mb-1">
//                                       <input
//                                         type="radio"
//                                         name={`${section.section_id}_${task.id}_${question.question_id}`}
//                                         value={option}
//                                         checked={answers[`${section.section_id}_${task.id}_${question.question_id}`] === option}
//                                         onChange={(e) =>
//                                           handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                         }
//                                         disabled={submission && submission.score !== null}
//                                       />
//                                       {' '}{option}
//                                     </label>
//                                   ))}
//                                 </div>
//                               )}
//                               {question.type === 'table' && (
//                                 <div>
//                                   <div className="flex mb-2">
//                                     {(question.columns || []).map((column, colIndex) => (
//                                       <div key={colIndex} className="flex-1 p-2 font-medium">
//                                         {column.label}
//                                       </div>
//                                     ))}
//                                   </div>
//                                   {(question.table || []).map((row, rowIndex) => (
//                                     <div key={rowIndex} className="flex mb-2">
//                                       <div className="flex-1 p-2">{row.content}</div>
//                                       <div className="flex-1 p-2">{row.question}</div>
//                                       <div className="flex-1 p-2">
//                                         <input
//                                           type="text"
//                                           value={answers[`${section.section_id}_${task.id}_${question.question_id}`]?.[rowIndex] || ''}
//                                           onChange={(e) =>
//                                             handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value, rowIndex)
//                                           }
//                                           placeholder="Enter answer"
//                                           className="border p-2 w-full"
//                                           disabled={submission && submission.score !== null}
//                                         />
//                                       </div>
//                                     </div>
//                                   ))}
//                                 </div>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <h3 className="text-lg font-medium">{task.title}</h3>
//                     <p className="mb-2">{task.instructions}</p>
//                     {section.name === 'LISTENING' && task.audio && (
//                       <audio controls src={task.audio} className="mb-2">
//                         Your browser does not support the audio element.
//                       </audio>
//                     )}
//                     {section.name === 'WRITING' && task.image && (
//                       <img src={task.image} alt="Task image" className="mb-2 max-w-full h-auto" />
//                     )}
//                     {section.name === 'READING' && task.content && (
//                       <p className="mb-2 whitespace-pre-wrap">{task.content}</p>
//                     )}
//                     {section.name === 'SPEAKING' && (
//                       <textarea
//                         value={answers[`${section.section_id}_${task.id}`] || ''}
//                         onChange={(e) =>
//                           handleAnswerChange(`${section.section_id}_${task.id}`, e.target.value)
//                         }
//                         placeholder="Enter your speaking response for AI evaluation"
//                         className="border p-2 w-full h-64"
//                         disabled={submission && submission.score !== null}
//                       />
//                     )}
//                     {task.questions && task.questions.map((questionSet) => (
//                       <div key={questionSet.set_id} className="mb-2">
//                         <p className="mb-1">{questionSet.instructions}</p>
//                         <p className="mb-1">{questionSet.optionalText}</p>
//                         {(questionSet.questions || []).map((question) => (
//                           <div key={question.question_id} className="mb-2">
//                             <p className="mb-1">{question.number}. {question.text}</p>
//                             {question.type === 'short_answer' && (
//                               <textarea
//                                 value={answers[`${section.section_id}_${task.id}_${question.question_id}`] || ''}
//                                 onChange={(e) =>
//                                   handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                 }
//                                 placeholder="Enter your response"
//                                 className="border p-2 w-full h-32"
//                                 disabled={submission && submission.score !== null}
//                               />
//                             )}
//                             {question.type === 'essay' && (
//                               <>
//                                 <textarea
//                                   value={answers[`${section.section_id}_${task.id}_${question.question_id}`] || ''}
//                                   onChange={(e) =>
//                                     handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                   }
//                                   placeholder="Write your essay response (250 words)"
//                                   className="border p-2 w-full h-64"
//                                   disabled={submission && submission.score !== null}
//                                 />
//                                 <p className="text-gray-500">Essay responses will be evaluated by AI.</p>
//                               </>
//                             )}
//                             {question.type === 'multiple_choice' && (
//                               <div>
//                                 {question.options.map((option, index) => (
//                                   <label key={index} className="block mb-1">
//                                     <input
//                                       type="radio"
//                                       name={`${section.section_id}_${task.id}_${question.question_id}`}
//                                       value={option}
//                                       checked={answers[`${section.section_id}_${task.id}_${question.question_id}`] === option}
//                                       onChange={(e) =>
//                                         handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                       }
//                                       disabled={submission && submission.score !== null}
//                                     />
//                                     {' '}{String.fromCharCode(65 + index)}. {option}
//                                   </label>
//                                 ))}
//                               </div>
//                             )}
//                             {question.type === 'true_false_not_given' && (
//                               <div>
//                                 {question.options.map((option, index) => (
//                                   <label key={index} className="block mb-1">
//                                     <input
//                                       type="radio"
//                                       name={`${section.section_id}_${task.id}_${question.question_id}`}
//                                       value={option}
//                                       checked={answers[`${section.section_id}_${task.id}_${question.question_id}`] === option}
//                                       onChange={(e) =>
//                                         handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                       }
//                                       disabled={submission && submission.score !== null}
//                                     />
//                                     {' '}{option}
//                                   </label>
//                                 ))}
//                               </div>
//                             )}
//                             {question.type === 'table' && (
//                               <div>
//                                 <div className="flex mb-2">
//                                   {(question.columns || []).map((column, colIndex) => (
//                                     <div key={colIndex} className="flex-1 p-2 font-medium">
//                                       {column.label}
//                                     </div>
//                                   ))}
//                                 </div>
//                                 {(question.table || []).map((row, rowIndex) => (
//                                   <div key={rowIndex} className="flex mb-2">
//                                     <div className="flex-1 p-2">{row.content}</div>
//                                     <div className="flex-1 p-2">{row.question}</div>
//                                     <div className="flex-1 p-2">
//                                       <input
//                                         type="text"
//                                         value={answers[`${section.section_id}_${task.id}_${question.question_id}`]?.[rowIndex] || ''}
//                                         onChange={(e) =>
//                                           handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value, rowIndex)
//                                         }
//                                         placeholder="Enter answer"
//                                         className="border p-2 w-full"
//                                         disabled={submission && submission.score !== null}
//                                       />
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}
//         <button
//           onClick={handleSubmit}
//           disabled={isSubmitting || (submission && submission.score !== null)}
//           className="bg-brandRed text-white px-4 py-2 rounded disabled:bg-gray-400"
//         >
//           {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
//         </button>
//       </div>
//       {submission && submission.ai_analysis && (
//         <div className="bg-white p-4 rounded shadow mt-6">
//           <h2 className="text-xl font-semibold mb-2 text-brandRed">AI Evaluation</h2>
          
//           {/* Show overall score */}
//           <p className="mb-4 text-gray-700 font-medium">
//             Overall Band Score: <span className="text-black">{submission.score ?? "Not available"}</span>
//           </p>

//           {/* Iterate through AI analysis keys */}
//           {typeof submission.ai_analysis === "string" ? (
//             <pre className="bg-gray-100 text-sm text-gray-800 p-3 rounded whitespace-pre-wrap">
//               {submission.ai_analysis}
//             </pre>
//           ) : (
//             Object.entries(submission.ai_analysis).map(([key, result]) => (
//               <div key={key} className="mb-6 border-t pt-4">
//                 <h3 className="text-lg font-medium text-brandRed mb-1">Task: {key}</h3>
//                 <p className="text-gray-700 mb-2">{result?.analysis || "No analysis provided."}</p>
                
//                 {result?.scores && (
//                   <ul className="list-disc list-inside text-gray-800 mb-2">
//                     {Object.entries(result.scores).map(([criterion, score]) => (
//                       <li key={criterion}>
//                         <strong>{criterion}:</strong> {score}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ))
//           )}

//           {/* Answers (shown below each analysis block or separately) */}
//           {submission.answers && (
//             <div className="mt-6">
//               <h4 className="text-md font-semibold text-brandRed mb-2">Your Answers:</h4>
//               <ul className="list-disc list-inside text-gray-800">
//                 {Object.entries(submission.answers).map(([answerKey, answerValue]) => {
//                   const { sectionId, taskId, questionId } = splitAnswerKey(answerKey);
//                   return (
//                     <li key={answerKey}>
//                       <strong>Question ID:</strong> {questionId}<br />
//                       <strong>Your Response:</strong> {answerValue}
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}

//     </div>
//   );
// };

// export default ViewAssignment;


// 5fifth

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ViewAssignment = () => {
//   const { assignmentId } = useParams();
//   const navigate = useNavigate();
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
//   const token = localStorage.getItem('token');
//   const config = { headers: { Authorization: `Token ${token}` } };

//   const [assignment, setAssignment] = useState(null);
//   const [submission, setSubmission] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const fetchAssignment = async () => {
//     if (!assignmentId || assignmentId === 'undefined') {
//       console.error('Invalid assignment ID:', assignmentId);
//       toast.error('Invalid assignment ID');
//       navigate('/student-dashboard');
//       return;
//     }
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/api/assignments/${assignmentId}/`, config);
//       console.log('fetchAssignment response:', JSON.stringify(res.data, null, 2));
//       setAssignment(res.data);
//       const initialAnswers = {};
//       const validKeys = new Set();
//       (res.data.json_content.sections || []).forEach((section) => {
//         (section.tasks || []).forEach((task) => {
//           if (section.name === 'SPEAKING') {
//             const key = `${section.section_id}_${task.id}`;
//             validKeys.add(key);
//             initialAnswers[key] = '';
//           } else if (task.questions) {
//             task.questions.forEach((questionSet) => {
//               (questionSet.questions || []).forEach((question) => {
//                 const key = `${section.section_id}_${task.id}_${question.question_id}`;
//                 validKeys.add(key);
//                 if (question.type === 'short_answer' || question.type === 'essay') {
//                   initialAnswers[key] = '';
//                 } else if (question.type === 'multiple_choice' || question.type === 'true_false_not_given') {
//                   initialAnswers[key] = '';
//                 } else if (question.type === 'table') {
//                   initialAnswers[key] = Array(question.table?.length || 0).fill('');
//                 }
//               });
//             });
//           }
//         });
//       });
//       setAnswers(initialAnswers);
//     } catch (error) {
//       console.error('Error fetching assignment:', error);
//       toast.error('Failed to load assignment');
//       if (error.response?.status === 404) {
//         navigate('/student-dashboard');
//       }
//     }
//   };

//   const fetchSubmission = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/api/assignments/${assignmentId}/submit/`, config);
//       console.log('fetchSubmission response:', JSON.stringify(res.data, null, 2));
//       setSubmission(res.data);
//       if (res.data.answers) {
//         const validAnswers = {};
//         const validKeys = new Set();
//         (assignment?.json_content.sections || []).forEach((section) => {
//           (section.tasks || []).forEach((task) => {
//             if (section.name === 'SPEAKING') {
//               validKeys.add(`${section.section_id}_${task.id}`);
//             } else if (task.questions) {
//               task.questions.forEach((questionSet) => {
//                 (questionSet.questions || []).forEach((question) => {
//                   validKeys.add(`${section.section_id}_${task.id}_${question.question_id}`);
//                 });
//               });
//             }
//           });
//         });
//         Object.keys(res.data.answers).forEach((key) => {
//           if (validKeys.has(key)) {
//             validAnswers[key] = res.data.answers[key];
//           } else {
//             console.warn(`Ignoring invalid answer key: ${key}`);
//           }
//         });
//         setAnswers(validAnswers);
//       }
//     } catch (error) {
//       console.error('Error fetching submission:', error);
//       if (error.response?.status === 405 || error.response?.status === 404) {
//         console.warn('No submission exists yet or GET not supported.');
//         setSubmission(null);
//       } else {
//         toast.error('Failed to load submission');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchAssignment();
//     fetchSubmission();
//   }, [assignmentId]);

//   const handleAnswerChange = (key, value, index = null) => {
//     setAnswers((prev) => {
//       if (index !== null) {
//         const newArray = [...(prev[key] || [])];
//         newArray[index] = value;
//         return { ...prev, [key]: newArray };
//       }
//       return { ...prev, [key]: value };
//     });
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       const validKeys = new Set();
//       (assignment?.json_content.sections || []).forEach((section) => {
//         (section.tasks || []).forEach((task) => {
//           if (section.name === 'SPEAKING') {
//             validKeys.add(`${section.section_id}_${task.id}`);
//           } else if (task.questions) {
//             task.questions.forEach((questionSet) => {
//               (questionSet.questions || []).forEach((question) => {
//                 validKeys.add(`${section.section_id}_${task.id}_${question.question_id}`);
//               });
//             });
//           }
//         });
//       });
//       const filteredAnswers = {};
//       Object.keys(answers).forEach((key) => {
//         if (validKeys.has(key)) {
//           filteredAnswers[key] = answers[key];
//         } else {
//           console.warn(`Excluding invalid answer key from submission: ${key}`);
//         }
//       });
//       const payload = { answers: filteredAnswers, assignment: parseInt(assignmentId) };
//       console.log('Submitting payload:', JSON.stringify(payload, null, 2));
//       const res = await axios.post(
//         `${API_BASE_URL}/api/api/assignments/${assignmentId}/submit/`,
//         payload,
//         config
//       );
//       console.log('Submission response:', JSON.stringify(res.data, null, 2));
//       toast.success('Assignment submitted successfully');
//       setSubmission(res.data);
//       await axios.post(`${API_BASE_URL}/api/api/assignments/${res.data.submission_id}/ai-evaluate/`, {}, config);
//       toast.success('AI evaluation requested');
//       navigate(`/evaluation/${res.data.submission_id}`);
//     } catch (error) {
//       console.error('Error submitting assignment:', error);
//       toast.error(`Failed to submit assignment: ${error.response?.data?.detail || error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!assignment) {
//     return <div className="p-6 bg-brandCream min-h-screen">Loading...</div>;
//   }

//   return (
//     <div className="p-6 bg-brandCream min-h-screen">
//       <ToastContainer />
//       <h1 className="text-3xl font-bold text-brandRed mb-6">{assignment.title}</h1>
//       <div className="bg-white p-4 rounded shadow mb-6">
//         {(assignment.json_content.sections || []).map((section) => (
//           <div key={section.section_id} className="mb-4">
//             <h2 className="text-xl font-semibold mb-2">{section.name}</h2>
//             <p className="mb-2">{section.instructions}</p>
//             {(section.tasks || []).map((task) => (
//               <div key={task.id} className={section.name === 'READING' ? 'flex flex-col md:flex-row' : 'mb-4'}>
//                 {section.name === 'READING' && task.content ? (
//                   <>
//                     <div className="md:w-3/5 pr-4 mb-4 md:mb-0">
//                       <h3 className="text-lg font-medium">{task.title}</h3>
//                       <p className="mb-2 whitespace-pre-wrap">{task.content}</p>
//                     </div>
//                     <div className="md:w-2/5">
//                       <p className="mb-2">{task.instructions}</p>
//                       {task.questions && task.questions.map((questionSet) => (
//                         <div key={questionSet.set_id} className="mb-2">
//                           <p className="mb-1">{questionSet.instructions}</p>
//                           <p className="mb-1">{questionSet.optionalText}</p>
//                           {(questionSet.questions || []).map((question) => (
//                             <div key={question.question_id} className="mb-2">
//                               <p className="mb-1">{question.number}. {question.text}</p>
//                               {question.type === 'short_answer' && (
//                                 <textarea
//                                   value={answers[`${section.section_id}_${task.id}_${question.question_id}`] || ''}
//                                   onChange={(e) =>
//                                     handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                   }
//                                   placeholder="Enter your response"
//                                   className="border p-2 w-full h-32"
//                                   disabled={submission && submission.score !== null}
//                                 />
//                               )}
//                               {question.type === 'essay' && (
//                                 <>
//                                   <textarea
//                                     value={answers[`${section.section_id}_${task.id}_${question.question_id}`] || ''}
//                                     onChange={(e) =>
//                                       handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                     }
//                                     placeholder="Write your essay response (250 words)"
//                                     className="border p-2 w-full h-64"
//                                     disabled={submission && submission.score !== null}
//                                   />
//                                   <p className="text-gray-500">Essay responses will be evaluated by AI.</p>
//                                 </>
//                               )}
//                               {question.type === 'multiple_choice' && (
//                                 <div>
//                                   {question.options.map((option, index) => (
//                                     <label key={index} className="block mb-1">
//                                       <input
//                                         type="radio"
//                                         name={`${section.section_id}_${task.id}_${question.question_id}`}
//                                         value={option}
//                                         checked={answers[`${section.section_id}_${task.id}_${question.question_id}`] === option}
//                                         onChange={(e) =>
//                                           handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                         }
//                                         disabled={submission && submission.score !== null}
//                                       />
//                                       {' '}{String.fromCharCode(65 + index)}. {option}
//                                     </label>
//                                   ))}
//                                 </div>
//                               )}
//                               {question.type === 'true_false_not_given' && (
//                                 <div>
//                                   {question.options.map((option, index) => (
//                                     <label key={index} className="block mb-1">
//                                       <input
//                                         type="radio"
//                                         name={`${section.section_id}_${task.id}_${question.question_id}`}
//                                         value={option}
//                                         checked={answers[`${section.section_id}_${task.id}_${question.question_id}`] === option}
//                                         onChange={(e) =>
//                                           handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                         }
//                                         disabled={submission && submission.score !== null}
//                                       />
//                                       {' '}{option}
//                                     </label>
//                                   ))}
//                                 </div>
                              
//                               )}
//                               {question.type === 'table' && (
//                                 <div>
//                                   <div className="flex mb-2">
//                                     {(question.columns || []).map((column, colIndex) => (
//                                       <div key={colIndex} className="flex-1 p-2 font-medium">
//                                         {column.label}
//                                       </div>
//                                     ))}
//                                   </div>
//                                   {(question.table || []).map((row, rowIndex) => (
//                                     <div key={rowIndex} className="flex mb-2">
//                                       <div className="flex-1 p-2">{row.content}</div>
//                                       <div className="flex-1 p-2">{row.question}</div>
//                                       <div className="flex-1 p-2">
//                                         <input
//                                           type="text"
//                                           value={answers[`${section.section_id}_${task.id}_${question.question_id}`]?.[rowIndex] || ''}
//                                           onChange={(e) =>
//                                             handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value, rowIndex)
//                                           }
//                                           placeholder="Enter answer"
//                                           className="border p-2 w-full"
//                                           disabled={submission && submission.score !== null}
//                                         />
//                                       </div>
//                                     </div>
//                                   ))}
//                                 </div>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <h3 className="text-lg font-medium">{task.title}</h3>
//                     <p className="mb-2">{task.instructions}</p>
//                     {section.name === 'LISTENING' && task.audio && (
//                       <audio controls src={task.audio} className="mb-2">
//                         Your browser does not support the audio element.
//                       </audio>
//                     )}
//                     {section.name === 'WRITING' && task.image && (
//                       <img src={task.image} alt="Task image" className="mb-2 max-w-full h-auto" />
//                     )}
//                     {section.name === 'READING' && task.content && (
//                       <p className="mb-2 whitespace-pre-wrap">{task.content}</p>
//                     )}
//                     {section.name === 'SPEAKING' && (
//                       <textarea
//                         value={answers[`${section.section_id}_${task.id}`] || ''}
//                         onChange={(e) =>
//                           handleAnswerChange(`${section.section_id}_${task.id}`, e.target.value)
//                         }
//                         placeholder="Enter your speaking response for AI evaluation"
//                         className="border p-2 w-full h-64"
//                         disabled={submission && submission.score !== null}
//                       />
//                     )}
//                     {task.questions && task.questions.map((questionSet) => (
//                       <div key={questionSet.set_id} className="mb-2">
//                         <p className="mb-1">{questionSet.instructions}</p>
//                         <p className="mb-1">{questionSet.optionalText}</p>
//                         {(questionSet.questions || []).map((question) => (
//                           <div key={question.question_id} className="mb-2">
//                             <p className="mb-1">{question.number}. {question.text}</p>
//                             {question.type === 'short_answer' && (
//                               <textarea
//                                 value={answers[`${section.section_id}_${task.id}_${question.question_id}`] || ''}
//                                 onChange={(e) =>
//                                   handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                 }
//                                 placeholder="Enter your response"
//                                 className="border p-2 w-full h-32"
//                                 disabled={submission && submission.score !== null}
//                               />
//                             )}
//                             {question.type === 'essay' && (
//                               <>
//                                 <textarea
//                                   value={answers[`${section.section_id}_${task.id}_${question.question_id}`] || ''}
//                                   onChange={(e) =>
//                                     handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                   }
//                                   placeholder="Write your essay response (250 words)"
//                                   className="border p-2 w-full h-64"
//                                   disabled={submission && submission.score !== null}
//                                 />
//                                 <p className="text-gray-500">Essay responses will be evaluated by AI.</p>
//                               </>
//                             )}
//                             {question.type === 'multiple_choice' && (
//                               <div>
//                                 {question.options.map((option, index) => (
//                                   <label key={index} className="block mb-1">
//                                     <input
//                                       type="radio"
//                                       name={`${section.section_id}_${task.id}_${question.question_id}`}
//                                       value={option}
//                                       checked={answers[`${section.section_id}_${task.id}_${question.question_id}`] === option}
//                                       onChange={(e) =>
//                                         handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                       }
//                                       disabled={submission && submission.score !== null}
//                                     />
//                                     {' '}{String.fromCharCode(65 + index)}. {option}
//                                   </label>
//                                 ))}
//                               </div>
//                             )}
//                             {question.type === 'true_false_not_given' && (
//                               <div>
//                                 {question.options.map((option, index) => (
//                                   <label key={index} className="block mb-1">
//                                     <input
//                                       type="radio"
//                                       name={`${section.section_id}_${task.id}_${question.question_id}`}
//                                       value={option}
//                                       checked={answers[`${section.section_id}_${task.id}_${question.question_id}`] === option}
//                                       onChange={(e) =>
//                                         handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
//                                       }
//                                       disabled={submission && submission.score !== null}
//                                     />
//                                     {' '}{option}
//                                   </label>
//                                 ))}
//                               </div>
//                             )}
//                             {question.type === 'table' && (
//                               <div>
//                                 <div className="flex mb-2">
//                                   {(question.columns || []).map((column, colIndex) => (
//                                     <div key={colIndex} className="flex-1 p-2 font-medium">
//                                       {column.label}
//                                     </div>
//                                   ))}
//                                 </div>
//                                 {(question.table || []).map((row, rowIndex) => (
//                                   <div key={rowIndex} className="flex mb-2">
//                                     <div className="flex-1 p-2">{row.content}</div>
//                                     <div className="flex-1 p-2">{row.question}</div>
//                                     <div className="flex-1 p-2">
//                                       <input
//                                         type="text"
//                                         value={answers[`${section.section_id}_${task.id}_${question.question_id}`]?.[rowIndex] || ''}
//                                         onChange={(e) =>
//                                           handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value, rowIndex)
//                                         }
//                                         placeholder="Enter answer"
//                                         className="border p-2 w-full"
//                                         disabled={submission && submission.score !== null}
//                                       />
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}
//         <button
//           onClick={handleSubmit}
//           disabled={isSubmitting || (submission && submission.score !== null)}
//           className="bg-brandRed text-white px-4 py-2 rounded disabled:bg-gray-400"
//         >
//           {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewAssignment;

// 6Sisxth
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewAssignment = () => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Token ${token}` } };

  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const questionRefs = useRef({});

  const getValidKeysAndInitialAnswers = (jsonContent) => {
    const validKeys = new Set();
    const initialAnswers = {};
    (jsonContent?.sections || []).forEach((section) => {
      (section.tasks || []).forEach((task) => {
        if (section.name === 'SPEAKING') {
          const key = `${section.section_id}_${task.id}`;
          validKeys.add(key);
          initialAnswers[key] = '';
        } else if (task.questions) {
          task.questions.forEach((questionSet) => {
            (questionSet.questions || []).forEach((question) => {
              const key = `${section.section_id}_${task.id}_${question.question_id}`;
              validKeys.add(key);
              if (question.type === 'short_answer' || question.type === 'essay') {
                initialAnswers[key] = '';
              } else if (question.type === 'multiple_choice' || question.type === 'true_false_not_given') {
                initialAnswers[key] = '';
              } else if (question.type === 'table') {
                initialAnswers[key] = Array(question.table?.length || 0).fill('');
              }
            });
          });
        }
      });
    });
    return { validKeys, initialAnswers };
  };

  const fetchAssignment = async () => {
    if (!assignmentId || assignmentId === 'undefined') {
      console.error('Invalid assignment ID:', assignmentId);
      toast.error('Invalid assignment ID');
      navigate('/student-dashboard');
      return;
    }
    try {
      const res = await axios.get(`${API_BASE_URL}/api/api/assignments/${assignmentId}/`, config);
      console.log('fetchAssignment response:', JSON.stringify(res.data, null, 2));
      setAssignment(res.data);
      const { initialAnswers } = getValidKeysAndInitialAnswers(res.data.json_content);
      setAnswers(initialAnswers);
    } catch (error) {
      console.error('Error fetching assignment:', error);
      toast.error('Failed to load assignment');
      if (error.response?.status === 404) {
        navigate('/student-dashboard');
      }
    }
  };

  const fetchSubmission = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/api/assignments/${assignmentId}/submit/`, config);
      console.log('fetchSubmission response:', JSON.stringify(res.data, null, 2));
      setSubmission(res.data);
      if (res.data.answers && assignment) {
        const { validKeys } = getValidKeysAndInitialAnswers(assignment.json_content);
        const validAnswers = {};
        Object.keys(res.data.answers).forEach((key) => {
          if (validKeys.has(key)) {
            validAnswers[key] = res.data.answers[key];
          } else {
            console.warn(`Ignoring invalid answer key: ${key}. Expected keys: ${Array.from(validKeys).join(', ')}`);
          }
        });
        setAnswers((prev) => ({ ...prev, ...validAnswers }));
        if (res.data.submission_id && res.data.score !== null) {
          await axios.post(`${API_BASE_URL}/api/evaluation/${res.data.submission_id}/`, {}, config);
          toast.success('AI evaluation retrieved');
          navigate(`/evaluation/${res.data.submission_id}`);
        }
      }
    } catch (error) {
      console.error('Error fetching submission:', error);
      if (error.response?.status === 405 || error.response?.status === 404) {
        console.warn('No submission exists yet or GET not supported.');
        setSubmission(null);
      } else {
        toast.error('Failed to load submission');
      }
    }
  };

  const handleResetSubmission = async () => {
    setIsSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/api/assignments/${assignmentId}/reset/`, {}, config);
      toast.success('Submission reset successfully');
      setSubmission(null);
      setAnswers(getValidKeysAndInitialAnswers(assignment?.json_content || {}).initialAnswers);
      await fetchAssignment();
    } catch (error) {
      console.error('Error resetting submission:', error);
      toast.error(`Failed to reset submission: ${error.response?.data?.detail || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchAssignment();
      await fetchSubmission();
    };
    loadData();
  }, [assignmentId]);

  const handleAnswerChange = (key, value, index = null) => {
    setAnswers((prev) => {
      if (index !== null) {
        const newArray = [...(prev[key] || [])];
        newArray[index] = value;
        return { ...prev, [key]: newArray };
      }
      return { ...prev, [key]: value };
    });
  };

  const splitAnswerKey = (key) => {
    const parts = key.split('_');
    if (parts.length >= 3) {
      return {
        sectionId: parts[0],
        taskId: parts[1],
        questionId: parts.slice(2).join('_'),
      };
    }
    return { sectionId: '', taskId: '', questionId: '' };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { validKeys } = getValidKeysAndInitialAnswers(assignment?.json_content || {});
      const filteredAnswers = {};
      Object.keys(answers).forEach((key) => {
        if (validKeys.has(key)) {
          filteredAnswers[key] = answers[key];
        } else {
          console.warn(`Excluding invalid answer key from submission: ${key}`);
        }
      });
      const payload = { answers: filteredAnswers, assignment: parseInt(assignmentId) };
      console.log('Submitting payload:', JSON.stringify(payload, null, 2));
      const res = await axios.post(
        `${API_BASE_URL}/api/api/assignments/${assignmentId}/submit/`,
        payload,
        config
      );
      console.log('Submission response:', JSON.stringify(res.data, null, 2));
      toast.success('Assignment submitted successfully');
      setSubmission(res.data);
      if (res.data.submission_id) {
        // await axios.post(`${API_BASE_URL}/api/evaluations/${res.data.submission_id}/`, {}, config);
        await axios.post(`${API_BASE_URL}/api/api/assignments/${res.data.submission_id}/ai-evaluate/`, {}, config);
        toast.success('AI evaluation requested');
        // navigate(`/evaluation/${res.data.submission_id}`);
      } else {
        throw new Error('Submission ID not found in response');
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
      toast.error(`Failed to submit assignment: ${error.response?.data?.detail || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToQuestion = (questionId) => {
    const element = questionRefs.current[questionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getReadingQuestions = () => {
    const questions = [];
    (assignment?.json_content.sections || []).forEach((section) => {
      if (section.name === 'READING') {
        (section.tasks || []).forEach((task) => {
          (task.questions || []).forEach((questionSet) => {
            (questionSet.questions || []).forEach((question) => {
              const key = `${section.section_id}_${task.id}_${question.question_id}`;
              questions.push({
                number: question.number,
                questionId: key,
                answered: answers[key] && answers[key] !== '' && (!Array.isArray(answers[key]) || answers[key].some((a) => a !== '')),
              });
            });
          });
        });
      }
    });
    return questions;
  };

  if (!assignment) {
    return <div className="p-6 bg-brandCream min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-6 bg-brandCream min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-brandRed mb-6">{assignment.title}</h1>
      <div className="bg-white p-4 rounded shadow mb-6">
        {(assignment.json_content.sections || []).map((section) => (
          <div key={section.section_id} className="mb-4">
            <h2 className="text-xl font-semibold mb-2">{section.name}</h2>
            <p className="mb-2">{section.instructions}</p>
            {(section.tasks || []).map((task) => (
              <div key={task.id} className={section.name === 'READING' ? 'flex flex-col md:flex-row' : 'mb-4'}>
                {section.name === 'READING' && task.content ? (
                  <>
                    <div className="md:w-3/5 pr-4 mb-4 md:mb-0 max-h-[70vh] overflow-y-auto">
                      <h3 className="text-lg font-medium">{task.title}</h3>
                      <p className="mb-2 whitespace-pre-wrap">{task.content}</p>
                    </div>
                    <div className="md:w-2/5 max-h-[70vh] overflow-y-auto">
                      <p className="mb-2">{task.instructions}</p>
                      {task.questions &&
                        task.questions.map((questionSet) => (
                          <div key={questionSet.set_id} className="mb-2">
                            <p className="mb-1">{questionSet.instructions}</p>
                            <p className="mb-1">{questionSet.optionalText}</p>
                            {(questionSet.questions || []).map((question) => (
                              <div
                                key={question.question_id}
                                ref={(el) => (questionRefs.current[`${section.section_id}_${task.id}_${question.question_id}`] = el)}
                                className="mb-2"
                              >
                                <p className="mb-1">
                                  {question.number}. {question.text}
                                </p>
                                {question.type === 'short_answer' && (
                                  <textarea
                                    value={answers[`${section.section_id}_${task.id}_${question.question_id}`] || ''}
                                    onChange={(e) =>
                                      handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
                                    }
                                    placeholder="Enter your response"
                                    className="border p-2 w-full h-32"
                                    disabled={submission && submission.score !== null}
                                  />
                                )}
                                {question.type === 'essay' && (
                                  <>
                                    <textarea
                                      value={answers[`${section.section_id}_${task.id}_${question.question_id}`] || ''}
                                      onChange={(e) =>
                                        handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
                                      }
                                      placeholder="Write your essay response (250 words)"
                                      className="border p-2 w-full h-64"
                                      disabled={submission && submission.score !== null}
                                    />
                                    <p className="text-gray-500">Essay responses will be evaluated by AI.</p>
                                  </>
                                )}
                                {question.type === 'multiple_choice' && (
                                  <div>
                                    {(question.options || []).map((option, index) => (
                                      <label key={index} className="block mb-1">
                                        <input
                                          type="radio"
                                          name={`${section.section_id}_${task.id}_${question.question_id}`}
                                          value={option}
                                          checked={answers[`${section.section_id}_${task.id}_${question.question_id}`] === option}
                                          onChange={(e) =>
                                            handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
                                          }
                                          disabled={submission && submission.score !== null}
                                        />
                                        {' '}
                                        {String.fromCharCode(65 + index)}. {option}
                                      </label>
                                    ))}
                                  </div>
                                )}
                                {question.type === 'true_false_not_given' && (
                                  <div>
                                    {(question.options || []).map((option, index) => (
                                      <label key={index} className="block mb-1">
                                        <input
                                          type="radio"
                                          name={`${section.section_id}_${task.id}_${question.question_id}`}
                                          value={option}
                                          checked={answers[`${section.section_id}_${task.id}_${question.question_id}`] === option}
                                          onChange={(e) =>
                                            handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
                                          }
                                          disabled={submission && submission.score !== null}
                                        />
                                        {' '}
                                        {option}
                                      </label>
                                    ))}
                                  </div>
                                )}
                                {question.type === 'table' && (
                                  <div>
                                    <div className="flex mb-2">
                                      {(question.columns || []).map((column, colIndex) => (
                                        <div key={colIndex} className="flex-1 p-2 font-medium">
                                          {column.label}
                                        </div>
                                      ))}
                                    </div>
                                    {(question.table || []).map((row, rowIndex) => (
                                      <div key={rowIndex} className="flex mb-2">
                                        <div className="flex-1 p-2">{row.content}</div>
                                        <div className="flex-1 p-2">{row.question}</div>
                                        <div className="flex-1 p-2">
                                          <input
                                            type="text"
                                            value={
                                              answers[`${section.section_id}_${task.id}_${question.question_id}`]?.[rowIndex] || ''
                                            }
                                            onChange={(e) =>
                                              handleAnswerChange(
                                                `${section.section_id}_${task.id}_${question.question_id}`,
                                                e.target.value,
                                                rowIndex
                                              )
                                            }
                                            placeholder="Enter answer"
                                            className="border p-2 w-full"
                                            disabled={submission && submission.score !== null}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      {section.name === 'READING' && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {getReadingQuestions().map((q) => (
                            <button
                              key={q.questionId}
                              onClick={() => scrollToQuestion(q.questionId)}
                              className={`px-3 py-1 rounded ${
                                q.answered ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                              } hover:bg-gray-300`}
                            >
                              {q.number}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-medium">{task.title}</h3>
                    <p className="mb-2">{task.instructions}</p>
                    {section.name === 'LISTENING' && task.audio && (
                      <audio controls src={task.audio} className="mb-2">
                        Your browser does not support the audio element.
                      </audio>
                    )}
                    {section.name === 'WRITING' && task.image && (
                      <img src={task.image} alt="Task image" className="mb-2 max-w-full h-auto" />
                    )}
                    {section.name === 'READING' && task.content && (
                      <p className="mb-2 whitespace-pre-wrap">{task.content}</p>
                    )}
                    {section.name === 'SPEAKING' && (
                      <textarea
                        value={answers[`${section.section_id}_${task.id}`] || ''}
                        onChange={(e) => handleAnswerChange(`${section.section_id}_${task.id}`, e.target.value)}
                        placeholder="Enter your speaking response for AI evaluation"
                        className="border p-2 w-full h-64"
                        disabled={submission && submission.score !== null}
                      />
                    )}
                    {task.questions &&
                      task.questions.map((questionSet) => (
                        <div key={questionSet.set_id} className="mb-2">
                          <p className="mb-1">{questionSet.instructions}</p>
                          <p className="mb-1">{questionSet.optionalText}</p>
                          {(questionSet.questions || []).map((question) => (
                            <div
                              key={question.question_id}
                              ref={(el) => (questionRefs.current[`${section.section_id}_${task.id}_${question.question_id}`] = el)}
                              className="mb-2"
                            >
                              <p className="mb-1">
                                {question.number}. {question.text}
                              </p>
                              {question.type === 'short_answer' && (
                                <textarea
                                  value={answers[`${section.section_id}_${task.id}_${question.question_id}`] || ''}
                                  onChange={(e) =>
                                    handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
                                  }
                                  placeholder="Enter your response"
                                  className="border p-2 w-full h-32"
                                  disabled={submission && submission.score !== null}
                                />
                              )}
                              {question.type === 'essay' && (
                                <>
                                  <textarea
                                    value={answers[`${section.section_id}_${task.id}_${question.question_id}`] || ''}
                                    onChange={(e) =>
                                      handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
                                    }
                                    placeholder="Write your essay response (250 words)"
                                    className="border p-2 w-full h-64"
                                    disabled={submission && submission.score !== null}
                                  />
                                  <p className="text-gray-500">Essay responses will be evaluated by AI.</p>
                                </>
                              )}
                              {question.type === 'multiple_choice' && (
                                <div>
                                  {(question.options || []).map((option, index) => (
                                    <label key={index} className="block mb-1">
                                      <input
                                        type="radio"
                                        name={`${section.section_id}_${task.id}_${question.question_id}`}
                                        value={option}
                                        checked={answers[`${section.section_id}_${task.id}_${question.question_id}`] === option}
                                        onChange={(e) =>
                                          handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
                                        }
                                        disabled={submission && submission.score !== null}
                                      />
                                      {' '}
                                      {String.fromCharCode(65 + index)}. {option}
                                    </label>
                                  ))}
                                </div>
                              )}
                              {question.type === 'true_false_not_given' && (
                                <div>
                                  {(question.options || []).map((option, index) => (
                                    <label key={index} className="block mb-1">
                                      <input
                                        type="radio"
                                        name={`${section.section_id}_${task.id}_${question.question_id}`}
                                        value={option}
                                        checked={answers[`${section.section_id}_${task.id}_${question.question_id}`] === option}
                                        onChange={(e) =>
                                          handleAnswerChange(`${section.section_id}_${task.id}_${question.question_id}`, e.target.value)
                                        }
                                        disabled={submission && submission.score !== null}
                                      />
                                      {' '}
                                      {option}
                                    </label>
                                  ))}
                                </div>
                              )}
                              {question.type === 'table' && (
                                <div>
                                  <div className="flex mb-2">
                                    {(question.columns || []).map((column, colIndex) => (
                                      <div key={colIndex} className="flex-1 p-2 font-medium">
                                        {column.label}
                                      </div>
                                    ))}
                                  </div>
                                  {(question.table || []).map((row, rowIndex) => (
                                    <div key={rowIndex} className="flex mb-2">
                                      <div className="flex-1 p-2">{row.content}</div>
                                      <div className="flex-1 p-2">{row.question}</div>
                                      <div className="flex-1 p-2">
                                        <input
                                          type="text"
                                          value={
                                            answers[`${section.section_id}_${task.id}_${question.question_id}`]?.[rowIndex] || ''
                                          }
                                          onChange={(e) =>
                                            handleAnswerChange(
                                              `${section.section_id}_${task.id}_${question.question_id}`,
                                              e.target.value,
                                              rowIndex
                                            )
                                          }
                                          placeholder="Enter answer"
                                          className="border p-2 w-full"
                                          disabled={submission && submission.score !== null}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || (submission && submission.score !== null)}
            className="bg-brandRed text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
          </button>
          {submission && submission.score !== null && (
            <button
              onClick={handleResetSubmission}
              disabled={isSubmitting}
              className="bg-gray-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              {isSubmitting ? 'Resetting...' : 'Reset Submission'}
            </button>
          )}
        </div>
      </div>
      {submission && submission.ai_analysis && (
        <div className="bg-white p-4 rounded shadow mt-6">
          <h2 className="text-xl font-semibold mb-2 text-brandRed">Evaluation</h2>
          <p className="mb-4 text-gray-700 font-medium">
            Overall Band Score: <span className="text-black">{submission.score ?? 'Not available'}</span>
          </p>

          {submission.ai_analysis.analytics && (
            <div className="mb-4">
              <h3 className="text-lg font-medium text-brandRed">Analytics</h3>
              <p>Total Questions: {submission.ai_analysis.analytics.total_questions}</p>
              <p>Correct Answers: {submission.ai_analysis.analytics.correct_answers}</p>
              <p>Accuracy: {submission.ai_analysis.analytics.accuracy_percentage}%</p>
              <p>Score: {submission.ai_analysis.analytics.score}</p>
            </div>
          )}

          {submission.ai_analysis.overall_feedback && (
            <div className="mb-4">
              <h3 className="text-lg font-medium text-brandRed">Overall Feedback</h3>
              <p className="whitespace-pre-line">{submission.ai_analysis.overall_feedback}</p>
            </div>
          )}

          {submission.ai_analysis.results && (
            <div>
              <h3 className="text-lg font-medium text-brandRed mb-2">Question-by-Question Results</h3>
              {submission.ai_analysis.results.map((result) => {
                const isSubjective = result.correct_answer === null;

                return (
                  <div key={result.question_id} className="mb-6 border-t pt-4">
                    <p>
                      <strong>Question ID:</strong> {splitAnswerKey(result.question_id).questionId}
                    </p>
                    <p>
                      <strong>Status:</strong> {result.status}
                    </p>
                    <p>
                      <strong>Submitted Answer:</strong>{' '}
                      {Array.isArray(result.submitted_answer)
                        ? result.submitted_answer.join(', ')
                        : result.submitted_answer}
                    </p>

                    {!isSubjective && (
                      <>
                        <p>
                          <strong>Correct Answer:</strong> {result.correct_answer}
                        </p>
                        {result.feedback && result.feedback !== 'Correct' && (
                          <p>
                            <strong>Feedback:</strong>{' '}
                            {typeof result.feedback === 'object'
                              ? JSON.stringify(result.feedback)
                              : result.feedback}
                          </p>
                        )}
                      </>
                    )}

                    {isSubjective && result.scores && (
                      <>
                        <div>
                          <p><strong>Scores:</strong></p>
                          <ul className="list-disc list-inside">
                            <li>Task Achievement: {result.scores.task_achievement}</li>
                            <li>Coherence and Cohesion: {result.scores.coherence_cohesion}</li>
                            <li>Lexical Resource: {result.scores.lexical_resource}</li>
                            <li>Grammatical Range: {result.scores.grammatical_range}</li>
                            <li>Overall: {result.scores.overall}</li>
                          </ul>
                        </div>
                        <p>
                          <strong>Feedback:</strong>{' '}
                          {typeof result.feedback === 'object'
                            ? JSON.stringify(result.feedback)
                            : result.feedback}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default ViewAssignment;