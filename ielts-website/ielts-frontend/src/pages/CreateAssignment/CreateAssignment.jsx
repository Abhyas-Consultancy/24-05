// // import React, { useState, useEffect } from 'react';
// // import { v4 as uuidv4 } from 'uuid';

// // const questionTypes = [
// //   'multiple_choice',
// //   'true_false_not_given',
// //   'paragraph_matching',
// //   'matching',
// //   'note_completion',
// //   'table_completion',
// //   'form_completion',
// //   'sentence_completion',
// //   'short_answer',
// //   'diagram_labeling',
// //   'essay',
// //   'open_ended',
// //   'task_card'
// // ];

// // const CreateAssignment = () => {
// //   // Initialize assignment from localStorage or default
// //   const [assignment, setAssignment] = useState(() => {
// //     const saved = localStorage.getItem('assignmentDraft');
// //     const initialState = saved ? JSON.parse(saved) : {
// //       test_id: uuidv4(),
// //       title: '',
// //       sections: []
// //     };
// //     console.log('Initial assignment state:', initialState);
// //     return initialState;
// //   });
// //   const [currentSection, setCurrentSection] = useState('');
// //   const [currentSubsection, setCurrentSubsection] = useState({
// //     type: '',
// //     title: '',
// //     instructions: '',
// //     content: '',
// //     image: null
// //   });
// //   const [currentQuestionSet, setCurrentQuestionSet] = useState({
// //     set_id: uuidv4(),
// //     instructions: '',
// //     questions: []
// //   });
// //   const [currentQuestion, setCurrentQuestion] = useState({
// //     type: '',
// //     text: '',
// //     options: [''],
// //     matching_pairs: [{ key: '', value: '' }],
// //     table_rows: [{ text: '', answer: '' }],
// //     answer: '',
// //     answer_format: ''
// //   });
// //   const [error, setError] = useState('');

// //   // Save to localStorage on assignment change
// //   useEffect(() => {
// //     console.log('Saving assignment to localStorage:', assignment);
// //     localStorage.setItem('assignmentDraft', JSON.stringify(assignment));
// //   }, [assignment]);

// //   const clearDraft = () => {
// //     localStorage.removeItem('assignmentDraft');
// //     const newAssignment = {
// //       test_id: uuidv4(),
// //       title: '',
// //       sections: []
// //     };
// //     setAssignment(newAssignment);
// //     setCurrentSection('');
// //     setCurrentSubsection({ type: '', title: '', instructions: '', content: '', image: null });
// //     setCurrentQuestionSet({ set_id: uuidv4(), instructions: '', questions: [] });
// //     setCurrentQuestion({ type: '', text: '', options: [''], matching_pairs: [{ key: '', value: '' }], table_rows: [{ text: '', answer: '' }], answer: '', answer_format: '' });
// //     setError('');
// //     console.log('Draft cleared, new assignment:', newAssignment);
// //   };

// //   const addSection = () => {
// //     if (!currentSection) {
// //       setError('Please select a section type (e.g., LISTENING, READING).');
// //       console.log('Section addition failed: Missing section type');
// //       return;
// //     }
// //     const newSection = {
// //       section_id: uuidv4(),
// //       name: currentSection.toUpperCase(),
// //       instructions: '',
// //       tasks: currentSection === 'WRITING' ? [] : [],
// //       passages: currentSection === 'READING' ? [] : [],
// //       questions: currentSection === 'LISTENING' ? [] : [],
// //       parts: currentSection === 'SPEAKING' ? [] : []
// //     };
// //     setAssignment(prev => {
// //       const newAssignment = {
// //         ...prev,
// //         sections: [...prev.sections, newSection]
// //       };
// //       console.log('Added section:', newSection);
// //       console.log('Updated assignment:', newAssignment);
// //       return newAssignment;
// //     });
// //     setCurrentSection('');
// //     setError('');
// //   };

// //   const addSubsection = () => {
// //     console.log('Attempting to add subsection:', { currentSubsection, currentQuestionSet, currentSection });
// //     if (!currentSection) {
// //       setError('Please select a section (e.g., LISTENING, READING) before adding a subsection.');
// //       console.log('Subsection addition failed: No section selected');
// //       return;
// //     }
// //     if (!currentSubsection.type) {
// //       setError('Please select a subsection type (e.g., section, passage, task, part).');
// //       console.log('Subsection addition failed: Missing subsection type');
// //       return;
// //     }
// //     if (!currentSubsection.title) {
// //       setError('Please provide a subsection title (e.g., Section 1, READING PASSAGE 1).');
// //       console.log('Subsection addition failed: Missing subsection title');
// //       return;
// //     }
// //     if (!currentQuestionSet.questions.length && currentSubsection.type !== 'task') {
// //       setError('Please add at least one question to the question set (except for Writing tasks).');
// //       console.log('Subsection addition failed: No questions in question set');
// //       return;
// //     }
// //     const newSubsection = {
// //       id: uuidv4(),
// //       type: currentSubsection.type,
// //       title: currentSubsection.title,
// //       instructions: currentSubsection.instructions,
// //       content: currentSubsection.type === 'passage' ? currentSubsection.content : '',
// //       image: currentSubsection.image,
// //       questions: currentSubsection.type === 'task' ? [] : [{ ...currentQuestionSet, set_id: uuidv4() }]
// //     };
// //     setAssignment(prev => {
// //       const sectionExists = prev.sections.some(section => section.name === currentSection.toUpperCase());
// //       let newSections;
// //       if (!sectionExists) {
// //         console.log('No matching section found, creating new section:', currentSection);
// //         const newSection = {
// //           section_id: uuidv4(),
// //           name: currentSection.toUpperCase(),
// //           instructions: '',
// //           tasks: currentSection.toUpperCase() === 'WRITING' ? [newSubsection] : [],
// //           passages: currentSection.toUpperCase() === 'READING' ? [newSubsection] : [],
// //           questions: currentSection.toUpperCase() === 'LISTENING' ? [newSubsection] : [],
// //           parts: currentSection.toUpperCase() === 'SPEAKING' ? [newSubsection] : []
// //         };
// //         newSections = [...prev.sections, newSection];
// //       } else {
// //         newSections = prev.sections.map(section => {
// //           if (section.name === currentSection.toUpperCase()) {
// //             const updatedSection = { ...section };
// //             if (section.name === 'WRITING') {
// //               updatedSection.tasks = [...(section.tasks || []), newSubsection];
// //             } else if (section.name === 'READING') {
// //               updatedSection.passages = [...(section.passages || []), newSubsection];
// //             } else if (section.name === 'LISTENING') {
// //               updatedSection.questions = [...(section.questions || []), newSubsection];
// //             } else if (section.name === 'SPEAKING') {
// //               updatedSection.parts = [...(section.parts || []), newSubsection];
// //             }
// //             return updatedSection;
// //           }
// //           return section;
// //         });
// //       }
// //       const newAssignment = { ...prev, sections: newSections };
// //       console.log('Added subsection:', newSubsection);
// //       console.log('Updated assignment:', newAssignment);
// //       return newAssignment;
// //     });
// //     setCurrentSubsection({ type: '', title: '', instructions: '', content: '', image: null });
// //     setCurrentQuestionSet({ set_id: uuidv4(), instructions: '', questions: [] });
// //     setCurrentQuestion({ type: '', text: '', options: [''], matching_pairs: [{ key: '', value: '' }], table_rows: [{ text: '', answer: '' }], answer: '', answer_format: '' });
// //     setError('');
// //   };

// //   const addQuestion = () => {
// //     if (!currentQuestion.type) {
// //       setError('Please select a question type.');
// //       console.log('Question addition failed: Missing question type');
// //       return;
// //     }
// //     if (!currentQuestion.text) {
// //       setError('Please provide question text.');
// //       console.log('Question addition failed: Missing question text');
// //       return;
// //     }
// //     if (['multiple_choice', 'true_false_not_given', 'paragraph_matching'].includes(currentQuestion.type) && currentQuestion.options.every(opt => !opt.trim())) {
// //       setError('Please provide at least one valid option for this question type.');
// //       console.log('Question addition failed: No valid options');
// //       return;
// //     }
// //     if (currentQuestion.type === 'matching' && currentQuestion.matching_pairs.every(pair => !pair.key.trim() || !pair.value.trim())) {
// //       setError('Please provide at least one valid key-value pair for matching questions.');
// //       console.log('Question addition failed: No valid matching pairs');
// //       return;
// //     }
// //     if (currentQuestion.type === 'table_completion' && currentQuestion.table_rows.every(row => !row.text.trim())) {
// //       setError('Please provide at least one valid table row.');
// //       console.log('Question addition failed: No valid table rows');
// //       return;
// //     }
// //     const newQuestion = {
// //       question_id: uuidv4(),
// //       number: currentQuestionSet.questions.length + 1,
// //       text: currentQuestion.text,
// //       type: currentQuestion.type,
// //       options: currentQuestion.options.filter(opt => opt.trim()),
// //       matching_pairs: currentQuestion.matching_pairs.filter(pair => pair.key.trim() && pair.value.trim()),
// //       table_rows: currentQuestion.table_rows.filter(row => row.text.trim()),
// //       answer_format: currentQuestion.answer_format,
// //       answer: ['essay', 'short_answer', 'open_ended', 'task_card'].includes(currentQuestion.type) ? null : currentQuestion.answer
// //     };
// //     setCurrentQuestionSet(prev => {
// //       const newQuestionSet = {
// //         ...prev,
// //         questions: [...prev.questions, newQuestion]
// //       };
// //       console.log('Added question:', newQuestion);
// //       console.log('Updated question set:', newQuestionSet);
// //       return newQuestionSet;
// //     });
// //     setCurrentQuestion({ type: '', text: '', options: [''], matching_pairs: [{ key: '', value: '' }], table_rows: [{ text: '', answer: '' }], answer: '', answer_format: '' });
// //     setError('');
// //   };

// //   const handleImageUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         setCurrentSubsection(prev => {
// //           const newSubsection = { ...prev, image: reader.result };
// //           console.log('Image uploaded:', newSubsection.image);
// //           return newSubsection;
// //         });
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handleSubmit = () => {
// //     if (!assignment.title) {
// //       setError('Please provide a test title.');
// //       console.log('JSON generation failed: Missing test title');
// //       return;
// //     }
// //     if (!assignment.sections.length) {
// //       setError('Please add at least one section.');
// //       console.log('JSON generation failed: No sections');
// //       return;
// //     }
// //     const jsonOutput = JSON.stringify(assignment, null, 2);
// //     console.log('Generating JSON:', jsonOutput);
// //     const blob = new Blob([jsonOutput], { type: 'application/json' });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = `${assignment.title.replace(/\s+/g, '_') || 'assignment'}.json`;
// //     a.click();
// //     URL.revokeObjectURL(url);
// //     setError('');
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-6">
// //       <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
// //         <h1 className="text-2xl font-bold mb-4">Create IELTS Assignment</h1>
// //         {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

// //         {/* Test Title */}
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium">Test Title</label>
// //           <input
// //             type="text"
// //             className="w-full p-2 border rounded"
// //             value={assignment.title}
// //             onChange={(e) => setAssignment(prev => {
// //               const newAssignment = { ...prev, title: e.target.value };
// //               console.log('Updated title:', newAssignment);
// //               return newAssignment;
// //             })}
// //             placeholder="e.g., IELTS Test 3 (12 July)"
// //           />
// //         </div>

// //         {/* Add Section */}
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium">Add Section</label>
// //           <select
// //             className="w-full p-2 border rounded"
// //             value={currentSection}
// //             onChange={(e) => setCurrentSection(e.target.value)}
// //           >
// //             <option value="">Select Section</option>
// //             <option value="LISTENING">Listening</option>
// //             <option value="READING">Reading</option>
// //             <option value="WRITING">Writing</option>
// //             <option value="SPEAKING">Speaking</option>
// //           </select>
// //           <button
// //             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //             onClick={addSection}
// //           >
// //             Add Section
// //           </button>
// //         </div>

// //         {/* Add Subsection */}
// //         {currentSection && (
// //           <div className="mb-4 border-t pt-4">
// //             <h2 className="text-xl font-semibold mb-2">Add Subsection for {currentSection}</h2>
// //             <label className="block text-sm font-medium">Subsection Type</label>
// //             <select
// //               className="w-full p-2 border rounded"
// //               value={currentSubsection.type}
// //               onChange={(e) => setCurrentSubsection(prev => ({ ...prev, type: e.target.value }))}
// //             >
// //               <option value="">Select Type</option>
// //               {currentSection === 'LISTENING' && <option value="section">Section</option>}
// //               {currentSection === 'READING' && <option value="passage">Passage</option>}
// //               {currentSection === 'WRITING' && <option value="task">Task</option>}
// //               {currentSection === 'SPEAKING' && <option value="part">Part</option>}
// //             </select>
// //             <label className="block text-sm font-medium mt-2">Subsection Title</label>
// //             <input
// //               type="text"
// //               className="w-full p-2 border rounded"
// //               value={currentSubsection.title}
// //               onChange={(e) => setCurrentSubsection(prev => ({ ...prev, title: e.target.value }))}
// //               placeholder="e.g., Section 1, READING PASSAGE 1, WRITING TASK 1"
// //             />
// //             <label className="block text-sm font-medium mt-2">Instructions</label>
// //             <textarea
// //               className="w-full p-2 border rounded"
// //               value={currentSubsection.instructions}
// //               onChange={(e) => setCurrentSubsection(prev => ({ ...prev, instructions: e.target.value }))}
// //               placeholder="e.g., You should spend about 20 minutes on Questions 1-13..."
// //               rows="4"
// //             />
// //             {currentSubsection.type === 'passage' && (
// //               <>
// //                 <label className="block text-sm font-medium mt-2">Passage Content</label>
// //                 <textarea
// //                   className="w-full p-2 border rounded"
// //                   value={currentSubsection.content}
// //                   onChange={(e) => setCurrentSubsection(prev => ({ ...prev, content: e.target.value }))}
// //                   placeholder="Paste passage content here (e.g., A. In the late 1990s...)"
// //                   rows="6"
// //                 />
// //               </>
// //             )}
// //             {(currentSubsection.type === 'task' || currentSubsection.type === 'passage') && (
// //               <>
// //                 <label className="block text-sm font-medium mt-2">Upload Image</label>
// //                 <input
// //                   type="file"
// //                   accept="image/*"
// //                   className="w-full p-2 border rounded"
// //                   onChange={handleImageUpload}
// //                 />
// //                 {currentSubsection.image && (
// //                   <img src={currentSubsection.image} alt="Uploaded" className="mt-2 max-w-xs" />
// //                 )}
// //               </>
// //             )}

// //             {/* Question Set Instructions */}
// //             {currentSubsection.type !== 'task' && (
// //               <>
// //                 <label className="block text-sm font-medium mt-2">Question Set Instructions</label>
// //                 <textarea
// //                   className="w-full p-2 border rounded"
// //                   value={currentQuestionSet.instructions}
// //                   onChange={(e) => setCurrentQuestionSet(prev => ({ ...prev, instructions: e.target.value }))}
// //                   placeholder="e.g., Questions 1-4\nComplete the notes below.\nWrite NO MORE THAN THREE WORDS for each answer."
// //                   rows="4"
// //                 />
// //               </>
// //             )}

// //             {/* Add Question */}
// //             {currentSubsection.type !== 'task' && (
// //               <>
// //                 <label className="block text-sm font-medium mt-2">Add Question</label>
// //                 <select
// //                   className="w-full p-2 border rounded"
// //                   value={currentQuestion.type}
// //                   onChange={(e) => setCurrentQuestion(prev => ({ ...prev, type: e.target.value }))}
// //                 >
// //                   <option value="">Select Question Type</option>
// //                   {questionTypes.map(type => (
// //                     <option key={type} value={type}>{type.replace('_', ' ')}</option>
// //                   ))}
// //                 </select>
// //                 <label className="block text-sm font-medium mt-2">Question Text</label>
// //                 <input
// //                   type="text"
// //                   className="w-full p-2 border rounded"
// //                   value={currentQuestion.text}
// //                   onChange={(e) => setCurrentQuestion(prev => ({ ...prev, text: e.target.value }))}
// //                   placeholder="e.g., 1. Facilities available"
// //                 />
// //                 {['multiple_choice', 'true_false_not_given', 'paragraph_matching'].includes(currentQuestion.type) && (
// //                   <>
// //                     <label className="block text-sm font-medium mt-2">Options</label>
// //                     {currentQuestion.options.map((option, index) => (
// //                       <div key={index} className="flex mb-2">
// //                         <input
// //                           type="text"
// //                           className="w-full p-2 border rounded"
// //                           value={option}
// //                           onChange={(e) => {
// //                             const newOptions = [...currentQuestion.options];
// //                             newOptions[index] = e.target.value;
// //                             setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
// //                           }}
// //                           placeholder={`Option ${index + 1} (e.g., A. Swimming)`}
// //                         />
// //                         <button
// //                           className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
// //                           onClick={() => {
// //                             const newOptions = currentQuestion.options.filter((_, i) => i !== index);
// //                             setCurrentQuestion(prev => ({ ...prev, options: newOptions.length ? newOptions : [''] }));
// //                           }}
// //                         >
// //                           Remove
// //                         </button>
// //                       </div>
// //                     ))}
// //                     <button
// //                       className="bg-green-500 text-white px-2 py-1 rounded"
// //                       onClick={() => setCurrentQuestion(prev => ({ ...prev, options: [...prev.options, ''] }))}
// //                     >
// //                       Add Option
// //                     </button>
// //                   </>
// //                 )}
// //                 {currentQuestion.type === 'matching' && (
// //                   <>
// //                     <label className="block text-sm font-medium mt-2">Matching Pairs</label>
// //                     {currentQuestion.matching_pairs.map((pair, index) => (
// //                       <div key={index} className="flex mb-2">
// //                         <input
// //                           type="text"
// //                           className="w-1/2 p-2 border rounded mr-2"
// //                           value={pair.key}
// //                           onChange={(e) => {
// //                             const newPairs = [...currentQuestion.matching_pairs];
// //                             newPairs[index] = { ...newPairs[index], key: e.target.value };
// //                             setCurrentQuestion(prev => ({ ...prev, matching_pairs: newPairs }));
// //                           }}
// //                           placeholder={`Key ${index + 1} (e.g., box office)`}
// //                         />
// //                         <input
// //                           type="text"
// //                           className="w-1/2 p-2 border rounded"
// //                           value={pair.value}
// //                           onChange={(e) => {
// //                             const newPairs = [...currentQuestion.matching_pairs];
// //                             newPairs[index] = { ...newPairs[index], value: e.target.value };
// //                             setCurrentQuestion(prev => ({ ...prev, matching_pairs: newPairs }));
// //                           }}
// //                           placeholder={`Value ${index + 1} (e.g., doubled in number)`}
// //                         />
// //                         <button
// //                           className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
// //                           onClick={() => {
// //                             const newPairs = currentQuestion.matching_pairs.filter((_, i) => i !== index);
// //                             setCurrentQuestion(prev => ({ ...prev, matching_pairs: newPairs.length ? newPairs : [{ key: '', value: '' }] }));
// //                           }}
// //                         >
// //                           Remove
// //                         </button>
// //                       </div>
// //                     ))}
// //                     <button
// //                       className="bg-green-500 text-white px-2 py-1 rounded"
// //                       onClick={() => setCurrentQuestion(prev => ({ ...prev, matching_pairs: [...prev.matching_pairs, { key: '', value: '' }] }))}
// //                     >
// //                       Add Pair
// //                     </button>
// //                     <div className="mt-2">
// //                       <h4 className="text-sm font-medium">Matching Pairs Preview</h4>
// //                       <table className="w-full border">
// //                         <thead>
// //                           <tr><th className="border p-2">Key</th><th className="border p-2">Value</th></tr>
// //                         </thead>
// //                         <tbody>
// //                           {currentQuestion.matching_pairs.map((pair, index) => (
// //                             <tr key={index}>
// //                               <td className="border p-2">{pair.key || 'Empty'}</td>
// //                               <td className="border p-2">{pair.value || 'Empty'}</td>
// //                             </tr>
// //                           ))}
// //                         </tbody>
// //                       </table>
// //                     </div>
// //                   </>
// //                 )}
// //                 {currentQuestion.type === 'table_completion' && (
// //                   <>
// //                     <label className="block text-sm font-medium mt-2">Table Rows</label>
// //                     {currentQuestion.table_rows.map((row, index) => (
// //                       <div key={index} className="flex mb-2">
// //                         <input
// //                           type="text"
// //                           className="w-1/2 p-2 border rounded mr-2"
// //                           value={row.text}
// //                           onChange={(e) => {
// //                             const newRows = [...currentQuestion.table_rows];
// //                             newRows[index] = { ...newRows[index], text: e.target.value };
// //                             setCurrentQuestion(prev => ({ ...prev, table_rows: newRows }));
// //                           }}
// //                           placeholder={`Row ${index + 1} Text (e.g., Membership type)`}
// //                         />
// //                         <input
// //                           type="text"
// //                           className="w-1/2 p-2 border rounded"
// //                           value={row.answer}
// //                           onChange={(e) => {
// //                             const newRows = [...currentQuestion.table_rows];
// //                             newRows[index] = { ...newRows[index], answer: e.target.value };
// //                             setCurrentQuestion(prev => ({ ...prev, table_rows: newRows }));
// //                           }}
// //                           placeholder={`Row ${index + 1} Answer (e.g., Gold membership)`}
// //                         />
// //                         <button
// //                           className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
// //                           onClick={() => {
// //                             const newRows = currentQuestion.table_rows.filter((_, i) => i !== index);
// //                             setCurrentQuestion(prev => ({ ...prev, table_rows: newRows.length ? newRows : [{ text: '', answer: '' }] }));
// //                           }}
// //                         >
// //                           Remove
// //                         </button>
// //                       </div>
// //                     ))}
// //                     <button
// //                       className="bg-green-500 text-white px-2 py-1 rounded"
// //                       onClick={() => setCurrentQuestion(prev => ({ ...prev, table_rows: [...prev.table_rows, { text: '', answer: '' }] }))}
// //                     >
// //                       Add Row
// //                     </button>
// //                     <div className="mt-2">
// //                       <h4 className="text-sm font-medium">Table Preview</h4>
// //                       <table className="w-full border">
// //                         <thead>
// //                           <tr><th className="border p-2">Question</th><th className="border p-2">Answer</th></tr>
// //                         </thead>
// //                         <tbody>
// //                           {currentQuestion.table_rows.map((row, index) => (
// //                             <tr key={index}>
// //                               <td className="border p-2">{row.text || 'Empty'}</td>
// //                               <td className="border p-2">{row.answer || 'Empty'}</td>
// //                             </tr>
// //                           ))}
// //                         </tbody>
// //                       </table>
// //                     </div>
// //                   </>
// //                 )}
// //                 {currentQuestion.type && !['essay', 'short_answer', 'open_ended', 'task_card'].includes(currentQuestion.type) && (
// //                   <>
// //                     <label className="block text-sm font-medium mt-2">Correct Answer</label>
// //                     <input
// //                       type="text"
// //                       className="w-full p-2 border rounded"
// //                       value={currentQuestion.answer}
// //                       onChange={(e) => setCurrentQuestion(prev => ({ ...prev, answer: e.target.value }))}
// //                       placeholder="e.g., Tennis, TRUE, A"
// //                     />
// //                   </>
// //                 )}
// //                 <label className="block text-sm font-medium mt-2">Answer Format</label>
// //                 <input
// //                   type="text"
// //                   className="w-full p-2 border rounded"
// //                   value={currentQuestion.answer_format}
// //                   onChange={(e) => setCurrentQuestion(prev => ({ ...prev, answer_format: e.target.value }))}
// //                   placeholder="e.g., NO MORE THAN THREE WORDS"
// //                 />
// //                 <div className="mt-2 flex space-x-2">
// //                   <button
// //                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //                     onClick={addQuestion}
// //                   >
// //                     Add Question
// //                   </button>
// //                   <button
// //                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //                     onClick={addSubsection}
// //                   >
// //                     Add Subsection
// //                   </button>
// //                 </div>
// //               </>
// //             )}
// //             {currentSubsection.type === 'task' && (
// //               <button
// //                 className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //                 onClick={addSubsection}
// //               >
// //                 Add Subsection
// //               </button>
// //             )}
// //             {/* Current Question Set Preview */}
// //             {currentSubsection.type !== 'task' && currentQuestionSet.questions.length > 0 && (
// //               <div className="mt-4">
// //                 <h3 className="text-lg font-semibold mb-2">Current Question Set Preview</h3>
// //                 <pre className="bg-gray-200 p-4 rounded overflow-auto">{JSON.stringify(currentQuestionSet, null, 2)}</pre>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* JSON Preview */}
// //         <div className="mt-6">
// //           <h2 className="text-xl font-semibold mb-2">JSON Preview</h2>
// //           <pre className="bg-gray-200 p-4 rounded overflow-auto">{JSON.stringify(assignment, null, 2)}</pre>
// //         </div>

// //         {/* Clear Draft and Submit */}
// //         <div className="mt-4 flex space-x-4">
// //           <button
// //             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
// //             onClick={clearDraft}
// //           >
// //             Clear Draft
// //           </button>
// //           <button
// //             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
// //             onClick={handleSubmit}
// //           >
// //             Generate JSON
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateAssignment;



// // 2.Second

// import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// const questionTypes = [
//   'multiple_choice',
//   'true_false_not_given',
//   'paragraph_matching',
//   'matching',
//   'note_completion',
//   'table_completion',
//   'form_completion',
//   'sentence_completion',
//   'short_answer',
//   'diagram_labeling',
//   'essay',
//   'open_ended',
//   'task_card'
// ];

// const CreateAssignment = () => {
//   // Initialize assignment from localStorage or default
//   const [assignment, setAssignment] = useState(() => {
//     const saved = localStorage.getItem('assignmentDraft');
//     let initialState;
//     try {
//       initialState = saved ? JSON.parse(saved) : {
//         test_id: uuidv4(),
//         title: '',
//         sections: []
//       };
//       // Validate initial state
//       if (!initialState.test_id || !Array.isArray(initialState.sections)) {
//         throw new Error('Invalid localStorage data');
//       }
//     } catch (error) {
//       console.error('Error parsing localStorage data:', error);
//       initialState = {
//         test_id: uuidv4(),
//         title: '',
//         sections: []
//       };
//     }
//     console.log('Initial assignment state:', initialState);
//     return initialState;
//   });
//   const [currentSection, setCurrentSection] = useState('');
//   const [currentSubsection, setCurrentSubsection] = useState({
//     type: '',
//     title: '',
//     instructions: '',
//     content: '',
//     image: null
//   });
//   const [currentQuestionSet, setCurrentQuestionSet] = useState({
//     set_id: uuidv4(),
//     instructions: '',
//     questions: []
//   });
//   const [currentQuestion, setCurrentQuestion] = useState({
//     type: '',
//     text: '',
//     options: [''],
//     matching_pairs: [{ key: '', value: '' }],
//     table_rows: [{ text: '', answer: '' }],
//     answer: '',
//     answer_format: ''
//   });
//   const [error, setError] = useState('');

//   // Save to localStorage on assignment change
//   useEffect(() => {
//     console.log('Saving assignment to localStorage:', assignment);
//     try {
//       localStorage.setItem('assignmentDraft', JSON.stringify(assignment));
//     } catch (error) {
//       console.error('Error saving to localStorage:', error);
//       setError('Failed to save draft to local storage.');
//     }
//   }, [assignment]);

//   const clearDraft = () => {
//     localStorage.removeItem('assignmentDraft');
//     const newAssignment = {
//       test_id: uuidv4(),
//       title: '',
//       sections: []
//     };
//     setAssignment(newAssignment);
//     setCurrentSection('');
//     setCurrentSubsection({ type: '', title: '', instructions: '', content: '', image: null });
//     setCurrentQuestionSet({ set_id: uuidv4(), instructions: '', questions: [] });
//     setCurrentQuestion({ type: '', text: '', options: [''], matching_pairs: [{ key: '', value: '' }], table_rows: [{ text: '', answer: '' }], answer: '', answer_format: '' });
//     setError('');
//     console.log('Draft cleared, new assignment:', newAssignment);
//   };

//   const addSection = () => {
//     if (!currentSection) {
//       setError('Please select a section type (e.g., LISTENING, READING).');
//       console.log('Section addition failed: Missing section type');
//       return;
//     }
//     // Check for existing section to prevent duplicates
//     setAssignment(prev => {
//       if (prev.sections.some(section => section.name === currentSection.toUpperCase())) {
//         setError(`Section ${currentSection} already exists. Please select another section or add subsections to the existing one.`);
//         console.log('Section addition failed: Duplicate section', currentSection);
//         return prev;
//       }
//       const newSection = {
//         section_id: uuidv4(),
//         name: currentSection.toUpperCase(),
//         instructions: '',
//         tasks: currentSection === 'WRITING' ? [] : [],
//         passages: currentSection === 'READING' ? [] : [],
//         questions: currentSection === 'LISTENING' ? [] : [],
//         parts: currentSection === 'SPEAKING' ? [] : []
//       };
//       const newAssignment = {
//         ...prev,
//         sections: [...prev.sections, newSection]
//       };
//       console.log('Added section:', newSection);
//       console.log('Updated assignment:', newAssignment);
//       return newAssignment;
//     });
//     setCurrentSection('');
//     setError('');
//   };

//   const addSubsection = () => {
//     console.log('Attempting to add subsection:', { currentSubsection, currentQuestionSet, currentSection });
//     if (!currentSection) {
//       setError('Please select a section (e.g., LISTENING, READING) before adding a subsection.');
//       console.log('Subsection addition failed: No section selected');
//       return;
//     }
//     if (!currentSubsection.type) {
//       setError('Please select a subsection type (e.g., section, passage, task, part).');
//       console.log('Subsection addition failed: Missing subsection type');
//       return;
//     }
//     if (!currentSubsection.title) {
//       setError('Please provide a subsection title (e.g., Section 1, READING PASSAGE 1).');
//       console.log('Subsection addition failed: Missing subsection title');
//       return;
//     }
//     if (!currentQuestionSet.questions.length && currentSubsection.type !== 'task') {
//       setError('Please add at least one question to the question set (except for Writing tasks).');
//       console.log('Subsection addition failed: No questions in question set');
//       return;
//     }
//     const newSubsection = {
//       id: uuidv4(),
//       type: currentSubsection.type,
//       title: currentSubsection.title,
//       instructions: currentSubsection.instructions,
//       content: currentSubsection.type === 'passage' ? currentSubsection.content : '',
//       image: currentSubsection.image,
//       questions: currentSubsection.type === 'task' ? [] : [{ ...currentQuestionSet, set_id: uuidv4() }]
//     };
//     setAssignment(prev => {
//       const sectionExists = prev.sections.some(section => section.name === currentSection.toUpperCase());
//       let newSections;
//       if (!sectionExists) {
//         console.log('No matching section found, creating new section:', currentSection);
//         const newSection = {
//           section_id: uuidv4(),
//           name: currentSection.toUpperCase(),
//           instructions: '',
//           tasks: currentSection.toUpperCase() === 'WRITING' ? [newSubsection] : [],
//           passages: currentSection.toUpperCase() === 'READING' ? [newSubsection] : [],
//           questions: currentSection.toUpperCase() === 'LISTENING' ? [newSubsection] : [],
//           parts: currentSection.toUpperCase() === 'SPEAKING' ? [newSubsection] : []
//         };
//         newSections = [...prev.sections, newSection];
//       } else {
//         newSections = prev.sections.map(section => {
//           if (section.name === currentSection.toUpperCase()) {
//             const updatedSection = { ...section };
//             if (section.name === 'WRITING') {
//               updatedSection.tasks = [...(section.tasks || []), newSubsection];
//             } else if (section.name === 'READING') {
//               updatedSection.passages = [...(section.passages || []), newSubsection];
//             } else if (section.name === 'LISTENING') {
//               updatedSection.questions = [...(section.questions || []), newSubsection];
//             } else if (section.name === 'SPEAKING') {
//               updatedSection.parts = [...(section.parts || []), newSubsection];
//             }
//             return updatedSection;
//           }
//           return section;
//         });
//       }
//       const newAssignment = { ...prev, sections: newSections };
//       console.log('Added subsection:', newSubsection);
//       console.log('Updated assignment:', newAssignment);
//       return newAssignment;
//     });
//     setCurrentSubsection({ type: '', title: '', instructions: '', content: '', image: null });
//     setCurrentQuestionSet({ set_id: uuidv4(), instructions: '', questions: [] });
//     setCurrentQuestion({ type: '', text: '', options: [''], matching_pairs: [{ key: '', value: '' }], table_rows: [{ text: '', answer: '' }], answer: '', answer_format: '' });
//     setError('');
//   };

//   const addQuestion = () => {
//     if (!currentQuestion.type) {
//       setError('Please select a question type.');
//       console.log('Question addition failed: Missing question type');
//       return;
//     }
//     if (!currentQuestion.text) {
//       setError('Please provide question text.');
//       console.log('Question addition failed: Missing question text');
//       return;
//     }
//     if (['multiple_choice', 'true_false_not_given', 'paragraph_matching'].includes(currentQuestion.type) && currentQuestion.options.every(opt => !opt.trim())) {
//       setError('Please provide at least one valid option for this question type.');
//       console.log('Question addition failed: No valid options');
//       return;
//     }
//     if (currentQuestion.type === 'matching' && currentQuestion.matching_pairs.every(pair => !pair.key.trim() || !pair.value.trim())) {
//       setError('Please provide at least one valid key-value pair for matching questions.');
//       console.log('Question addition failed: No valid matching pairs');
//       return;
//     }
//     if (currentQuestion.type === 'table_completion' && currentQuestion.table_rows.every(row => !row.text.trim())) {
//       setError('Please provide at least one valid table row.');
//       console.log('Question addition failed: No valid table rows');
//       return;
//     }
//     const newQuestion = {
//       question_id: uuidv4(),
//       number: currentQuestionSet.questions.length + 1,
//       text: currentQuestion.text,
//       type: currentQuestion.type,
//       options: currentQuestion.options.filter(opt => opt.trim()),
//       matching_pairs: currentQuestion.matching_pairs.filter(pair => pair.key.trim() && pair.value.trim()),
//       table_rows: currentQuestion.table_rows.filter(row => row.text.trim()),
//       answer_format: currentQuestion.answer_format,
//       answer: ['essay', 'short_answer', 'open_ended', 'task_card'].includes(currentQuestion.type) ? null : currentQuestion.answer
//     };
//     setCurrentQuestionSet(prev => {
//       const newQuestionSet = {
//         ...prev,
//         questions: [...prev.questions, newQuestion]
//       };
//       console.log('Added question:', newQuestion);
//       console.log('Updated question set:', newQuestionSet);
//       return newQuestionSet;
//     });
//     setCurrentQuestion({ type: '', text: '', options: [''], matching_pairs: [{ key: '', value: '' }], table_rows: [{ text: '', answer: '' }], answer: '', answer_format: '' });
//     setError('');
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setCurrentSubsection(prev => {
//           const newSubsection = { ...prev, image: reader.result };
//           console.log('Image uploaded:', newSubsection.image);
//           return newSubsection;
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = () => {
//     if (!assignment.title) {
//       setError('Please provide a test title.');
//       console.log('JSON generation failed: Missing test title');
//       return;
//     }
//     if (!assignment.sections.length) {
//       setError('Please add at least one section.');
//       console.log('JSON generation failed: No sections');
//       return;
//     }
//     const jsonOutput = JSON.stringify(assignment, null, 2);
//     console.log('Generating JSON:', jsonOutput);
//     const blob = new Blob([jsonOutput], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${assignment.title.replace(/\s+/g, '_') || 'assignment'}.json`;
//     a.click();
//     URL.revokeObjectURL(url);
//     setError('');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
//         <h1 className="text-2xl font-bold mb-4">Create IELTS Assignment</h1>
//         {error && <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>}

//         {/* Test Title */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Test Title</label>
//           <input
//             type="text"
//             className={`w-full p-2 border rounded ${!assignment.title && error ? 'border-red-500' : ''}`}
//             value={assignment.title}
//             onChange={(e) => setAssignment(prev => {
//               const newAssignment = { ...prev, title: e.target.value };
//               console.log('Updated title:', newAssignment);
//               return newAssignment;
//             })}
//             placeholder="e.g., IELTS Test 3 (12 July)"
//           />
//         </div>

//         {/* Add Section */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium">Add Section</label>
//           <select
//             className="w-full p-2 border rounded"
//             value={currentSection}
//             onChange={(e) => setCurrentSection(e.target.value)}
//           >
//             <option value="">Select Section</option>
//             <option value="LISTENING">Listening</option>
//             <option value="READING">Reading</option>
//             <option value="WRITING">Writing</option>
//             <option value="SPEAKING">Speaking</option>
//           </select>
//           <button
//             className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={addSection}
//           >
//             Add Section
//           </button>
//         </div>

//         {/* Add Subsection */}
//         {currentSection && (
//           <div className="mb-4 border-t pt-4">
//             <h2 className="text-xl font-semibold mb-2">Add Subsection for {currentSection}</h2>
//             <label className="block text-sm font-medium">Subsection Type</label>
//             <select
//               className={`w-full p-2 border rounded ${!currentSubsection.type && error ? 'border-red-500' : ''}`}
//               value={currentSubsection.type}
//               onChange={(e) => setCurrentSubsection(prev => ({ ...prev, type: e.target.value }))}
//             >
//               <option value="">Select Type</option>
//               {currentSection === 'LISTENING' && <option value="section">Section</option>}
//               {currentSection === 'READING' && <option value="passage">Passage</option>}
//               {currentSection === 'WRITING' && <option value="task">Task</option>}
//               {currentSection === 'SPEAKING' && <option value="part">Part</option>}
//             </select>
//             <label className="block text-sm font-medium mt-2">Subsection Title</label>
//             <input
//               type="text"
//               className={`w-full p-2 border rounded ${!currentSubsection.title && error ? 'border-red-500' : ''}`}
//               value={currentSubsection.title}
//               onChange={(e) => setCurrentSubsection(prev => ({ ...prev, title: e.target.value }))}
//               placeholder="e.g., Section 1, READING PASSAGE 1, WRITING TASK 1"
//             />
//             <label className="block text-sm font-medium mt-2">Instructions</label>
//             <textarea
//               className="w-full p-2 border rounded"
//               value={currentSubsection.instructions}
//               onChange={(e) => setCurrentSubsection(prev => ({ ...prev, instructions: e.target.value }))}
//               placeholder="e.g., You should spend about 20 minutes on Questions 1-13..."
//               rows="4"
//             />
//             {currentSubsection.type === 'passage' && (
//               <>
//                 <label className="block text-sm font-medium mt-2">Passage Content</label>
//                 <textarea
//                   className="w-full p-2 border rounded"
//                   value={currentSubsection.content}
//                   onChange={(e) => setCurrentSubsection(prev => ({ ...prev, content: e.target.value }))}
//                   placeholder="Paste passage content here (e.g., A. In the late 1990s...)"
//                   rows="6"
//                 />
//               </>
//             )}
//             {(currentSubsection.type === 'task' || currentSubsection.type === 'passage') && (
//               <>
//                 <label className="block text-sm font-medium mt-2">Upload Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="w-full p-2 border rounded"
//                   onChange={handleImageUpload}
//                 />
//                 {currentSubsection.image && (
//                   <img src={currentSubsection.image} alt="Uploaded" className="mt-2 max-w-xs" />
//                 )}
//               </>
//             )}

//             {/* Question Set Instructions */}
//             {currentSubsection.type !== 'task' && (
//               <>
//                 <label className="block text-sm font-medium mt-2">Question Set Instructions</label>
//                 <textarea
//                   className="w-full p-2 border rounded"
//                   value={currentQuestionSet.instructions}
//                   onChange={(e) => setCurrentQuestionSet(prev => ({ ...prev, instructions: e.target.value }))}
//                   placeholder="e.g., Questions 1-4\nComplete the notes below.\nWrite NO MORE THAN THREE WORDS for each answer."
//                   rows="4"
//                 />
//               </>
//             )}

//             {/* Add Question */}
//             {currentSubsection.type !== 'task' && (
//               <>
//                 <label className="block text-sm font-medium mt-2">Add Question</label>
//                 <select
//                   className={`w-full p-2 border rounded ${!currentQuestion.type && error ? 'border-red-500' : ''}`}
//                   value={currentQuestion.type}
//                   onChange={(e) => setCurrentQuestion(prev => ({ ...prev, type: e.target.value }))}
//                 >
//                   <option value="">Select Question Type</option>
//                   {questionTypes.map(type => (
//                     <option key={type} value={type}>{type.replace('_', ' ')}</option>
//                   ))}
//                 </select>
//                 <label className="block text-sm font-medium mt-2">Question Text</label>
//                 <input
//                   type="text"
//                   className={`w-full p-2 border rounded ${!currentQuestion.text && error ? 'border-red-500' : ''}`}
//                   value={currentQuestion.text}
//                   onChange={(e) => setCurrentQuestion(prev => ({ ...prev, text: e.target.value }))}
//                   placeholder="e.g., 1. Facilities available"
//                 />
//                 {['multiple_choice', 'true_false_not_given', 'paragraph_matching'].includes(currentQuestion.type) && (
//                   <>
//                     <label className="block text-sm font-medium mt-2">Options</label>
//                     {currentQuestion.options.map((option, index) => (
//                       <div key={index} className="flex mb-2">
//                         <input
//                           type="text"
//                           className="w-full p-2 border rounded"
//                           value={option}
//                           onChange={(e) => {
//                             const newOptions = [...currentQuestion.options];
//                             newOptions[index] = e.target.value;
//                             setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
//                           }}
//                           placeholder={`Option ${index + 1} (e.g., A. Swimming)`}
//                         />
//                         <button
//                           className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
//                           onClick={() => {
//                             const newOptions = currentQuestion.options.filter((_, i) => i !== index);
//                             setCurrentQuestion(prev => ({ ...prev, options: newOptions.length ? newOptions : [''] }));
//                           }}
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       className="bg-green-500 text-white px-2 py-1 rounded"
//                       onClick={() => setCurrentQuestion(prev => ({ ...prev, options: [...prev.options, ''] }))}
//                     >
//                       Add Option
//                     </button>
//                   </>
//                 )}
//                 {currentQuestion.type === 'matching' && (
//                   <>
//                     <label className="block text-sm font-medium mt-2">Matching Pairs</label>
//                     {currentQuestion.matching_pairs.map((pair, index) => (
//                       <div key={index} className="flex mb-2">
//                         <input
//                           type="text"
//                           className="w-1/2 p-2 border rounded mr-2"
//                           value={pair.key}
//                           onChange={(e) => {
//                             const newPairs = [...currentQuestion.matching_pairs];
//                             newPairs[index] = { ...newPairs[index], key: e.target.value };
//                             setCurrentQuestion(prev => ({ ...prev, matching_pairs: newPairs }));
//                           }}
//                           placeholder={`Key ${index + 1} (e.g., box office)`}
//                         />
//                         <input
//                           type="text"
//                           className="w-1/2 p-2 border rounded"
//                           value={pair.value}
//                           onChange={(e) => {
//                             const newPairs = [...currentQuestion.matching_pairs];
//                             newPairs[index] = { ...newPairs[index], value: e.target.value };
//                             setCurrentQuestion(prev => ({ ...prev, matching_pairs: newPairs }));
//                           }}
//                           placeholder={`Value ${index + 1} (e.g., doubled in number)`}
//                         />
//                         <button
//                           className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
//                           onClick={() => {
//                             const newPairs = currentQuestion.matching_pairs.filter((_, i) => i !== index);
//                             setCurrentQuestion(prev => ({ ...prev, matching_pairs: newPairs.length ? newPairs : [{ key: '', value: '' }] }));
//                           }}
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       className="bg-green-500 text-white px-2 py-1 rounded"
//                       onClick={() => setCurrentQuestion(prev => ({ ...prev, matching_pairs: [...prev.matching_pairs, { key: '', value: '' }] }))}
//                     >
//                       Add Pair
//                     </button>
//                     <div className="mt-2">
//                       <h4 className="text-sm font-medium">Matching Pairs Preview</h4>
//                       <table className="w-full border">
//                         <thead>
//                           <tr><th className="border p-2">Key</th><th className="border p-2">Value</th></tr>
//                         </thead>
//                         <tbody>
//                           {currentQuestion.matching_pairs.map((pair, index) => (
//                             <tr key={index}>
//                               <td className="border p-2">{pair.key || 'Empty'}</td>
//                               <td className="border p-2">{pair.value || 'Empty'}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </>
//                 )}
//                 {currentQuestion.type === 'table_completion' && (
//                   <>
//                     <label className="block text-sm font-medium mt-2">Table Rows</label>
//                     {currentQuestion.table_rows.map((row, index) => (
//                       <div key={index} className="flex mb-2">
//                         <input
//                           type="text"
//                           className="w-1/2 p-2 border rounded mr-2"
//                           value={row.text}
//                           onChange={(e) => {
//                             const newRows = [...currentQuestion.table_rows];
//                             newRows[index] = { ...newRows[index], text: e.target.value };
//                             setCurrentQuestion(prev => ({ ...prev, table_rows: newRows }));
//                           }}
//                           placeholder={`Row ${index + 1} Text (e.g., Membership type)`}
//                         />
//                         <input
//                           type="text"
//                           className="w-1/2 p-2 border rounded"
//                           value={row.answer}
//                           onChange={(e) => {
//                             const newRows = [...currentQuestion.table_rows];
//                             newRows[index] = { ...newRows[index], answer: e.target.value };
//                             setCurrentQuestion(prev => ({ ...prev, table_rows: newRows }));
//                           }}
//                           placeholder={`Row ${index + 1} Answer (e.g., Gold membership)`}
//                         />
//                         <button
//                           className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
//                           onClick={() => {
//                             const newRows = currentQuestion.table_rows.filter((_, i) => i !== index);
//                             setCurrentQuestion(prev => ({ ...prev, table_rows: newRows.length ? newRows : [{ text: '', answer: '' }] }));
//                           }}
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                     <button
//                       className="bg-green-500 text-white px-2 py-1 rounded"
//                       onClick={() => setCurrentQuestion(prev => ({ ...prev, table_rows: [...prev.table_rows, { text: '', answer: '' }] }))}
//                     >
//                       Add Row
//                     </button>
//                     <div className="mt-2">
//                       <h4 className="text-sm font-medium">Table Preview</h4>
//                       <table className="w-full border">
//                         <thead>
//                           <tr><th className="border p-2">Question</th><th className="border p-2">Answer</th></tr>
//                         </thead>
//                         <tbody>
//                           {currentQuestion.table_rows.map((row, index) => (
//                             <tr key={index}>
//                               <td className="border p-2">{row.text || 'Empty'}</td>
//                               <td className="border p-2">{row.answer || 'Empty'}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   </>
//                 )}
//                 {currentQuestion.type && !['essay', 'short_answer', 'open_ended', 'task_card'].includes(currentQuestion.type) && (
//                   <>
//                     <label className="block text-sm font-medium mt-2">Correct Answer</label>
//                     <input
//                       type="text"
//                       className="w-full p-2 border rounded"
//                       value={currentQuestion.answer}
//                       onChange={(e) => setCurrentQuestion(prev => ({ ...prev, answer: e.target.value }))}
//                       placeholder="e.g., Tennis, TRUE, A"
//                     />
//                   </>
//                 )}
//                 <label className="block text-sm font-medium mt-2">Answer Format</label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded"
//                   value={currentQuestion.answer_format}
//                   onChange={(e) => setCurrentQuestion(prev => ({ ...prev, answer_format: e.target.value }))}
//                   placeholder="e.g., NO MORE THAN THREE WORDS"
//                 />
//                 <div className="mt-2 flex space-x-2">
//                   <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     onClick={addQuestion}
//                   >
//                     Add Question
//                   </button>
//                   <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     onClick={addSubsection}
//                     disabled={!currentSection || !currentSubsection.type}
//                   >
//                     Add Subsection
//                   </button>
//                 </div>
//               </>
//             )}
//             {currentSubsection.type === 'task' && (
//               <button
//                 className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 onClick={addSubsection}
//                 disabled={!currentSection || !currentSubsection.type}
//               >
//                 Add Subsection
//               </button>
//             )}
//             {/* Current Question Set Preview */}
//             {currentSubsection.type !== 'task' && currentQuestionSet.questions.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold mb-2">Current Question Set Preview</h3>
//                 <pre className="bg-gray-200 p-4 rounded overflow-auto">{JSON.stringify(currentQuestionSet, null, 2)}</pre>
//               </div>
//             )}
//           </div>
//         )}

//         {/* JSON Preview */}
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-2">JSON Preview</h2>
//           <pre className="bg-gray-200 p-4 rounded overflow-auto">{JSON.stringify(assignment, null, 2)}</pre>
//         </div>

//         {/* Clear Draft and Submit */}
//         <div className="mt-4 flex space-x-4">
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             onClick={clearDraft}
//           >
//             Clear Draft
//           </button>
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             onClick={handleSubmit}
//           >
//             Generate JSON
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateAssignment;


// 3Third/ without json preview

// import React, { useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// const CreateAssignment = () => {
//   const [assignment, setAssignment] = useState({
//     test_id: uuidv4(),
//     title: '',
//     sections: [],
//   });

//   // Add a new section (Writing, Reading, Listening)
//   const addSection = (type) => {
//     setAssignment({
//       ...assignment,
//       sections: [
//         ...assignment.sections,
//         {
//           section_id: uuidv4(),
//           name: type.toUpperCase(),
//           instructions: '',
//           tasks: [],
//           passages: [],
//         },
//       ],
//     });
//   };

//   // Add a task to a Writing section
//   const addTask = (sectionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks.push({
//       id: uuidv4(),
//       type: 'task',
//       title: '',
//       instructions: '',
//       image: '',
//       answer: '',
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a passage to a Reading or Listening section
//   const addPassage = (sectionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].passages.push({
//       id: uuidv4(),
//       title: '',
//       instructions: '',
//       content: '',
//       optionalText: '',
//       questions: [],
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a question set to a passage
//   const addQuestionSet = (sectionIndex, passageIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].passages[passageIndex].questions.push({
//       set_id: uuidv4(),
//       instructions: '',
//       optionalText: '',
//       questions: [],
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a question to a question set
//   const addQuestion = (sectionIndex, passageIndex, setIndex, type) => {
//     const newSections = [...assignment.sections];
//     const question = {
//       question_id: uuidv4(),
//       number: '',
//       text: '',
//       type,
//       answer: type === 'multiple_choice' ? [] : '',
//     };
//     if (type === 'multiple_choice') {
//       question.options = ['', '', '', ''];
//     } else if (type === 'true_false_not_given') {
//       question.options = ['TRUE', 'FALSE', 'NOT GIVEN'];
//     } else if (type === 'table') {
//       question.table = [{ label: '', value: '' }];
//     }
//     newSections[sectionIndex].passages[passageIndex].questions[setIndex].questions.push(question);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a row to a table question
//   const addTableRow = (sectionIndex, passageIndex, setIndex, questionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].passages[passageIndex].questions[setIndex].questions[
//       questionIndex
//     ].table.push({ label: '', value: '' });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Update a field in the nested structure
//   const updateField = (path, value) => {
//     const newSections = [...assignment.sections];
//     const keys = path.split('.');
//     let current = newSections;
//     for (let i = 0; i < keys.length - 1; i++) {
//       current = current[keys[i]];
//     }
//     current[keys[keys.length - 1]] = value;
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Handle image upload for tasks
//   const handleImageUpload = (sectionIndex, taskIndex, e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const newSections = [...assignment.sections];
//       newSections[sectionIndex].tasks[taskIndex].image = reader.result;
//       setAssignment({ ...assignment, sections: newSections });
//     };
//     if (file) reader.readAsDataURL(file);
//   };

//   // Save the assignment as JSON and optionally send to backend
//   const saveAssignment = async () => {
//     const json = JSON.stringify(assignment, null, 2);
//     // Download JSON for testing
//     const blob = new Blob([json], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `Assignment_${assignment.test_id}.json`;
//     link.click();
//     URL.revokeObjectURL(url);

//     // Optional: Send to Django backend
//     try {
//       const response = await fetch('http://localhost:8000/api/assignments/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: json,
//       });
//       if (response.ok) {
//         alert('Assignment saved to backend!');
//       } else {
//         alert('Error saving to backend');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center">Create IELTS Assignment</h1>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Assignment Title</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={assignment.title}
//             onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
//             placeholder="e.g., Assignment 1"
//           />
//         </div>

//         <div className="mb-4">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
//             onClick={() => addSection('Writing')}
//           >
//             Add Writing Section
//           </button>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
//             onClick={() => addSection('Reading')}
//           >
//             Add Reading Section
//           </button>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => addSection('Listening')}
//           >
//             Add Listening Section
//           </button>
//         </div>

//         {assignment.sections.map((section, sectionIndex) => (
//           <div key={section.section_id} className="mb-8 border p-4 rounded bg-gray-50">
//             <h2 className="text-2xl font-semibold mb-4 text-blue-600">{section.name}</h2>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Section Instructions</label>
//               <textarea
//                 className="w-full p-2 border rounded"
//                 value={section.instructions}
//                 onChange={(e) =>
//                   updateField(`${sectionIndex}.instructions`, e.target.value)
//                 }
//                 placeholder="e.g., Answer the questions below."
//               />
//             </div>

//             {section.name === 'WRITING' && (
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
//                 onClick={() => addTask(sectionIndex)}
//               >
//                 Add Task
//               </button>
//             )}
//             {section.tasks.map((task, taskIndex) => (
//               <div key={task.id} className="mb-4 border p-4 rounded bg-white">
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Task Title (e.g., WRITING TASK 1)"
//                   value={task.title}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.title`, e.target.value)
//                   }
//                 />
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Task Instructions"
//                   value={task.instructions}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.instructions`, e.target.value)
//                   }
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="mb-2"
//                   onChange={(e) => handleImageUpload(sectionIndex, taskIndex, e)}
//                 />
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Correct Answer (e.g., sample essay or description)"
//                   value={task.answer}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.answer`, e.target.value)
//                   }
//                 />
//               </div>
//             ))}

//             {(section.name === 'READING' || section.name === 'LISTENING') && (
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
//                 onClick={() => addPassage(sectionIndex)}
//               >
//                 Add Passage
//               </button>
//             )}
//             {section.passages.map((passage, passageIndex) => (
//               <div key={passage.id} className="mb-4 border p-4 rounded bg-white">
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Passage Title (e.g., Passage 1 or Section 1)"
//                   value={passage.title}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.passages.${passageIndex}.title`, e.target.value)
//                   }
//                 />
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Passage Instructions"
//                   value={passage.instructions}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.passages.${passageIndex}.instructions`, e.target.value)
//                   }
//                 />
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Passage Content"
//                   value={passage.content}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.passages.${passageIndex}.content`, e.target.value)
//                   }
//                 />
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Optional Text (e.g., additional context)"
//                   value={passage.optionalText || ''}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.passages.${passageIndex}.optionalText`, e.target.value)
//                   }
//                 />
//                 <button
//                   className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
//                   onClick={() => addQuestionSet(sectionIndex, passageIndex)}
//                 >
//                   Add Question Set
//                 </button>
//                 {passage.questions.map((questionSet, setIndex) => (
//                   <div key={questionSet.set_id} className="mb-4 border p-4 rounded bg-gray-50">
//                     <textarea
//                       className="w-full p-2 border rounded mb-2"
//                       placeholder="Question Set Instructions (e.g., Choose THREE letters A-H)"
//                       value={questionSet.instructions}
//                       onChange={(e) =>
//                         updateField(
//                           `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.instructions`,
//                           e.target.value
//                         )
//                       }
//                     />
//                     <textarea
//                       className="w-full p-2 border rounded mb-2"
//                       placeholder="Optional Text (e.g., NB Your answers may be given in any order)"
//                       value={questionSet.optionalText || ''}
//                       onChange={(e) =>
//                         updateField(
//                           `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.optionalText`,
//                           e.target.value
//                         )
//                       }
//                     />
//                     <div className="mb-4">
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
//                         onClick={() => addQuestion(sectionIndex, passageIndex, setIndex, 'short_answer')}
//                       >
//                         Add Short Answer
//                       </button>
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
//                         onClick={() => addQuestion(sectionIndex, passageIndex, setIndex, 'multiple_choice')}
//                       >
//                         Add Multiple Choice
//                       </button>
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
//                         onClick={() =>
//                           addQuestion(sectionIndex, passageIndex, setIndex, 'true_false_not_given')
//                         }
//                       >
//                         Add True/False/Not Given
//                       </button>
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         onClick={() => addQuestion(sectionIndex, passageIndex, setIndex, 'table')}
//                       >
//                         Add Table Question
//                       </button>
//                     </div>
//                     {questionSet.questions.map((question, questionIndex) => (
//                       <div key={question.question_id} className="mb-4 border p-2 rounded bg-white">
//                         <input
//                           type="text"
//                           className="w-full p-2 border rounded mb-2"
//                           placeholder="Question Number (e.g., 14-16)"
//                           value={question.number}
//                           onChange={(e) =>
//                             updateField(
//                               `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.number`,
//                               e.target.value
//                             )
//                           }
//                         />
//                         <input
//                           type="text"
//                           className="w-full p-2 border rounded mb-2"
//                           placeholder="Question Text"
//                           value={question.text}
//                           onChange={(e) =>
//                             updateField(
//                               `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.text`,
//                               e.target.value
//                             )
//                           }
//                         />
//                         {question.type === 'multiple_choice' && (
//                           <div>
//                             {question.options.map((option, optionIndex) => (
//                               <input
//                                 key={optionIndex}
//                                 type="text"
//                                 className="w-full p-2 border rounded mb-2"
//                                 placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
//                                 value={option}
//                                 onChange={(e) =>
//                                   updateField(
//                                     `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.options.${optionIndex}`,
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                             ))}
//                             <input
//                               type="text"
//                               className="w-full p-2 border rounded mb-2"
//                               placeholder="Correct Answer (e.g., A,B,C)"
//                               value={question.answer.join(',')}
//                               onChange={(e) =>
//                                 updateField(
//                                   `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                   e.target.value ? e.target.value.split(',') : []
//                                 )
//                               }
//                             />
//                           </div>
//                         )}
//                         {question.type === 'true_false_not_given' && (
//                           <div>
//                             <select
//                               className="w-full p-2 border rounded mb-2"
//                               value={question.answer}
//                               onChange={(e) =>
//                                 updateField(
//                                   `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                   e.target.value
//                                 )
//                               }
//                             >
//                               <option value="">Select Answer</option>
//                               {question.options.map((option, index) => (
//                                 <option key={index} value={option}>
//                                   {option}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         )}
//                         {question.type === 'table' && (
//                           <div>
//                             {question.table.map((row, rowIndex) => (
//                               <div key={rowIndex} className="flex mb-2">
//                                 <input
//                                   type="text"
//                                   className="w-1/2 p-2 border rounded mr-2"
//                                   placeholder="Label (e.g., Witness’s family name)"
//                                   value={row.label}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.label`,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                                 <input
//                                   type="text"
//                                   className="w-1/2 p-2 border rounded"
//                                   placeholder="Correct Answer (e.g., Jones)"
//                                   value={row.value}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.value`,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                               </div>
//                             ))}
//                             <button
//                               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                               onClick={() => addTableRow(sectionIndex, passageIndex, setIndex, questionIndex)}
//                             >
//                               Add Table Row
//                             </button>
//                           </div>
//                         )}
//                         {question.type === 'short_answer' && (
//                           <input
//                             type="text"
//                             className="w-full p-2 border rounded mb-2"
//                             placeholder="Correct Answer (e.g., essential mineral)"
//                             value={question.answer}
//                             onChange={(e) =>
//                               updateField(
//                                 `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                 e.target.value
//                               )
//                             }
//                           />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         ))}

//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           onClick={saveAssignment}
//         >
//           Save Assignment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateAssignment;


// 4.Fourth. with preview json 

// import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// const CreateAssignment = () => {
//   const initialState = {
//     test_id: uuidv4(),
//     title: '',
//     sections: [],
//   };

//   const [assignment, setAssignment] = useState(initialState);
//   const [jsonPreview, setJsonPreview] = useState('');

//   // Update JSON preview whenever assignment changes
//   useEffect(() => {
//     setJsonPreview(JSON.stringify(assignment, null, 2));
//   }, [assignment]);

//   // Add a new section (Writing, Reading, Listening)
//   const addSection = (type) => {
//     setAssignment({
//       ...assignment,
//       sections: [
//         ...assignment.sections,
//         {
//           section_id: uuidv4(),
//           name: type.toUpperCase(),
//           instructions: '',
//           tasks: [],
//           passages: [],
//         },
//       ],
//     });
//   };

//   // Add a task to a Writing section
//   const addTask = (sectionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks.push({
//       id: uuidv4(),
//       type: 'task',
//       title: '',
//       instructions: '',
//       image: '',
//       answer: '',
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a passage to a Reading or Listening section
//   const addPassage = (sectionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].passages.push({
//       id: uuidv4(),
//       title: '',
//       instructions: '',
//       content: '',
//       optionalText: '',
//       questions: [],
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a question set to a passage
//   const addQuestionSet = (sectionIndex, passageIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].passages[passageIndex].questions.push({
//       set_id: uuidv4(),
//       instructions: '',
//       optionalText: '',
//       questions: [],
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a question to a question set
//   const addQuestion = (sectionIndex, passageIndex, setIndex, type) => {
//     const newSections = [...assignment.sections];
//     const question = {
//       question_id: uuidv4(),
//       number: '',
//       text: '',
//       type,
//       answer: type === 'multiple_choice' ? [] : '',
//     };
//     if (type === 'multiple_choice') {
//       question.options = ['', '', '', ''];
//     } else if (type === 'true_false_not_given') {
//       question.options = ['TRUE', 'FALSE', 'NOT GIVEN'];
//     } else if (type === 'table') {
//       question.table = [{ label: '', value: '' }];
//     }
//     newSections[sectionIndex].passages[passageIndex].questions[setIndex].questions.push(question);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a row to a table question
//   const addTableRow = (sectionIndex, passageIndex, setIndex, questionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].passages[passageIndex].questions[setIndex].questions[
//       questionIndex
//     ].table.push({ label: '', value: '' });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Update a field in the nested structure
//   const updateField = (path, value) => {
//     const newSections = [...assignment.sections];
//     const keys = path.split('.');
//     let current = newSections;
//     for (let i = 0; i < keys.length - 1; i++) {
//       current = current[keys[i]];
//     }
//     current[keys[keys.length - 1]] = value;
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Handle image upload for tasks
//   const handleImageUpload = (sectionIndex, taskIndex, e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const newSections = [...assignment.sections];
//       newSections[sectionIndex].tasks[taskIndex].image = reader.result;
//       setAssignment({ ...assignment, sections: newSections });
//     };
//     if (file) reader.readAsDataURL(file);
//   };

//   // Clear the draft
//   const clearDraft = () => {
//     setAssignment({ ...initialState, test_id: uuidv4() });
//   };

//   // Save the assignment as JSON and optionally send to backend
//   const saveAssignment = async () => {
//     const json = JSON.stringify(assignment, null, 2);
//     // Download JSON for testing
//     const blob = new Blob([json], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `Assignment_${assignment.test_id}.json`;
//     link.click();
//     URL.revokeObjectURL(url);

//     // Optional: Send to Django backend
//     try {
//       const response = await fetch('http://localhost:8000/api/assignments/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: json,
//       });
//       if (response.ok) {
//         alert('Assignment saved to backend!');
//       } else {
//         alert('Error saving to backend');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center">Create IELTS Assignment</h1>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Assignment Title</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={assignment.title}
//             onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
//             placeholder="e.g., Assignment 1"
//           />
//         </div>

//         <div className="mb-4 flex space-x-2">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => addSection('Writing')}
//           >
//             Add Writing Section
//           </button>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => addSection('Reading')}
//           >
//             Add Reading Section
//           </button>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => addSection('Listening')}
//           >
//             Add Listening Section
//           </button>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">JSON Preview</label>
//           <textarea
//             className="w-full p-2 border rounded bg-gray-100 font-mono text-sm h-64"
//             value={jsonPreview}
//             readOnly
//             placeholder="JSON preview will appear here..."
//           />
//         </div>

//         {assignment.sections.map((section, sectionIndex) => (
//           <div key={section.section_id} className="mb-8 border p-4 rounded bg-gray-50">
//             <h2 className="text-2xl font-semibold mb-4 text-blue-600">{section.name}</h2>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Section Instructions</label>
//               <textarea
//                 className="w-full p-2 border rounded"
//                 value={section.instructions}
//                 onChange={(e) =>
//                   updateField(`${sectionIndex}.instructions`, e.target.value)
//                 }
//                 placeholder="e.g., Answer the questions below."
//               />
//             </div>

//             {section.name === 'WRITING' && (
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
//                 onClick={() => addTask(sectionIndex)}
//               >
//                 Add Task
//               </button>
//             )}
//             {section.tasks.map((task, taskIndex) => (
//               <div key={task.id} className="mb-4 border p-4 rounded bg-white">
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Task Title (e.g., WRITING TASK 1)"
//                   value={task.title}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.title`, e.target.value)
//                   }
//                 />
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Task Instructions"
//                   value={task.instructions}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.instructions`, e.target.value)
//                   }
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="mb-2"
//                   onChange={(e) => handleImageUpload(sectionIndex, taskIndex, e)}
//                 />
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Correct Answer (e.g., sample essay or description)"
//                   value={task.answer}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.answer`, e.target.value)
//                   }
//                 />
//               </div>
//             ))}

//             {(section.name === 'READING' || section.name === 'LISTENING') && (
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
//                 onClick={() => addPassage(sectionIndex)}
//               >
//                 Add Passage
//               </button>
//             )}
//             {section.passages.map((passage, passageIndex) => (
//               <div key={passage.id} className="mb-4 border p-4 rounded bg-white">
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Passage Title (e.g., Passage 1 or Section 1)"
//                   value={passage.title}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.passages.${passageIndex}.title`, e.target.value)
//                   }
//                 />
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Passage Instructions"
//                   value={passage.instructions}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.passages.${passageIndex}.instructions`, e.target.value)
//                   }
//                 />
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Passage Content"
//                   value={passage.content}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.passages.${passageIndex}.content`, e.target.value)
//                   }
//                 />
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Optional Text (e.g., additional context)"
//                   value={passage.optionalText || ''}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.passages.${passageIndex}.optionalText`, e.target.value)
//                   }
//                 />
//                 <button
//                   className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
//                   onClick={() => addQuestionSet(sectionIndex, passageIndex)}
//                 >
//                   Add Question Set
//                 </button>
//                 {passage.questions.map((questionSet, setIndex) => (
//                   <div key={questionSet.set_id} className="mb-4 border p-4 rounded bg-gray-50">
//                     <textarea
//                       className="w-full p-2 border rounded mb-2"
//                       placeholder="Question Set Instructions (e.g., Choose THREE letters A-H)"
//                       value={questionSet.instructions}
//                       onChange={(e) =>
//                         updateField(
//                           `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.instructions`,
//                           e.target.value
//                         )
//                       }
//                     />
//                     <textarea
//                       className="w-full p-2 border rounded mb-2"
//                       placeholder="Optional Text (e.g., NB Your answers may be given in any order)"
//                       value={questionSet.optionalText || ''}
//                       onChange={(e) =>
//                         updateField(
//                           `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.optionalText`,
//                           e.target.value
//                         )
//                       }
//                     />
//                     <div className="mb-4 flex space-x-2">
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         onClick={() => addQuestion(sectionIndex, passageIndex, setIndex, 'short_answer')}
//                       >
//                         Add Short Answer
//                       </button>
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         onClick={() => addQuestion(sectionIndex, passageIndex, setIndex, 'multiple_choice')}
//                       >
//                         Add Multiple Choice
//                       </button>
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         onClick={() =>
//                           addQuestion(sectionIndex, passageIndex, setIndex, 'true_false_not_given')
//                         }
//                       >
//                         Add True/False/Not Given
//                       </button>
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         onClick={() => addQuestion(sectionIndex, passageIndex, setIndex, 'table')}
//                       >
//                         Add Table Question
//                       </button>
//                     </div>
//                     {questionSet.questions.map((question, questionIndex) => (
//                       <div key={question.question_id} className="mb-4 border p-2 rounded bg-white">
//                         <input
//                           type="text"
//                           className="w-full p-2 border rounded mb-2"
//                           placeholder="Question Number (e.g., 14-16)"
//                           value={question.number}
//                           onChange={(e) =>
//                             updateField(
//                               `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.number`,
//                               e.target.value
//                             )
//                           }
//                         />
//                         <input
//                           type="text"
//                           className="w-full p-2 border rounded mb-2"
//                           placeholder="Question Text"
//                           value={question.text}
//                           onChange={(e) =>
//                             updateField(
//                               `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.text`,
//                               e.target.value
//                             )
//                           }
//                         />
//                         {question.type === 'multiple_choice' && (
//                           <div>
//                             {question.options.map((option, optionIndex) => (
//                               <input
//                                 key={optionIndex}
//                                 type="text"
//                                 className="w-full p-2 border rounded mb-2"
//                                 placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
//                                 value={option}
//                                 onChange={(e) =>
//                                   updateField(
//                                     `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.options.${optionIndex}`,
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                             ))}
//                             <input
//                               type="text"
//                               className="w-full p-2 border rounded mb-2"
//                               placeholder="Correct Answer (e.g., A,B,C)"
//                               value={question.answer.join(',')}
//                               onChange={(e) =>
//                                 updateField(
//                                   `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                   e.target.value ? e.target.value.split(',') : []
//                                 )
//                               }
//                             />
//                           </div>
//                         )}
//                         {question.type === 'true_false_not_given' && (
//                           <div>
//                             <select
//                               className="w-full p-2 border rounded mb-2"
//                               value={question.answer}
//                               onChange={(e) =>
//                                 updateField(
//                                   `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                   e.target.value
//                                 )
//                               }
//                             >
//                               <option value="">Select Answer</option>
//                               {question.options.map((option, index) => (
//                                 <option key={index} value={option}>
//                                   {option}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         )}
//                         {question.type === 'table' && (
//                           <div>
//                             {question.table.map((row, rowIndex) => (
//                               <div key={rowIndex} className="flex mb-2">
//                                 <input
//                                   type="text"
//                                   className="w-1/2 p-2 border rounded mr-2"
//                                   placeholder="Label (e.g., Witness’s family name)"
//                                   value={row.label}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.label`,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                                 <input
//                                   type="text"
//                                   className="w-1/2 p-2 border rounded"
//                                   placeholder="Correct Answer (e.g., Jones)"
//                                   value={row.value}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.value`,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                               </div>
//                             ))}
//                             <button
//                               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                               onClick={() => addTableRow(sectionIndex, passageIndex, setIndex, questionIndex)}
//                             >
//                               Add Table Row
//                             </button>
//                           </div>
//                         )}
//                         {question.type === 'short_answer' && (
//                           <input
//                             type="text"
//                             className="w-full p-2 border rounded mb-2"
//                             placeholder="Correct Answer (e.g., essential mineral)"
//                             value={question.answer}
//                             onChange={(e) =>
//                               updateField(
//                                 `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                 e.target.value
//                               )
//                             }
//                           />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         ))}

//         <div className="flex space-x-4">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={saveAssignment}
//           >
//             Save Assignment
//           </button>
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             onClick={clearDraft}
//           >
//             Clear Draft
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateAssignment;

// 5.Fifth with speaking and lisining under testing audio upload working but table and mcq not correct
// import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// const CreateAssignment = () => {
//   const initialState = {
//     test_id: uuidv4(),
//     title: '',
//     sections: [],
//   };

//   const [assignment, setAssignment] = useState(initialState);
//   const [jsonPreview, setJsonPreview] = useState('');

//   // Update JSON preview
//   useEffect(() => {
//     setJsonPreview(JSON.stringify(assignment, null, 2));
//   }, [assignment]);

//   // Add a new section
//   const addSection = (type) => {
//     setAssignment({
//       ...assignment,
//       sections: [
//         ...assignment.sections,
//         {
//           section_id: uuidv4(),
//           name: type.toUpperCase(),
//           instructions: '',
//           tasks: [],
//           passages: [],
//         },
//       ],
//     });
//   };

//   // Delete a section
//   const deleteSection = (sectionIndex) => {
//     const newSections = assignment.sections.filter((_, index) => index !== sectionIndex);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a task to a Writing or Speaking section
//   const addTask = (sectionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks.push({
//       id: uuidv4(),
//       type: 'task',
//       title: '',
//       instructions: '',
//       image: newSections[sectionIndex].name === 'WRITING' ? '' : null,
//       answer: '',
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Delete a task
//   const deleteTask = (sectionIndex, taskIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks = newSections[sectionIndex].tasks.filter(
//       (_, index) => index !== taskIndex
//     );
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a passage to a Reading or Listening section
//   const addPassage = (sectionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].passages.push({
//       id: uuidv4(),
//       title: '',
//       instructions: '',
//       content: '',
//       optionalText: '',
//       audio: newSections[sectionIndex].name === 'LISTENING' ? '' : null,
//       questions: [],
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Delete a passage
//   const deletePassage = (sectionIndex, passageIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].passages = newSections[sectionIndex].passages.filter(
//       (_, index) => index !== passageIndex
//     );
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a question set to a passage
//   const addQuestionSet = (sectionIndex, passageIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].passages[passageIndex].questions.push({
//       set_id: uuidv4(),
//       instructions: '',
//       optionalText: '',
//       questions: [],
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Delete a question set
//   const deleteQuestionSet = (sectionIndex, passageIndex, setIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].passages[passageIndex].questions = newSections[
//       sectionIndex
//     ].passages[passageIndex].questions.filter((_, index) => index !== setIndex);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a question to a question set
//   const addQuestion = (sectionIndex, passageIndex, setIndex, type) => {
//     const newSections = [...assignment.sections];
//     const question = {
//       question_id: uuidv4(),
//       number: '',
//       text: '',
//       type,
//       answer: type === 'multiple_choice' ? [] : '',
//     };
//     if (type === 'multiple_choice') {
//       question.options = ['', '', '', ''];
//     } else if (type === 'true_false_not_given') {
//       question.options = ['TRUE', 'FALSE', 'NOT GIVEN'];
//     } else if (type === 'table') {
//       question.table = [{ label: '', value: '' }];
//     }
//     newSections[sectionIndex].passages[passageIndex].questions[setIndex].questions.push(question);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Delete a question
//   const deleteQuestion = (sectionIndex, passageIndex, setIndex, questionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].passages[passageIndex].questions[setIndex].questions = newSections[
//       sectionIndex
//     ].passages[passageIndex].questions[setIndex].questions.filter(
//       (_, index) => index !== questionIndex
//     );
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a row to a table question
//   const addTableRow = (sectionIndex, passageIndex, setIndex, questionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].passages[passageIndex].questions[setIndex].questions[
//       questionIndex
//     ].table.push({ label: '', value: '' });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Update a field in the nested structure
//   const updateField = (path, value) => {
//     const newSections = [...assignment.sections];
//     const keys = path.split('.');
//     let current = newSections;
//     for (let i = 0; i < keys.length - 1; i++) {
//       current = current[keys[i]];
//     }
//     current[keys[keys.length - 1]] = value;
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Handle image upload for Writing tasks
//   const handleImageUpload = (sectionIndex, taskIndex, e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const newSections = [...assignment.sections];
//       newSections[sectionIndex].tasks[taskIndex].image = reader.result;
//       setAssignment({ ...assignment, sections: newSections });
//     };
//     if (file) reader.readAsDataURL(file);
//   };

//   // Handle audio upload for Listening passages
//   const handleAudioUpload = (sectionIndex, passageIndex, e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const newSections = [...assignment.sections];
//       newSections[sectionIndex].passages[passageIndex].audio = reader.result;
//       setAssignment({ ...assignment, sections: newSections });
//     };
//     if (file) reader.readAsDataURL(file);
//   };

//   // Clear the draft
//   const clearDraft = () => {
//     setAssignment({ ...initialState, test_id: uuidv4() });
//   };

//   // Save the assignment as JSON and optionally send to backend
//   const saveAssignment = async () => {
//     const json = JSON.stringify(assignment, null, 2);
//     const blob = new Blob([json], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `Assignment_${assignment.test_id}.json`;
//     link.click();
//     URL.revokeObjectURL(url);

//     try {
//       const response = await fetch('http://localhost:8000/api/assignments/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: json,
//       });
//       if (response.ok) {
//         alert('Assignment saved to backend!');
//       } else {
//         alert('Error saving to backend');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center">Create IELTS Assignment</h1>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Assignment Title</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={assignment.title}
//             onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
//             placeholder="e.g., Assignment 1"
//           />
//         </div>

//         <div className="mb-4 flex space-x-2">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => addSection('Writing')}
//           >
//             Add Writing Section
//           </button>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => addSection('Reading')}
//           >
//             Add Reading Section
//           </button>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => addSection('Listening')}
//           >
//             Add Listening Section
//           </button>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => addSection('Speaking')}
//           >
//             Add Speaking Section
//           </button>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">JSON Preview</label>
//           <textarea
//             className="w-full p-2 border rounded bg-gray-100 font-mono text-sm h-64"
//             value={jsonPreview}
//             readOnly
//             placeholder="JSON preview will appear here..."
//           />
//         </div>

//         {assignment.sections.map((section, sectionIndex) => (
//           <div key={section.section_id} className="mb-8 border p-4 rounded bg-gray-50">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-semibold mb-4 text-blue-600">{section.name}</h2>
//               <button
//                 className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                 onClick={() => deleteSection(sectionIndex)}
//               >
//                 Delete Section
//               </button>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Section Instructions</label>
//               <textarea
//                 className="w-full p-2 border rounded"
//                 value={section.instructions}
//                 onChange={(e) =>
//                   updateField(`${sectionIndex}.instructions`, e.target.value)
//                 }
//                 placeholder="e.g., Answer the questions below."
//               />
//             </div>

//             {(section.name === 'WRITING' || section.name === 'SPEAKING') && (
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
//                 onClick={() => addTask(sectionIndex)}
//               >
//                 Add Task
//               </button>
//             )}
//             {section.tasks.map((task, taskIndex) => (
//               <div key={task.id} className="mb-4 border p-4 rounded bg-white">
//                 <div className="flex justify-between items-center">
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded mb-2"
//                     placeholder={`Task Title (e.g., ${section.name} TASK 1)`}
//                     value={task.title}
//                     onChange={(e) =>
//                       updateField(`${sectionIndex}.tasks.${taskIndex}.title`, e.target.value)
//                     }
//                   />
//                   <button
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                     onClick={() => deleteTask(sectionIndex, taskIndex)}
//                   >
//                     Delete Task
//                   </button>
//                 </div>
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Task Instructions"
//                   value={task.instructions}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.instructions`, e.target.value)
//                   }
//                 />
//                 {section.name === 'WRITING' && (
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="mb-2"
//                     onChange={(e) => handleImageUpload(sectionIndex, taskIndex, e)}
//                   />
//                 )}
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder={`Correct Answer (e.g., sample ${section.name.toLowerCase()} response)`}
//                   value={task.answer}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.answer`, e.target.value)
//                   }
//                 />
//               </div>
//             ))}

//             {(section.name === 'READING' || section.name === 'LISTENING') && (
//               <button
//                 className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
//                 onClick={() => addPassage(sectionIndex)}
//               >
//                 Add Passage
//               </button>
//             )}
//             {section.passages.map((passage, passageIndex) => (
//               <div key={passage.id} className="mb-4 border p-4 rounded bg-white">
//                 <div className="flex justify-between items-center">
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded mb-2"
//                     placeholder="Passage Title (e.g., Passage 1 or Section 1)"
//                     value={passage.title}
//                     onChange={(e) =>
//                       updateField(`${sectionIndex}.passages.${passageIndex}.title`, e.target.value)
//                     }
//                   />
//                   <button
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                     onClick={() => deletePassage(sectionIndex, passageIndex)}
//                   >
//                     Delete Passage
//                   </button>
//                 </div>
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Passage Instructions"
//                   value={passage.instructions}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.passages.${passageIndex}.instructions`, e.target.value)
//                   }
//                 />
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Passage Content"
//                   value={passage.content}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.passages.${passageIndex}.content`, e.target.value)
//                   }
//                 />
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Optional Text (e.g., additional context)"
//                   value={passage.optionalText || ''}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.passages.${passageIndex}.optionalText`, e.target.value)
//                   }
//                 />
//                 {section.name === 'LISTENING' && (
//                   <input
//                     type="file"
//                     accept="audio/*"
//                     className="mb-2"
//                     onChange={(e) => handleAudioUpload(sectionIndex, passageIndex, e)}
//                   />
//                 )}
//                 <button
//                   className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
//                   onClick={() => addQuestionSet(sectionIndex, passageIndex)}
//                 >
//                   Add Question Set
//                 </button>
//                 {passage.questions.map((questionSet, setIndex) => (
//                   <div key={questionSet.set_id} className="mb-4 border p-4 rounded bg-gray-50">
//                     <div className="flex justify-between items-center">
//                       <textarea
//                         className="w-full p-2 border rounded mb-2"
//                         placeholder="Question Set Instructions (e.g., Choose THREE letters A-H)"
//                         value={questionSet.instructions}
//                         onChange={(e) =>
//                           updateField(
//                             `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.instructions`,
//                             e.target.value
//                           )
//                         }
//                       />
//                       <button
//                         className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                         onClick={() => deleteQuestionSet(sectionIndex, passageIndex, setIndex)}
//                       >
//                         Delete Question Set
//                       </button>
//                     </div>
//                     <textarea
//                       className="w-full p-2 border rounded mb-2"
//                       placeholder="Optional Text (e.g., NB Your answers may be given in any order)"
//                       value={questionSet.optionalText || ''}
//                       onChange={(e) =>
//                         updateField(
//                           `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.optionalText`,
//                           e.target.value
//                         )
//                       }
//                     />
//                     <div className="mb-4 flex space-x-2">
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         onClick={() => addQuestion(sectionIndex, passageIndex, setIndex, 'short_answer')}
//                       >
//                         Add Short Answer
//                       </button>
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         onClick={() => addQuestion(sectionIndex, passageIndex, setIndex, 'multiple_choice')}
//                       >
//                         Add Multiple Choice
//                       </button>
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         onClick={() =>
//                           addQuestion(sectionIndex, passageIndex, setIndex, 'true_false_not_given')
//                         }
//                       >
//                         Add True/False/Not Given
//                       </button>
//                       <button
//                         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         onClick={() => addQuestion(sectionIndex, passageIndex, setIndex, 'table')}
//                       >
//                         Add Table Question
//                       </button>
//                     </div>
//                     {questionSet.questions.map((question, questionIndex) => (
//                       <div key={question.question_id} className="mb-4 border p-2 rounded bg-white">
//                         <div className="flex justify-between items-center">
//                           <input
//                             type="text"
//                             className="w-full p-2 border rounded mb-2"
//                             placeholder="Question Number (e.g., 14-16)"
//                             value={question.number}
//                             onChange={(e) =>
//                               updateField(
//                                 `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.number`,
//                                 e.target.value
//                               )
//                             }
//                           />
//                           <button
//                             className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                             onClick={() => deleteQuestion(sectionIndex, passageIndex, setIndex, questionIndex)}
//                           >
//                             Delete Question
//                           </button>
//                         </div>
//                         <input
//                           type="text"
//                           className="w-full p-2 border rounded mb-2"
//                           placeholder="Question Text"
//                           value={question.text}
//                           onChange={(e) =>
//                             updateField(
//                               `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.text`,
//                               e.target.value
//                             )
//                           }
//                         />
//                         {question.type === 'multiple_choice' && (
//                           <div>
//                             {question.options.map((option, optionIndex) => (
//                               <input
//                                 key={optionIndex}
//                                 type="text"
//                                 className="w-full p-2 border rounded mb-2"
//                                 placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
//                                 value={option}
//                                 onChange={(e) =>
//                                   updateField(
//                                     `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.options.${optionIndex}`,
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                             ))}
//                             <input
//                               type="text"
//                               className="w-full p-2 border rounded mb-2"
//                               placeholder="Correct Answer (e.g., A,B,C)"
//                               value={question.answer.join(',')}
//                               onChange={(e) =>
//                                 updateField(
//                                   `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                   e.target.value ? e.target.value.split(',') : []
//                                 )
//                               }
//                             />
//                           </div>
//                         )}
//                         {question.type === 'true_false_not_given' && (
//                           <div>
//                             <select
//                               className="w-full p-2 border rounded mb-2"
//                               value={question.answer}
//                               onChange={(e) =>
//                                 updateField(
//                                   `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                   e.target.value
//                                 )
//                               }
//                             >
//                               <option value="">Select Answer</option>
//                               {question.options.map((option, index) => (
//                                 <option key={index} value={option}>
//                                   {option}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         )}
//                         {question.type === 'table' && (
//                           <div>
//                             {question.table.map((row, rowIndex) => (
//                               <div key={rowIndex} className="flex mb-2">
//                                 <input
//                                   type="text"
//                                   className="w-1/2 p-2 border rounded mr-2"
//                                   placeholder="Label (e.g., Witness’s family name)"
//                                   value={row.label}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.label`,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                                 <input
//                                   type="text"
//                                   className="w-1/2 p-2 border rounded"
//                                   placeholder="Correct Answer (e.g., Jones)"
//                                   value={row.value}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.value`,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                               </div>
//                             ))}
//                             <button
//                               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                               onClick={() => addTableRow(sectionIndex, passageIndex, setIndex, questionIndex)}
//                             >
//                               Add Table Row
//                             </button>
//                           </div>
//                         )}
//                         {question.type === 'short_answer' && (
//                           <input
//                             type="text"
//                             className="w-full p-2 border rounded mb-2"
//                             placeholder="Correct Answer (e.g., essential mineral)"
//                             value={question.answer}
//                             onChange={(e) =>
//                               updateField(
//                                 `${sectionIndex}.passages.${passageIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                 e.target.value
//                               )
//                             }
//                           />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         ))}

//         <div className="flex space-x-4">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={saveAssignment}
//           >
//             Save Assignment
//           </button>
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             onClick={clearDraft}
//           >
//             Clear Draft
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateAssignment;

// 6.Sixth Correcting table mcq and lising backend upload not working
// import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// const CreateAssignment = () => {
//   const initialState = {
//     test_id: uuidv4(),
//     title: '',
//     sections: [],
//   };

//   const [assignment, setAssignment] = useState(initialState);
//   const [jsonPreview, setJsonPreview] = useState('');

//   // Update JSON preview
//   useEffect(() => {
//     setJsonPreview(JSON.stringify(assignment, null, 2));
//   }, [assignment]);

//   // Add a new section
//   const addSection = (type) => {
//     setAssignment({
//       ...assignment,
//       sections: [
//         ...assignment.sections,
//         {
//           section_id: uuidv4(),
//           name: type.toUpperCase(),
//           instructions: '',
//           tasks: [],
//         },
//       ],
//     });
//   };

//   // Delete a section
//   const deleteSection = (sectionIndex) => {
//     const newSections = assignment.sections.filter((_, index) => index !== sectionIndex);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a task to Writing, Speaking, Reading, or Listening section
//   const addTask = (sectionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks.push({
//       id: uuidv4(),
//       type: 'task',
//       title: '',
//       instructions: '',
//       audio: newSections[sectionIndex].name === 'LISTENING' ? '' : null,
//       image: newSections[sectionIndex].name === 'WRITING' ? '' : null,
//       content: newSections[sectionIndex].name === 'READING' || newSections[sectionIndex].name === 'LISTENING' ? '' : null,
//       optionalText: '',
//       questions: [],
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Delete a task
//   const deleteTask = (sectionIndex, taskIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks = newSections[sectionIndex].tasks.filter(
//       (_, index) => index !== taskIndex
//     );
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a question set to a task
//   const addQuestionSet = (sectionIndex, taskIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks[taskIndex].questions.push({
//       set_id: uuidv4(),
//       instructions: '',
//       optionalText: '',
//       questions: [],
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Delete a question set
//   const deleteQuestionSet = (sectionIndex, taskIndex, setIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks[taskIndex].questions = newSections[sectionIndex].tasks[
//       taskIndex
//     ].questions.filter((_, index) => index !== setIndex);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a question to a question set
//   const addQuestion = (sectionIndex, taskIndex, setIndex, type) => {
//     const newSections = [...assignment.sections];
//     const question = {
//       question_id: uuidv4(),
//       number: '',
//       text: '',
//       type,
//       answer: type === 'multiple_choice' || type === 'true_false_not_given' ? '' : type === 'table' ? [] : '',
//     };
//     if (type === 'multiple_choice') {
//       question.options = ['', '', '', ''];
//     } else if (type === 'true_false_not_given') {
//       question.options = ['TRUE', 'FALSE', 'NOT GIVEN'];
//     } else if (type === 'table') {
//       question.table = [
//         { content: '', question: '', answer: '' },
//         { content: '', question: '', answer: '' },
//       ];
//       question.columns = [
//         { label: 'Content', isAnswer: false },
//         { label: 'Question', isAnswer: false },
//         { label: 'Answer', isAnswer: true },
//       ];
//     }
//     newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions.push(question);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Delete a question
//   const deleteQuestion = (sectionIndex, taskIndex, setIndex, questionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions = newSections[
//       sectionIndex
//     ].tasks[taskIndex].questions[setIndex].questions.filter((_, index) => index !== questionIndex);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a row to a table question
//   const addTableRow = (sectionIndex, taskIndex, setIndex, questionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions[
//       questionIndex
//     ].table.push({ content: '', question: '', answer: '' });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a column to a table question
//   const addTableColumn = (sectionIndex, taskIndex, setIndex, questionIndex) => {
//     const newSections = [...assignment.sections];
//     const question = newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions[questionIndex];
//     question.columns.splice(question.columns.length - 1, 0, { label: `Column ${question.columns.length}`, isAnswer: false });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Update a field in the nested structure
//   const updateField = (path, value) => {
//     const newSections = [...assignment.sections];
//     const keys = path.split('.');
//     let current = newSections;
//     for (let i = 0; i < keys.length - 1; i++) {
//       current = current[keys[i]];
//     }
//     current[keys[keys.length - 1]] = value;
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Handle image upload for Writing tasks
//   const handleImageUpload = (sectionIndex, taskIndex, e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const newSections = [...assignment.sections];
//       newSections[sectionIndex].tasks[taskIndex].image = reader.result;
//       setAssignment({ ...assignment, sections: newSections });
//     };
//     if (file) reader.readAsDataURL(file);
//   };

//   // Handle audio upload for Listening tasks
//   const handleAudioUpload = (sectionIndex, taskIndex, e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const newSections = [...assignment.sections];
//       newSections[sectionIndex].tasks[taskIndex].audio = reader.result;
//       setAssignment({ ...assignment, sections: newSections });
//     };
//     if (file) reader.readAsDataURL(file);
//   };

//   // Clear the draft
//   const clearDraft = () => {
//     setAssignment({ ...initialState, test_id: uuidv4() });
//   };

//   // Save the assignment as JSON and optionally send to backend
//   const saveAssignment = async () => {
//     const json = JSON.stringify(assignment, null, 2);
//     const blob = new Blob([json], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `Assignment_${assignment.test_id}.json`;
//     link.click();
//     URL.revokeObjectURL(url);

//     try {
//         const response = await fetch('http://localhost:8000//api/assignments/', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: json,
//       });
//       if (response.ok) {
//         alert('Assignment saved to backend!');
//       } else {
//         alert('Error saving to backend');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center">Create IELTS Assignment</h1>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Assignment Title</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={assignment.title}
//             onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
//             placeholder="e.g., Assignment 1"
//           />
//         </div>

//         <div className="mb-4 flex space-x-2">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => addSection('Writing')}
//           >
//             Add Writing Section
//           </button>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => addSection('Reading')}
//           >
//             Add Reading Section
//           </button>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => addSection('Listening')}
//           >
//             Add Listening Section
//           </button>
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={() => addSection('Speaking')}
//           >
//             Add Speaking Section
//           </button>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">JSON Preview</label>
//           <textarea
//             className="w-full p-2 border rounded bg-gray-100 font-mono text-sm h-64"
//             value={jsonPreview}
//             readOnly
//             placeholder="JSON preview will appear here..."
//           />
//         </div>

//         {assignment.sections.map((section, sectionIndex) => (
//           <div key={section.section_id} className="mb-8 border p-4 rounded bg-gray-50">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-semibold mb-4 text-blue-600">{section.name}</h2>
//               <button
//                 className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                 onClick={() => deleteSection(sectionIndex)}
//               >
//                 Delete Section
//               </button>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">Section Instructions</label>
//               <textarea
//                 className="w-full p-2 border rounded"
//                 value={section.instructions}
//                 onChange={(e) =>
//                   updateField(`${sectionIndex}.instructions`, e.target.value)
//                 }
//                 placeholder="e.g., Answer the questions below."
//               />
//             </div>

//             <button
//               className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
//               onClick={() => addTask(sectionIndex)}
//             >
//               Add Task
//             </button>
//             {section.tasks.map((task, taskIndex) => (
//               <div key={task.id} className="mb-4 border p-4 rounded bg-white">
//                 <div className="flex justify-between items-center">
//                   <input
//                     type="text"
//                     className="w-full p-2 border rounded mb-2"
//                     placeholder={`Task Title (e.g., ${section.name} TASK 1)`}
//                     value={task.title}
//                     onChange={(e) =>
//                       updateField(`${sectionIndex}.tasks.${taskIndex}.title`, e.target.value)
//                     }
//                   />
//                   <button
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                     onClick={() => deleteTask(sectionIndex, taskIndex)}
//                   >
//                     Delete Task
//                   </button>
//                 </div>
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Task Instructions"
//                   value={task.instructions}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.instructions`, e.target.value)
//                   }
//                 />
//                 {section.name === 'WRITING' && (
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="mb-2"
//                     onChange={(e) => handleImageUpload(sectionIndex, taskIndex, e)}
//                   />
//                 )}
//                 {section.name === 'LISTENING' && (
//                   <input
//                     type="file"
//                     accept="audio/*"
//                     className="mb-2"
//                     onChange={(e) => handleAudioUpload(sectionIndex, taskIndex, e)}
//                   />
//                 )}
//                 {(section.name === 'READING' || section.name === 'LISTENING') && (
//                   <textarea
//                     className="w-full p-2 border rounded mb-2"
//                     placeholder="Task Content (e.g., passage text for Reading)"
//                     value={task.content || ''}
//                     onChange={(e) =>
//                       updateField(`${sectionIndex}.tasks.${taskIndex}.content`, e.target.value)
//                     }
//                   />
//                 )}
//                 <textarea
//                   className="w-full p-2 border rounded mb-2"
//                   placeholder="Optional Text (e.g., additional context)"
//                   value={task.optionalText || ''}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.optionalText`, e.target.value)
//                   }
//                 />
//                 {(section.name === 'WRITING' || section.name === 'READING' || section.name === 'LISTENING') && (
//                   <button
//                     className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
//                     onClick={() => addQuestionSet(sectionIndex, taskIndex)}
//                   >
//                     Add Question Set
//                   </button>
//                 )}
//                 {(section.name === 'WRITING' || section.name === 'READING' || section.name === 'LISTENING') &&
//                   task.questions.map((questionSet, setIndex) => (
//                     <div key={questionSet.set_id} className="mb-4 border p-4 rounded bg-gray-50">
//                       <div className="flex justify-between items-center">
//                         <textarea
//                           className="w-full p-2 border rounded mb-2"
//                           placeholder="Question Set Instructions (e.g., Choose ONE letter A-D)"
//                           value={questionSet.instructions}
//                           onChange={(e) =>
//                             updateField(
//                               `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.instructions`,
//                               e.target.value
//                             )
//                           }
//                         />
//                         <button
//                           className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                           onClick={() => deleteQuestionSet(sectionIndex, taskIndex, setIndex)}
//                         >
//                           Delete Question Set
//                         </button>
//                       </div>
//                       <textarea
//                         className="w-full p-2 border rounded mb-2"
//                         placeholder="Optional Text (e.g., NB Your answers may be given in any order)"
//                         value={questionSet.optionalText || ''}
//                         onChange={(e) =>
//                           updateField(
//                             `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.optionalText`,
//                             e.target.value
//                           )
//                         }
//                       />
//                       <div className="mb-4 flex space-x-2">
//                         <button
//                           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                           onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'short_answer')}
//                         >
//                           Add Short Answer
//                         </button>
//                         <button
//                           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                           onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'multiple_choice')}
//                         >
//                           Add Multiple Choice
//                         </button>
//                         <button
//                           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                           onClick={() =>
//                             addQuestion(sectionIndex, taskIndex, setIndex, 'true_false_not_given')
//                           }
//                         >
//                           Add True/False/Not Given
//                         </button>
//                         <button
//                           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                           onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'table')}
//                         >
//                           Add Table Question
//                         </button>
//                       </div>
//                       {questionSet.questions.map((question, questionIndex) => (
//                         <div key={question.question_id} className="mb-4 border p-2 rounded bg-white">
//                           <div className="flex justify-between items-center">
//                             <input
//                               type="text"
//                               className="w-full p-2 border rounded mb-2"
//                               placeholder="Question Number (e.g., 1-4)"
//                               value={question.number}
//                               onChange={(e) =>
//                                 updateField(
//                                   `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.number`,
//                                   e.target.value
//                                 )
//                               }
//                             />
//                             <button
//                               className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                               onClick={() => deleteQuestion(sectionIndex, taskIndex, setIndex, questionIndex)}
//                             >
//                               Delete Question
//                             </button>
//                           </div>
//                           <input
//                             type="text"
//                             className="w-full p-2 border rounded mb-2"
//                             placeholder="Question Text"
//                             value={question.text}
//                             onChange={(e) =>
//                               updateField(
//                                 `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.text`,
//                                 e.target.value
//                               )
//                             }
//                           />
//                           {question.type === 'multiple_choice' && (
//                             <div>
//                               {question.options.map((option, optionIndex) => (
//                                 <input
//                                   key={optionIndex}
//                                   type="text"
//                                   className="w-full p-2 border rounded mb-2"
//                                   placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
//                                   value={option}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.options.${optionIndex}`,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                               ))}
//                               <select
//                                 className="w-full p-2 border rounded mb-2"
//                                 value={question.answer}
//                                 onChange={(e) =>
//                                   updateField(
//                                     `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                     e.target.value
//                                   )
//                                 }
//                               >
//                                 <option value="">Select Correct Answer</option>
//                                 {question.options.map((option, index) => (
//                                   <option key={index} value={option}>
//                                     {option}
//                                   </option>
//                                 ))}
//                               </select>
//                             </div>
//                           )}
//                           {question.type === 'true_false_not_given' && (
//                             <div>
//                               <select
//                                 className="w-full p-2 border rounded mb-2"
//                                 value={question.answer}
//                                 onChange={(e) =>
//                                   updateField(
//                                     `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                     e.target.value
//                                   )
//                                 }
//                               >
//                                 <option value="">Select Answer</option>
//                                 {question.options.map((option, index) => (
//                                   <option key={index} value={option}>
//                                     {option}
//                                   </option>
//                                 ))}
//                               </select>
//                             </div>
//                           )}
//                           {question.type === 'table' && (
//                             <div>
//                               <div className="flex mb-2">
//                                 {question.columns.map((column, colIndex) => (
//                                   <input
//                                     key={colIndex}
//                                     type="text"
//                                     className="flex-1 p-2 border rounded mr-2"
//                                     placeholder={column.isAnswer ? 'Answer Column' : `Column ${colIndex + 1} Label`}
//                                     value={column.label}
//                                     onChange={(e) =>
//                                       updateField(
//                                         `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.columns.${colIndex}.label`,
//                                         e.target.value
//                                       )
//                                     }
//                                     disabled={column.isAnswer}
//                                   />
//                                 ))}
//                               </div>
//                               {question.table.map((row, rowIndex) => (
//                                 <div key={rowIndex} className="flex mb-2">
//                                   <input
//                                     type="text"
//                                     className="flex-1 p-2 border rounded mr-2"
//                                     placeholder="Content (e.g., Witness’s family name)"
//                                     value={row.content}
//                                     onChange={(e) =>
//                                       updateField(
//                                         `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.content`,
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                   <input
//                                     type="text"
//                                     className="flex-1 p-2 border rounded mr-2"
//                                     placeholder="Question (e.g., 1 __________ Susan)"
//                                     value={row.question}
//                                     onChange={(e) =>
//                                       updateField(
//                                         `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.question`,
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                   <input
//                                     type="text"
//                                     className="flex-1 p-2 border rounded"
//                                     placeholder="Correct Answer (e.g., Jones)"
//                                     value={row.answer}
//                                     onChange={(e) =>
//                                       updateField(
//                                         `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.answer`,
//                                         e.target.value
//                                       )
//                                     }
//                                   />
//                                 </div>
//                               ))}
//                               <div className="flex space-x-2">
//                                 <button
//                                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                                   onClick={() => addTableRow(sectionIndex, taskIndex, setIndex, questionIndex)}
//                                 >
//                                   Add Row
//                                 </button>
//                                 <button
//                                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                                   onClick={() => addTableColumn(sectionIndex, taskIndex, setIndex, questionIndex)}
//                                 >
//                                   Add Column
//                                 </button>
//                               </div>
//                             </div>
//                           )}
//                           {question.type === 'short_answer' && (
//                             <input
//                               type="text"
//                               className="w-full p-2 border rounded mb-2"
//                               placeholder="Correct Answer (e.g., essential mineral)"
//                               value={question.answer}
//                               onChange={(e) =>
//                                 updateField(
//                                   `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                   e.target.value
//                                 )
//                               }
//                             />
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   ))}
//                 {section.name === 'SPEAKING' && (
//                   <textarea
//                     className="w-full p-2 border rounded mb-2"
//                     placeholder="Correct Answer (e.g., sample speaking response)"
//                     value={task.answer}
//                     onChange={(e) =>
//                       updateField(`${sectionIndex}.tasks.${taskIndex}.answer`, e.target.value)
//                     }
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}

//         <div className="flex space-x-4">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             onClick={saveAssignment}
//           >
//             Save Assignment
//           </button>
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             onClick={clearDraft}
//           >
//             Clear Draft
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateAssignment;



// 7Seventh

// import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';

// const CreateAssignment = () => {
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const token = localStorage.getItem('token');
//   const config = { headers: { Authorization: `Token ${token}` } };

//   const initialState = {
//     test_id: uuidv4(),
//     title: '',
//     sections: [],
//   };

//   const [assignment, setAssignment] = useState(initialState);
//   const [assignments, setAssignments] = useState([]);
//   const [jsonPreview, setJsonPreview] = useState('');
//   const [selectedAssignmentId, setSelectedAssignmentId] = useState('');

//   // Fetch assignments on mount
//   useEffect(() => {
//     fetchAssignments();
//   }, []);

//   // Update JSON preview
//   useEffect(() => {
//     setJsonPreview(JSON.stringify(assignment, null, 2));
//   }, [assignment]);

//   const fetchAssignments = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/api/assignments/`, config);
//       setAssignments(res.data);
//     } catch (error) {
//       console.error('Error fetching assignments:', error);
//       alert('Failed to fetch assignments');
//     }
//   };

//   const loadAssignment = async (assignmentId) => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/api/assignments/${assignmentId}/`, config);
//       setAssignment(res.data.json_content);
//       setSelectedAssignmentId(assignmentId);
//     } catch (error) {
//       console.error('Error loading assignment:', error);
//       alert('Failed to load assignment');
//     }
//   };

//   // Add a new section
//   const addSection = (type) => {
//     setAssignment({
//       ...assignment,
//       sections: [
//         ...assignment.sections,
//         {
//           section_id: uuidv4(),
//           name: type.toUpperCase(),
//           instructions: '',
//           tasks: [],
//         },
//       ],
//     });
//   };

//   // Delete a section
//   const deleteSection = (sectionIndex) => {
//     const newSections = assignment.sections.filter((_, index) => index !== sectionIndex);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a task to Writing, Speaking, Reading, or Listening section
//   const addTask = (sectionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks.push({
//       id: uuidv4(),
//       type: 'task',
//       title: '',
//       instructions: '',
//       audio: newSections[sectionIndex].name === 'LISTENING' ? '' : null,
//       image: newSections[sectionIndex].name === 'WRITING' ? '' : null,
//       content: newSections[sectionIndex].name === 'READING' || newSections[sectionIndex].name === 'LISTENING' ? '' : null,
//       optionalText: '',
//       questions: [],
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Delete a task
//   const deleteTask = (sectionIndex, taskIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks = newSections[sectionIndex].tasks.filter(
//       (_, index) => index !== taskIndex
//     );
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a question set to a task
//   const addQuestionSet = (sectionIndex, taskIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks[taskIndex].questions.push({
//       set_id: uuidv4(),
//       instructions: '',
//       optionalText: '',
//       questions: [],
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Delete a question set
//   const deleteQuestionSet = (sectionIndex, taskIndex, setIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks[taskIndex].questions = newSections[sectionIndex].tasks[
//       taskIndex
//     ].questions.filter((_, index) => index !== setIndex);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a question to a question set
//   const addQuestion = (sectionIndex, taskIndex, setIndex, type) => {
//     const newSections = [...assignment.sections];
//     const question = {
//       question_id: uuidv4(),
//       number: '',
//       text: '',
//       type,
//       answer: type === 'multiple_choice' || type === 'true_false_not_given' ? '' : type === 'table' ? [] : '',
//     };
//     if (type === 'multiple_choice') {
//       question.options = ['', '', '', ''];
//     } else if (type === 'true_false_not_given') {
//       question.options = ['TRUE', 'FALSE', 'NOT GIVEN'];
//     } else if (type === 'table') {
//       question.table = [
//         { content: '', question: '', answer: '' },
//         { content: '', question: '', answer: '' },
//       ];
//       question.columns = [
//         { label: 'Content', isAnswer: false },
//         { label: 'Question', isAnswer: false },
//         { label: 'Answer', isAnswer: true },
//       ];
//     }
//     newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions.push(question);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Delete a question
//   const deleteQuestion = (sectionIndex, taskIndex, setIndex, questionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions = newSections[
//       sectionIndex
//     ].tasks[taskIndex].questions[setIndex].questions.filter((_, index) => index !== questionIndex);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a row to a table question
//   const addTableRow = (sectionIndex, taskIndex, setIndex, questionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions[
//       questionIndex
//     ].table.push({ content: '', question: '', answer: '' });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Add a column to a table question
//   const addTableColumn = (sectionIndex, taskIndex, setIndex, questionIndex) => {
//     const newSections = [...assignment.sections];
//     const question = newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions[questionIndex];
//     question.columns.splice(question.columns.length - 1, 0, { label: `Column ${question.columns.length}`, isAnswer: false });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Update a field in the nested structure
//   const updateField = (path, value) => {
//     const newSections = [...assignment.sections];
//     const keys = path.split('.');
//     let current = newSections;
//     for (let i = 0; i < keys.length - 1; i++) {
//       current = current[keys[i]];
//     }
//     current[keys[keys.length - 1]] = value;
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   // Handle file upload (audio or image)
//   const handleFileUpload = async (sectionIndex, taskIndex, e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const endpoint = type === 'audio' ? `${API_BASE_URL}/api/upload-audio/` : `${API_BASE_URL}/api/upload-image/`;
//       const res = await axios.post(endpoint, formData, {
//         headers: {
//           Authorization: `Token ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       const newSections = [...assignment.sections];
//       newSections[sectionIndex].tasks[taskIndex][type] = res.data.file_url;
//       setAssignment({ ...assignment, sections: newSections });
//     } catch (error) {
//       console.error(`Error uploading ${type}:`, error);
//       alert(`Failed to upload ${type}`);
//     }
//   };

//   // Save or update the assignment
//   const saveAssignment = async () => {
//     try {
//       const data = {
//         test_id: assignment.test_id,
//         title: assignment.title,
//         json_content: assignment,
//       };
//       if (selectedAssignmentId) {
//         // Update existing assignment
//         await axios.put(`${API_BASE_URL}/api/api/assignments/${selectedAssignmentId}/`, data, config);
//         alert('Assignment updated successfully!');
//       } else {
//         // Create new assignment
//         await axios.post(`${API_BASE_URL}/api/api/assignments/`, data, config);
//         alert('Assignment created successfully!');
//       }
//       fetchAssignments();
//       clearDraft();
//     } catch (error) {
//       console.error('Error saving assignment:', error);
//       alert('Failed to save assignment');
//     }
//   };

//   // Delete an assignment
//   const deleteAssignment = async (assignmentId) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/api/api/assignments/${assignmentId}/`, config);
//       fetchAssignments();
//       if (selectedAssignmentId === assignmentId) {
//         clearDraft();
//       }
//     } catch (error) {
//       console.error('Error deleting assignment:', error);
//       alert('Failed to delete assignment');
//     }
//   };

//   // Clear the draft
//   const clearDraft = () => {
//     setAssignment({ ...initialState, test_id: uuidv4() });
//     setSelectedAssignmentId('');
//   };

//   return (
//     <div className="p-6 bg-brandCream min-h-screen">
//       <h1 className="text-3xl font-bold text-brandRed mb-6">Create/Edit Assignment</h1>

//       {/* Assignment Selector */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">Select Assignment</h2>
//         <select
//           value={selectedAssignmentId}
//           onChange={(e) => {
//             // if (e.target.value) {
//             //   loadAssignment(e.target.value);
//             // } else {
//             //   clearDraft();
//             // }
//             if (id) {
//               loadAssignment(id);
//             } else {
//               clearDraft();
//             }
//           }}
//           className="border p-2 mr-2"
//         >
//           <option value="">Create New Assignment</option>
//           {assignments.map((assignment) => (
//             <option key={assignment.id} value={assignment.id}>
//               {assignment.title}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={clearDraft}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Clear Draft
//         </button>
//       </div>

//       {/* Assignment Title */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">Assignment Details</h2>
//         <input
//           type="text"
//           value={assignment.title}
//           onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
//           placeholder="Assignment Title"
//           className="border p-2 mb-2 w-full"
//         />
//       </div>

//       {/* Add Section */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">Add Section</h2>
//         <div className="flex space-x-2">
//           <button
//             className="bg-brandRed text-white px-4 py-2 rounded"
//             onClick={() => addSection('Writing')}
//           >
//             Add Writing
//           </button>
//           <button
//             className="bg-brandRed text-white px-4 py-2 rounded"
//             onClick={() => addSection('Reading')}
//           >
//             Add Reading
//           </button>
//           <button
//             className="bg-brandRed text-white px-4 py-2 rounded"
//             onClick={() => addSection('Listening')}
//           >
//             Add Listening
//           </button>
//           <button
//             className="bg-brandRed text-white px-4 py-2 rounded"
//             onClick={() => addSection('Speaking')}
//           >
//             Add Speaking
//           </button>
//         </div>
//       </div>

//       {/* Sections */}
//       {assignment.sections.map((section, sectionIndex) => (
//         <div key={section.section_id} className="bg-white p-4 rounded shadow mb-6">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-bold text-brandRed">{section.name}</h3>
//             <button
//               className="bg-red-500 text-white px-3 py-1 rounded"
//               onClick={() => deleteSection(sectionIndex)}
//             >
//               Delete Section
//             </button>
//           </div>
//           <textarea
//             className="border p-2 mb-2 w-full"
//             placeholder="Section Instructions"
//             value={section.instructions}
//             onChange={(e) =>
//               updateField(`${sectionIndex}.instructions`, e.target.value)
//             }
//           />
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded mb-4"
//             onClick={() => addTask(sectionIndex)}
//           >
//             Add Task
//           </button>
//           {section.tasks.map((task, taskIndex) => (
//             <div key={task.id} className="bg-gray-100 p-4 rounded mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <input
//                   type="text"
//                   className="border p-2 mb-2 w-full"
//                   placeholder={`Task Title (e.g., ${section.name} TASK 1)`}
//                   value={task.title}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.title`, e.target.value)
//                   }
//                 />
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={() => deleteTask(sectionIndex, taskIndex)}
//                 >
//                   Delete Task
//                 </button>
//               </div>
//               <textarea
//                 className="border p-2 mb-2 w-full"
//                 placeholder="Task Instructions"
//                 value={task.instructions}
//                 onChange={(e) =>
//                   updateField(`${sectionIndex}.tasks.${taskIndex}.instructions`, e.target.value)
//                 }
//               />
//               {section.name === 'WRITING' && (
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="mb-2"
//                   onChange={(e) => handleFileUpload(sectionIndex, taskIndex, e, 'image')}
//                 />
//               )}
//               {section.name === 'LISTENING' && (
//                 <input
//                   type="file"
//                   accept="audio/*"
//                   className="mb-2"
//                   onChange={(e) => handleFileUpload(sectionIndex, taskIndex, e, 'audio')}
//                 />
//               )}
//               {(section.name === 'READING' || section.name === 'LISTENING') && (
//                 <textarea
//                   className="border p-2 mb-2 w-full"
//                   placeholder="Task Content"
//                   value={task.content || ''}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.content`, e.target.value)
//                   }
//                 />
//               )}
//               <textarea
//                 className="border p-2 mb-2 w-full"
//                 placeholder="Optional Text"
//                 value={task.optionalText || ''}
//                 onChange={(e) =>
//                   updateField(`${sectionIndex}.tasks.${taskIndex}.optionalText`, e.target.value)
//                 }
//               />
//               {(section.name === 'WRITING' || section.name === 'READING' || section.name === 'LISTENING') && (
//                 <button
//                   className="bg-green-500 text-white px-4 py-2 rounded mb-4"
//                   onClick={() => addQuestionSet(sectionIndex, taskIndex)}
//                 >
//                   Add Question Set
//                 </button>
//               )}
//               {(section.name === 'WRITING' || section.name === 'READING' || section.name === 'LISTENING') &&
//                 task.questions.map((questionSet, setIndex) => (
//                   <div key={questionSet.set_id} className="bg-white p-4 rounded mb-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <textarea
//                         className="border p-2 mb-2 w-full"
//                         placeholder="Question Set Instructions"
//                         value={questionSet.instructions}
//                         onChange={(e) =>
//                           updateField(
//                             `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.instructions`,
//                             e.target.value
//                           )
//                         }
//                       />
//                       <button
//                         className="bg-red-500 text-white px-2 py-1 rounded"
//                         onClick={() => deleteQuestionSet(sectionIndex, taskIndex, setIndex)}
//                       >
//                         Delete Question Set
//                       </button>
//                     </div>
//                     <textarea
//                       className="border p-2 mb-2 w-full"
//                       placeholder="Optional Text"
//                       value={questionSet.optionalText || ''}
//                       onChange={(e) =>
//                         updateField(
//                           `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.optionalText`,
//                           e.target.value
//                         )
//                       }
//                     />
//                     <div className="flex space-x-2 mb-4">
//                       <button
//                         className="bg-brandRed text-white px-4 py-2 rounded"
//                         onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'short_answer')}
//                       >
//                         Add Short Answer
//                       </button>
//                       <button
//                         className="bg-brandRed text-white px-4 py-2 rounded"
//                         onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'multiple_choice')}
//                       >
//                         Add Multiple Choice
//                       </button>
//                       <button
//                         className="bg-brandRed text-white px-4 py-2 rounded"
//                         onClick={() =>
//                           addQuestion(sectionIndex, taskIndex, setIndex, 'true_false_not_given')
//                         }
//                       >
//                         Add True/False/Not Given
//                       </button>
//                       <button
//                         className="bg-brandRed text-white px-4 py-2 rounded"
//                         onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'table')}
//                       >
//                         Add Table Question
//                       </button>
//                     </div>
//                     {questionSet.questions.map((question, questionIndex) => (
//                       <div key={question.question_id} className="bg-gray-100 p-2 rounded mb-2">
//                         <div className="flex justify-between items-center mb-2">
//                           <input
//                             type="text"
//                             className="border p-2 mb-2 w-full"
//                             placeholder="Question Number (e.g., 1-4)"
//                             value={question.number}
//                             onChange={(e) =>
//                               updateField(
//                                 `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.number`,
//                                 e.target.value
//                               )
//                             }
//                           />
//                           <button
//                             className="bg-red-500 text-white px-2 py-1 rounded"
//                             onClick={() => deleteQuestion(sectionIndex, taskIndex, setIndex, questionIndex)}
//                           >
//                             Delete Question
//                           </button>
//                         </div>
//                         <input
//                           type="text"
//                           className="border p-2 mb-2 w-full"
//                           placeholder="Question Text"
//                           value={question.text}
//                           onChange={(e) =>
//                             updateField(
//                               `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.text`,
//                               e.target.value
//                             )
//                           }
//                         />
//                         {question.type === 'multiple_choice' && (
//                           <div>
//                             {question.options.map((option, optionIndex) => (
//                               <input
//                                 key={optionIndex}
//                                 type="text"
//                                 className="border p-2 mb-2 w-full"
//                                 placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
//                                 value={option}
//                                 onChange={(e) =>
//                                   updateField(
//                                     `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.options.${optionIndex}`,
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                             ))}
//                             <select
//                               className="border p-2 mb-2 w-full"
//                               value={question.answer}
//                               onChange={(e) =>
//                                 updateField(
//                                   `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                   e.target.value
//                                 )
//                               }
//                             >
//                               <option value="">Select Correct Answer</option>
//                               {question.options.map((option, index) => (
//                                 <option key={index} value={option}>
//                                   {option}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         )}
//                         {question.type === 'true_false_not_given' && (
//                           <select
//                             className="border p-2 mb-2 w-full"
//                             value={question.answer}
//                             onChange={(e) =>
//                               updateField(
//                                 `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                 e.target.value
//                               )
//                             }
//                           >
//                             <option value="">Select Answer</option>
//                             {question.options.map((option, index) => (
//                               <option key={index} value={option}>
//                                 {option}
//                               </option>
//                             ))}
//                           </select>
//                         )}
//                         {question.type === 'table' && (
//                           <div>
//                             <div className="flex mb-2">
//                               {question.columns.map((column, colIndex) => (
//                                 <input
//                                   key={colIndex}
//                                   type="text"
//                                   className="flex-1 p-2 border rounded mr-2"
//                                   placeholder={column.isAnswer ? 'Answer Column' : `Column ${colIndex + 1} Label`}
//                                   value={column.label}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.columns.${colIndex}.label`,
//                                       e.target.value
//                                     )
//                                   }
//                                   disabled={column.isAnswer}
//                                 />
//                               ))}
//                             </div>
//                             {question.table.map((row, rowIndex) => (
//                               <div key={rowIndex} className="flex mb-2">
//                                 <input
//                                   type="text"
//                                   className="flex-1 p-2 border rounded mr-2"
//                                   placeholder="Content (e.g., Witness’s family name)"
//                                   value={row.content}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.content`,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                                 <input
//                                   type="text"
//                                   className="flex-1 p-2 border rounded mr-2"
//                                   placeholder="Question (e.g., 1 __________ Susan)"
//                                   value={row.question}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.question`,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                                 <input
//                                   type="text"
//                                   className="flex-1 p-2 border rounded"
//                                   placeholder="Correct Answer (e.g., Jones)"
//                                   value={row.answer}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.answer`,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                               </div>
//                             ))}
//                             <div className="flex space-x-2">
//                               <button
//                                 className="bg-green-500 text-white px-4 py-2 rounded"
//                                 onClick={() => addTableRow(sectionIndex, taskIndex, setIndex, questionIndex)}
//                               >
//                                 Add Row
//                               </button>
//                               <button
//                                 className="bg-green-500 text-white px-4 py-2 rounded"
//                                 onClick={() => addTableColumn(sectionIndex, taskIndex, setIndex, questionIndex)}
//                               >
//                                 Add Column
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                         {question.type === 'short_answer' && (
//                           <input
//                             type="text"
//                             className="border p-2 mb-2 w-full"
//                             placeholder="Correct Answer"
//                             value={question.answer}
//                             onChange={(e) =>
//                               updateField(
//                                 `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                 e.target.value
//                               )
//                             }
//                           />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               {section.name === 'SPEAKING' && (
//                 <textarea
//                   className="border p-2 mb-2 w-full"
//                   placeholder="Correct Answer (e.g., sample response)"
//                   value={task.answer}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.answer`, e.target.value)
//                   }
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       ))}

//       {/* JSON Preview */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">JSON Preview</h2>
//         <textarea
//           className="border p-2 w-full h-64 font-mono text-sm"
//           value={jsonPreview}
//           readOnly
//         />
//       </div>

//       {/* Save Assignment */}
//       <button
//         className="bg-brandRed text-white px-4 py-2 rounded"
//         onClick={saveAssignment}
//       >
//         {selectedAssignmentId ? 'Update Assignment' : 'Save Assignment'}
//       </button>
//     </div>
//   );
// };

// export default CreateAssignment;

// 8.Eight assignment backend integration

// import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import axios from 'axios';

// const CreateAssignment = () => {
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const token = localStorage.getItem('token');
//   const config = { headers: { Authorization: `Token ${token}` } };

//   const initialState = {
//     test_id: uuidv4(),
//     title: '',
//     sections: [],
//   };

//   const [assignment, setAssignment] = useState(initialState);
//   const [assignments, setAssignments] = useState([]);
//   const [jsonPreview, setJsonPreview] = useState('');
//   const [selectedAssignmentId, setSelectedAssignmentId] = useState('');

//   useEffect(() => {
//     fetchAssignments();
//   }, []);

//   useEffect(() => {
//     setJsonPreview(JSON.stringify(assignment, null, 2));
//   }, [assignment]);

//   const fetchAssignments = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/api/assignments/`, config);
//       setAssignments(res.data);
//     } catch (error) {
//       console.error('Error fetching assignments:', error);
//       alert('Failed to fetch assignments');
//     }
//   };

//   const loadAssignment = async (assignmentId) => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/api/assignments/${assignmentId}/`, config);
//       setAssignment(res.data.json_content);
//       setSelectedAssignmentId(assignmentId);
//     } catch (error) {
//       console.error('Error loading assignment:', error);
//       alert('Failed to load assignment');
//     }
//   };

//   const addSection = (type) => {
//     setAssignment({
//       ...assignment,
//       sections: [
//         ...assignment.sections,
//         {
//           section_id: uuidv4(),
//           name: type.toUpperCase(),
//           instructions: '',
//           tasks: [],
//         },
//       ],
//     });
//   };

//   const deleteSection = (sectionIndex) => {
//     const newSections = assignment.sections.filter((_, index) => index !== sectionIndex);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   const addTask = (sectionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks.push({
//       id: uuidv4(),
//       type: 'task',
//       title: '',
//       instructions: '',
//       audio: newSections[sectionIndex].name === 'LISTENING' ? '' : null,
//       image: newSections[sectionIndex].name === 'WRITING' ? '' : null,
//       content: newSections[sectionIndex].name === 'READING' || newSections[sectionIndex].name === 'LISTENING' ? '' : null,
//       optionalText: '',
//       questions: [],
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   const deleteTask = (sectionIndex, taskIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks = newSections[sectionIndex].tasks.filter(
//       (_, index) => index !== taskIndex
//     );
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   const addQuestionSet = (sectionIndex, taskIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks[taskIndex].questions.push({
//       set_id: uuidv4(),
//       instructions: '',
//       optionalText: '',
//       questions: [],
//     });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   const deleteQuestionSet = (sectionIndex, taskIndex, setIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks[taskIndex].questions = newSections[sectionIndex].tasks[
//       taskIndex
//     ].questions.filter((_, index) => index !== setIndex);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   const addQuestion = (sectionIndex, taskIndex, setIndex, type) => {
//     const newSections = [...assignment.sections];
//     const question = {
//       question_id: uuidv4(),
//       number: '',
//       text: '',
//       type,
//       answer: type === 'multiple_choice' || type === 'true_false_not_given' ? '' : type === 'table' ? [] : '',
//     };
//     if (type === 'multiple_choice') {
//       question.options = ['', '', '', ''];
//     } else if (type === 'true_false_not_given') {
//       question.options = ['TRUE', 'FALSE', 'NOT GIVEN'];
//     } else if (type === 'table') {
//       question.table = [
//         { content: '', question: '', answer: '' },
//         { content: '', question: '', answer: '' },
//       ];
//       question.columns = [
//         { label: 'Content', isAnswer: false },
//         { label: 'Question', isAnswer: false },
//         { label: 'Answer', isAnswer: true },
//       ];
//     }
//     newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions.push(question);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   const deleteQuestion = (sectionIndex, taskIndex, setIndex, questionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions = newSections[
//       sectionIndex
//     ].tasks[taskIndex].questions[setIndex].questions.filter((_, index) => index !== questionIndex);
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   const addTableRow = (sectionIndex, taskIndex, setIndex, questionIndex) => {
//     const newSections = [...assignment.sections];
//     newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions[
//       questionIndex
//     ].table.push({ content: '', question: '', answer: '' });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   const addTableColumn = (sectionIndex, taskIndex, setIndex, questionIndex) => {
//     const newSections = [...assignment.sections];
//     const question = newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions[questionIndex];
//     question.columns.splice(question.columns.length - 1, 0, { label: `Column ${question.columns.length}`, isAnswer: false });
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   const updateField = (path, value) => {
//     const newSections = [...assignment.sections];
//     const keys = path.split('.');
//     let current = newSections;
//     for (let i = 0; i < keys.length - 1; i++) {
//       current = current[keys[i]];
//     }
//     current[keys[keys.length - 1]] = value;
//     setAssignment({ ...assignment, sections: newSections });
//   };

//   const handleFileUpload = async (sectionIndex, taskIndex, e, type) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const endpoint = type === 'audio' ? `${API_BASE_URL}/api/api/upload-audio/` : `${API_BASE_URL}/api/api/upload-image/`;
//       const res = await axios.post(endpoint, formData, {
//         headers: {
//           Authorization: `Token ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       const newSections = [...assignment.sections];
//       newSections[sectionIndex].tasks[taskIndex][type] = res.data.file_url;
//       setAssignment({ ...assignment, sections: newSections });
//     } catch (error) {
//       console.error(`Error uploading ${type}:`, error);
//       alert(`Failed to upload ${type}`);
//     }
//   };

//   const saveAssignment = async () => {
//     try {
//       const data = {
//         test_id: assignment.test_id,
//         title: assignment.title,
//         json_content: assignment,
//       };
//       if (selectedAssignmentId) {
//         await axios.put(`${API_BASE_URL}/api/api/assignments/${selectedAssignmentId}/`, data, config);
//         alert('Assignment updated successfully!');
//       } else {
//         await axios.post(`${API_BASE_URL}/api/api/assignments/`, data, config);
//         alert('Assignment created successfully!');
//       }
//       fetchAssignments();
//       clearDraft();
//     } catch (error) {
//       console.error('Error saving assignment:', error);
//       alert('Failed to save assignment');
//     }
//   };

//   const deleteAssignment = async (assignmentId) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/api/api/assignments/${assignmentId}/`, config);
//       fetchAssignments();
//       if (selectedAssignmentId === assignmentId) {
//         clearDraft();
//       }
//     } catch (error) {
//       console.error('Error deleting assignment:', error);
//       alert('Failed to delete assignment');
//     }
//   };

//   const clearDraft = () => {
//     setAssignment({ ...initialState, test_id: uuidv4() });
//     setSelectedAssignmentId('');
//     setJsonPreview(JSON.stringify({ ...initialState, test_id: uuidv4() }, null, 2));
//   };

//   return (
//     <div className="p-6 bg-brandCream min-h-screen">
//       <h1 className="text-3xl font-bold text-brandRed mb-6">Create/Edit Assignment</h1>

//       {/* Assignment Selector */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">Select Assignment</h2>
//         <select
//           value={selectedAssignmentId}
//           onChange={(e) => {
//             const id = e.target.value;
//             if (id) {
//               loadAssignment(id);
//             } else {
//               clearDraft();
//             }
//           }}
//           className="border p-2 mr-2"
//         >
//           <option value="">Create New Assignment</option>
//           {assignments.map((assignment) => (
//             <option key={assignment.id} value={assignment.id}>
//               {assignment.title}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={clearDraft}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Clear Draft
//         </button>
//       </div>

//       {/* Assignment Title */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">Assignment Details</h2>
//         <input
//           type="text"
//           value={assignment.title}
//           onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
//           placeholder="Assignment Title"
//           className="border p-2 mb-2 w-full"
//         />
//       </div>

//       {/* Add Section */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">Add Section</h2>
//         <div className="flex space-x-2">
//           <button
//             className="bg-brandRed text-white px-4 py-2 rounded"
//             onClick={() => addSection('Writing')}
//           >
//             Add Writing
//           </button>
//           <button
//             className="bg-brandRed text-white px-4 py-2 rounded"
//             onClick={() => addSection('Reading')}
//           >
//             Add Reading
//           </button>
//           <button
//             className="bg-brandRed text-white px-4 py-2 rounded"
//             onClick={() => addSection('Listening')}
//           >
//             Add Listening
//           </button>
//           <button
//             className="bg-brandRed text-white px-4 py-2 rounded"
//             onClick={() => addSection('Speaking')}
//           >
//             Add Speaking
//           </button>
//         </div>
//       </div>

//       {/* Sections */}
//       {assignment.sections.map((section, sectionIndex) => (
//         <div key={section.section_id} className="bg-white p-4 rounded shadow mb-6">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-bold text-brandRed">{section.name}</h3>
//             <button
//               className="bg-red-500 text-white px-3 py-1 rounded"
//               onClick={() => deleteSection(sectionIndex)}
//             >
//               Delete Section
//             </button>
//           </div>
//           <textarea
//             className="border p-2 mb-2 w-full"
//             placeholder="Section Instructions"
//             value={section.instructions}
//             onChange={(e) =>
//               updateField(`${sectionIndex}.instructions`, e.target.value)
//             }
//           />
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded mb-4"
//             onClick={() => addTask(sectionIndex)}
//           >
//             Add Task
//           </button>
//           {section.tasks.map((task, taskIndex) => (
//             <div key={task.id} className="bg-gray-100 p-4 rounded mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <input
//                   type="text"
//                   className="border p-2 mb-2 w-full"
//                   placeholder={`Task Title (e.g., ${section.name} TASK 1)`}
//                   value={task.title}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.title`, e.target.value)
//                   }
//                 />
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                   onClick={() => deleteTask(sectionIndex, taskIndex)}
//                 >
//                   Delete Task
//                 </button>
//               </div>
//               <textarea
//                 className="border p-2 mb-2 w-full"
//                 placeholder="Task Instructions"
//                 value={task.instructions}
//                 onChange={(e) =>
//                   updateField(`${sectionIndex}.tasks.${taskIndex}.instructions`, e.target.value)
//                 }
//               />
//               {section.name === 'WRITING' && (
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className="mb-2"
//                   onChange={(e) => handleFileUpload(sectionIndex, taskIndex, e, 'image')}
//                 />
//               )}
//               {section.name === 'LISTENING' && (
//                 <input
//                   type="file"
//                   accept="audio/*"
//                   className="mb-2"
//                   onChange={(e) => handleFileUpload(sectionIndex, taskIndex, e, 'audio')}
//                 />
//               )}
//               {(section.name === 'READING' || section.name === 'LISTENING') && (
//                 <textarea
//                   className="border p-2 mb-2 w-full"
//                   placeholder="Task Content"
//                   value={task.content || ''}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.content`, e.target.value)
//                   }
//                 />
//               )}
//               <textarea
//                 className="border p-2 mb-2 w-full"
//                 placeholder="Optional Text"
//                 value={task.optionalText || ''}
//                 onChange={(e) =>
//                   updateField(`${sectionIndex}.tasks.${taskIndex}.optionalText`, e.target.value)
//                 }
//               />
//               {(section.name === 'WRITING' || section.name === 'READING' || section.name === 'LISTENING') && (
//                 <button
//                   className="bg-green-500 text-white px-4 py-2 rounded mb-4"
//                   onClick={() => addQuestionSet(sectionIndex, taskIndex)}
//                 >
//                   Add Question Set
//                 </button>
//               )}
//               {(section.name === 'WRITING' || section.name === 'READING' || section.name === 'LISTENING') &&
//                 task.questions.map((questionSet, setIndex) => (
//                   <div key={questionSet.set_id} className="bg-white p-4 rounded mb-4">
//                     <div className="flex justify-between items-center mb-2">
//                       <textarea
//                         className="border p-2 mb-2 w-full"
//                         placeholder="Question Set Instructions"
//                         value={questionSet.instructions}
//                         onChange={(e) =>
//                           updateField(
//                             `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.instructions`,
//                             e.target.value
//                           )
//                         }
//                       />
//                       <button
//                         className="bg-red-500 text-white px-2 py-1 rounded"
//                         onClick={() => deleteQuestionSet(sectionIndex, taskIndex, setIndex)}
//                       >
//                         Delete Question Set
//                       </button>
//                     </div>
//                     <textarea
//                       className="border p-2 mb-2 w-full"
//                       placeholder="Optional Text"
//                       value={questionSet.optionalText || ''}
//                       onChange={(e) =>
//                         updateField(
//                           `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.optionalText`,
//                           e.target.value
//                         )
//                       }
//                     />
//                     <div className="flex space-x-2 mb-4">
//                       <button
//                         className="bg-brandRed text-white px-4 py-2 rounded"
//                         onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'short_answer')}
//                       >
//                         Add Short Answer
//                       </button>
//                       <button
//                         className="bg-brandRed text-white px-4 py-2 rounded"
//                         onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'multiple_choice')}
//                       >
//                         Add Multiple Choice
//                       </button>
//                       <button
//                         className="bg-brandRed text-white px-4 py-2 rounded"
//                         onClick={() =>
//                           addQuestion(sectionIndex, taskIndex, setIndex, 'true_false_not_given')
//                         }
//                       >
//                         Add True/False/Not Given
//                       </button>
//                       <button
//                         className="bg-brandRed text-white px-4 py-2 rounded"
//                         onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'table')}
//                       >
//                         Add Table Question
//                       </button>
//                     </div>
//                     {questionSet.questions.map((question, questionIndex) => (
//                       <div key={question.question_id} className="bg-gray-100 p-2 rounded mb-2">
//                         <div className="flex justify-between items-center mb-2">
//                           <input
//                             type="text"
//                             className="border p-2 mb-2 w-full"
//                             placeholder="Question Number (e.g., 1-4)"
//                             value={question.number}
//                             onChange={(e) =>
//                               updateField(
//                                 `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.number`,
//                                 e.target.value
//                               )
//                             }
//                           />
//                           <button
//                             className="bg-red-500 text-white px-2 py-1 rounded"
//                             onClick={() => deleteQuestion(sectionIndex, taskIndex, setIndex, questionIndex)}
//                           >
//                             Delete Question
//                           </button>
//                         </div>
//                         <input
//                           type="text"
//                           className="border p-2 mb-2 w-full"
//                           placeholder="Question Text"
//                           value={question.text}
//                           onChange={(e) =>
//                             updateField(
//                               `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.text`,
//                               e.target.value
//                             )
//                           }
//                         />
//                         {question.type === 'multiple_choice' && (
//                           <div>
//                             {question.options.map((option, optionIndex) => (
//                               <input
//                                 key={optionIndex}
//                                 type="text"
//                                 className="border p-2 mb-2 w-full"
//                                 placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
//                                 value={option}
//                                 onChange={(e) =>
//                                   updateField(
//                                     `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.options.${optionIndex}`,
//                                     e.target.value
//                                   )
//                                 }
//                               />
//                             ))}
//                             <select
//                               className="border p-2 mb-2 w-full"
//                               value={question.answer}
//                               onChange={(e) =>
//                                 updateField(
//                                   `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                   e.target.value
//                                 )
//                               }
//                             >
//                               <option value="">Select Correct Answer</option>
//                               {question.options.map((option, index) => (
//                                 <option key={index} value={option}>
//                                   {option}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         )}
//                         {question.type === 'true_false_not_given' && (
//                           <select
//                             className="border p-2 mb-2 w-full"
//                             value={question.answer}
//                             onChange={(e) =>
//                               updateField(
//                                 `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                 e.target.value
//                               )
//                             }
//                           >
//                             <option value="">Select Answer</option>
//                             {question.options.map((option, index) => (
//                               <option key={index} value={option}>
//                                 {option}
//                               </option>
//                             ))}
//                           </select>
//                         )}
//                         {question.type === 'table' && (
//                           <div>
//                             <div className="flex mb-2">
//                               {question.columns.map((column, colIndex) => (
//                                 <input
//                                   key={colIndex}
//                                   type="text"
//                                   className="flex-1 p-2 border rounded mr-2"
//                                   placeholder={column.isAnswer ? 'Answer Column' : `Column ${colIndex + 1} Label`}
//                                   value={column.label}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.columns.${colIndex}.label`,
//                                       e.target.value
//                                     )
//                                   }
//                                   disabled={column.isAnswer}
//                                 />
//                               ))}
//                             </div>
//                             {question.table.map((row, rowIndex) => (
//                               <div key={rowIndex} className="flex mb-2">
//                                 <input
//                                   type="text"
//                                   className="flex-1 p-2 border rounded mr-2"
//                                   placeholder="Content (e.g., Witness’s family name)"
//                                   value={row.content}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.content`,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                                 <input
//                                   type="text"
//                                   className="flex-1 p-2 border rounded mr-2"
//                                   placeholder="Question (e.g., 1 __________ Susan)"
//                                   value={row.question}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.question`,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                                 <input
//                                   type="text"
//                                   className="flex-1 p-2 border rounded"
//                                   placeholder="Correct Answer (e.g., Jones)"
//                                   value={row.answer}
//                                   onChange={(e) =>
//                                     updateField(
//                                       `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.answer`,
//                                       e.target.value
//                                     )
//                                   }
//                                 />
//                               </div>
//                             ))}
//                             <div className="flex space-x-2">
//                               <button
//                                 className="bg-green-500 text-white px-4 py-2 rounded"
//                                 onClick={() => addTableRow(sectionIndex, taskIndex, setIndex, questionIndex)}
//                               >
//                                 Add Row
//                               </button>
//                               <button
//                                 className="bg-green-500 text-white px-4 py-2 rounded"
//                                 onClick={() => addTableColumn(sectionIndex, taskIndex, setIndex, questionIndex)}
//                               >
//                                 Add Column
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                         {question.type === 'short_answer' && (
//                           <input
//                             type="text"
//                             className="border p-2 mb-2 w-full"
//                             placeholder="Correct Answer"
//                             value={question.answer}
//                             onChange={(e) =>
//                               updateField(
//                                 `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
//                                 e.target.value
//                               )
//                             }
//                           />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               {section.name === 'SPEAKING' && (
//                 <textarea
//                   className="border p-2 mb-2 w-full"
//                   placeholder="Correct Answer (e.g., sample response)"
//                   value={task.answer}
//                   onChange={(e) =>
//                     updateField(`${sectionIndex}.tasks.${taskIndex}.answer`, e.target.value)
//                   }
//                 />
//               )}
//             </div>
//           ))}
//         </div>
//       ))}

//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-2">JSON Preview</h2>
//         <textarea
//           className="border p-2 w-full h-64 font-mono text-sm"
//           value={jsonPreview}
//           readOnly
//         />
//       </div>

//       <button
//         className="bg-brandRed text-white px-4 py-2 rounded"
//         onClick={saveAssignment}
//       >
//         {selectedAssignmentId ? 'Update Assignment' : 'Save Assignment'}
//       </button>
//     </div>
//   );
// };

// export default CreateAssignment;

// 9Nonth
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const CreateAssignment = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Token ${token}` } };

  const initialState = {
    test_id: uuidv4(),
    title: '',
    sections: [],
  };

  const [assignment, setAssignment] = useState(initialState);
  const [assignments, setAssignments] = useState([]);
  const [jsonPreview, setJsonPreview] = useState('');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');

  useEffect(() => {
    fetchAssignments();
  }, []);

  useEffect(() => {
    setJsonPreview(JSON.stringify(assignment, null, 2));
  }, [assignment]);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/api/assignments/`, config);
      setAssignments(res.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      alert('Failed to fetch assignments');
    }
  };

  const loadAssignment = async (assignmentId) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/api/assignments/${assignmentId}/`, config);
      setAssignment(res.data.json_content || initialState);
      setSelectedAssignmentId(assignmentId);
    } catch (error) {
      console.error('Error loading assignment:', error);
      alert('Failed to load assignment');
    }
  };

  const addSection = (type) => {
    setAssignment({
      ...assignment,
      sections: [
        ...assignment.sections,
        {
          section_id: uuidv4(),
          name: type.toUpperCase(),
          instructions: '',
          tasks: [],
        },
      ],
    });
  };

  const deleteSection = (sectionIndex) => {
    const newSections = assignment.sections.filter((_, index) => index !== sectionIndex);
    setAssignment({ ...assignment, sections: newSections });
  };

  const addTask = (sectionIndex) => {
    const newSections = [...assignment.sections];
    newSections[sectionIndex].tasks = newSections[sectionIndex].tasks || [];
    newSections[sectionIndex].tasks.push({
      id: uuidv4(),
      type: 'task',
      title: '',
      instructions: '',
      audio: newSections[sectionIndex].name === 'LISTENING' ? '' : null,
      image: newSections[sectionIndex].name === 'WRITING' ? '' : null,
      content: newSections[sectionIndex].name === 'READING' || newSections[sectionIndex].name === 'LISTENING' ? '' : null,
      optionalText: '',
      questions: newSections[sectionIndex].name !== 'SPEAKING' ? [] : null,
      answer: newSections[sectionIndex].name === 'SPEAKING' ? '' : null,
    });
    setAssignment({ ...assignment, sections: newSections });
  };

  const deleteTask = (sectionIndex, taskIndex) => {
    const newSections = [...assignment.sections];
    newSections[sectionIndex].tasks = newSections[sectionIndex].tasks.filter(
      (_, index) => index !== taskIndex
    );
    setAssignment({ ...assignment, sections: newSections });
  };

  const addQuestionSet = (sectionIndex, taskIndex) => {
    const newSections = [...assignment.sections];
    newSections[sectionIndex].tasks[taskIndex].questions = newSections[sectionIndex].tasks[taskIndex].questions || [];
    newSections[sectionIndex].tasks[taskIndex].questions.push({
      set_id: uuidv4(),
      instructions: '',
      optionalText: '',
      questions: [],
    });
    setAssignment({ ...assignment, sections: newSections });
  };

  const deleteQuestionSet = (sectionIndex, taskIndex, setIndex) => {
    const newSections = [...assignment.sections];
    newSections[sectionIndex].tasks[taskIndex].questions = newSections[sectionIndex].tasks[
      taskIndex
    ].questions.filter((_, index) => index !== setIndex);
    setAssignment({ ...assignment, sections: newSections });
  };

  const addQuestion = (sectionIndex, taskIndex, setIndex, type) => {
    const newSections = [...assignment.sections];
    const question = {
      question_id: uuidv4(),
      number: '',
      text: '',
      type,
      answer: type === 'essay' ? '' : '',
    };
    if (type === 'multiple_choice') {
      question.options = ['', '', '', ''];
    } else if (type === 'true_false_not_given') {
      question.options = ['TRUE', 'FALSE', 'NOT GIVEN'];
    } else if (type === 'table') {
      question.table = [
        { content: '', question: '', answer: '' },
        { content: '', question: '', answer: '' },
      ];
      question.columns = [
        { label: 'Content', isAnswer: false },
        { label: 'Question', isAnswer: false },
        { label: 'Answer', isAnswer: true },
      ];
    }
    newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions = newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions || [];
    newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions.push(question);
    setAssignment({ ...assignment, sections: newSections });
  };

  const deleteQuestion = (sectionIndex, taskIndex, setIndex, questionIndex) => {
    const newSections = [...assignment.sections];
    newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions = newSections[
      sectionIndex
    ].tasks[taskIndex].questions[setIndex].questions.filter((_, index) => index !== questionIndex);
    setAssignment({ ...assignment, sections: newSections });
  };

  const addTableRow = (sectionIndex, taskIndex, setIndex, questionIndex) => {
    const newSections = [...assignment.sections];
    newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions[
      questionIndex
    ].table = newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions[
      questionIndex
    ].table || [];
    newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions[
      questionIndex
    ].table.push({ content: '', question: '', answer: '' });
    setAssignment({ ...assignment, sections: newSections });
  };

  const addTableColumn = (sectionIndex, taskIndex, setIndex, questionIndex) => {
    const newSections = [...assignment.sections];
    const question = newSections[sectionIndex].tasks[taskIndex].questions[setIndex].questions[questionIndex];
    question.columns = question.columns || [];
    question.columns.splice(question.columns.length - 1, 0, { label: `Column ${question.columns.length}`, isAnswer: false });
    setAssignment({ ...assignment, sections: newSections });
  };

  const updateField = (path, value) => {
    if (!assignment.sections) {
      console.error('Sections array is not initialized');
      return;
    }
    const newSections = [...assignment.sections];
    const keys = path.split('.');
    let current = newSections;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        console.error(`Invalid path segment at ${keys[i]} in path ${path}`);
        return;
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setAssignment({ ...assignment, sections: newSections });
  };

  const handleFileUpload = async (sectionIndex, taskIndex, e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const endpoint = type === 'audio' ? `${API_BASE_URL}/api/api/upload-audio/` : `${API_BASE_URL}/api/api/upload-image/`;
      const res = await axios.post(endpoint, formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const newSections = [...assignment.sections];
      newSections[sectionIndex].tasks[taskIndex][type] = res.data.file_url;
      setAssignment({ ...assignment, sections: newSections });
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      alert(`Failed to upload ${type}`);
    }
  };

  const saveAssignment = async () => {
    try {
      const data = {
        test_id: assignment.test_id,
        title: assignment.title,
        json_content: assignment,
      };
      if (selectedAssignmentId) {
        await axios.put(`${API_BASE_URL}/api/api/assignments/${selectedAssignmentId}/`, data, config);
        alert('Assignment updated successfully!');
      } else {
        await axios.post(`${API_BASE_URL}/api/api/assignments/`, data, config);
        alert('Assignment created successfully!');
      }
      fetchAssignments();
      clearDraft();
    } catch (error) {
      console.error('Error saving assignment:', error);
      alert('Failed to save assignment');
    }
  };

  const deleteAssignment = async (assignmentId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/api/assignments/${assignmentId}/`, config);
      fetchAssignments();
      if (selectedAssignmentId === assignmentId) {
        clearDraft();
      }
    } catch (error) {
      console.error('Error deleting assignment:', error);
      alert('Failed to delete assignment');
    }
  };

  const clearDraft = () => {
    setAssignment({ ...initialState, test_id: uuidv4() });
    setSelectedAssignmentId('');
    setJsonPreview(JSON.stringify({ ...initialState, test_id: uuidv4() }, null, 2));
  };

  return (
    <div className="p-6 bg-brandCream min-h-screen">
      <h1 className="text-3xl font-bold text-brandRed mb-6">Create/Edit Assignment</h1>

      {/* Assignment Selector */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Assignment</h2>
        <select
          value={selectedAssignmentId}
          onChange={(e) => {
            const id = e.target.value;
            if (id) {
              loadAssignment(id);
            } else {
              clearDraft();
            }
          }}
          className="border p-2 mr-2"
        >
          <option value="">Create New Assignment</option>
          {assignments.map((assignment) => (
            <option key={assignment.id} value={assignment.id}>
              {assignment.title}
            </option>
          ))}
        </select>
        <button
          onClick={clearDraft}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Draft
        </button>
      </div>

      {/* Assignment Title */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Assignment Details</h2>
        <input
          type="text"
          value={assignment.title || ''}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
          placeholder="Assignment Title"
          className="border p-2 mb-2 w-full"
        />
      </div>

      {/* Add Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Section</h2>
        <div className="flex space-x-2">
          <button
            className="bg-brandRed text-white px-4 py-2 rounded"
            onClick={() => addSection('Writing')}
          >
            Add Writing
          </button>
          <button
            className="bg-brandRed text-white px-4 py-2 rounded"
            onClick={() => addSection('Reading')}
          >
            Add Reading
          </button>
          <button
            className="bg-brandRed text-white px-4 py-2 rounded"
            onClick={() => addSection('Listening')}
          >
            Add Listening
          </button>
          <button
            className="bg-brandRed text-white px-4 py-2 rounded"
            onClick={() => addSection('Speaking')}
          >
            Add Speaking
          </button>
        </div>
      </div>

      {/* Sections */}
      {assignment.sections && assignment.sections.map((section, sectionIndex) => (
        <div key={section.section_id} className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-brandRed">{section.name}</h3>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => deleteSection(sectionIndex)}
            >
              Delete Section
            </button>
          </div>
          <textarea
            className="border p-2 mb-2 w-full"
            placeholder="Section Instructions"
            value={section.instructions || ''}
            onChange={(e) =>
              updateField(`${sectionIndex}.instructions`, e.target.value)
            }
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            onClick={() => addTask(sectionIndex)}
          >
            Add Task
          </button>
          {section.tasks && section.tasks.map((task, taskIndex) => (
            <div key={task.id} className="bg-gray-100 p-4 rounded mb-4">
              <div className="flex justify-between items-center mb-2">
                <input
                  type="text"
                  className="border p-2 mb-2 w-full"
                  placeholder={`Task Title (e.g., ${section.name} TASK 1)`}
                  value={task.title || ''}
                  onChange={(e) =>
                    updateField(`${sectionIndex}.tasks.${taskIndex}.title`, e.target.value)
                  }
                />
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteTask(sectionIndex, taskIndex)}
                >
                  Delete Task
                </button>
              </div>
              <textarea
                className="border p-2 mb-2 w-full"
                placeholder="Task Instructions"
                value={task.instructions || ''}
                onChange={(e) =>
                  updateField(`${sectionIndex}.tasks.${taskIndex}.instructions`, e.target.value)
                }
              />
              {section.name === 'WRITING' && (
                <input
                  type="file"
                  accept="image/*"
                  className="mb-2"
                  onChange={(e) => handleFileUpload(sectionIndex, taskIndex, e, 'image')}
                />
              )}
              {section.name === 'LISTENING' && (
                <input
                  type="file"
                  accept="audio/*"
                  className="mb-2"
                  onChange={(e) => handleFileUpload(sectionIndex, taskIndex, e, 'audio')}
                />
              )}
              {(section.name === 'READING' || section.name === 'LISTENING') && (
                <textarea
                  className="border p-2 mb-2 w-full"
                  placeholder="Task Content"
                  value={task.content || ''}
                  onChange={(e) =>
                    updateField(`${sectionIndex}.tasks.${taskIndex}.content`, e.target.value)
                  }
                />
              )}
              <textarea
                className="border p-2 mb-2 w-full"
                placeholder="Optional Text"
                value={task.optionalText || ''}
                onChange={(e) =>
                  updateField(`${sectionIndex}.tasks.${taskIndex}.optionalText`, e.target.value)
                }
              />
              {section.name === 'SPEAKING' && (
                <textarea
                  className="border p-2 mb-2 w-full"
                  placeholder="Sample Answer for AI Evaluation (e.g., sample speaking response)"
                  value={task.answer || ''}
                  onChange={(e) =>
                    updateField(`${sectionIndex}.tasks.${taskIndex}.answer`, e.target.value)
                  }
                />
              )}
              {(section.name === 'WRITING' || section.name === 'READING' || section.name === 'LISTENING') && (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                  onClick={() => addQuestionSet(sectionIndex, taskIndex)}
                >
                  Add Question Set
                </button>
              )}
              {(section.name === 'WRITING' || section.name === 'READING' || section.name === 'LISTENING') &&
                task.questions && task.questions.map((questionSet, setIndex) => (
                  <div key={questionSet.set_id} className="bg-white p-4 rounded mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <textarea
                        className="border p-2 mb-2 w-full"
                        placeholder="Question Set Instructions"
                        value={questionSet.instructions || ''}
                        onChange={(e) =>
                          updateField(
                            `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.instructions`,
                            e.target.value
                          )
                        }
                      />
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => deleteQuestionSet(sectionIndex, taskIndex, setIndex)}
                      >
                        Delete Question Set
                      </button>
                    </div>
                    <textarea
                      className="border p-2 mb-2 w-full"
                      placeholder="Optional Text"
                      value={questionSet.optionalText || ''}
                      onChange={(e) =>
                        updateField(
                          `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.optionalText`,
                          e.target.value
                        )
                      }
                    />
                    <div className="flex space-x-2 mb-4">
                      <button
                        className="bg-brandRed text-white px-4 py-2 rounded"
                        onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'short_answer')}
                      >
                        Add Short Answer
                      </button>
                      {section.name === 'WRITING' && (
                        <button
                          className="bg-brandRed text-white px-4 py-2 rounded"
                          onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'essay')}
                        >
                          Add Essay
                        </button>
                      )}
                      <button
                        className="bg-brandRed text-white px-4 py-2 rounded"
                        onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'multiple_choice')}
                      >
                        Add Multiple Choice
                      </button>
                      <button
                        className="bg-brandRed text-white px-4 py-2 rounded"
                        onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'true_false_not_given')}
                      >
                        Add True/False/Not Given
                      </button>
                      <button
                        className="bg-brandRed text-white px-4 py-2 rounded"
                        onClick={() => addQuestion(sectionIndex, taskIndex, setIndex, 'table')}
                      >
                        Add Table Question
                      </button>
                    </div>
                    {questionSet.questions && questionSet.questions.map((question, questionIndex) => (
                      <div key={question.question_id} className="bg-gray-100 p-2 rounded mb-2">
                        <div className="flex justify-between items-center mb-2">
                          <input
                            type="text"
                            className="border p-2 mb-2 w-full"
                            placeholder="Question Number (e.g., 1-4)"
                            value={question.number || ''}
                            onChange={(e) =>
                              updateField(
                                `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.number`,
                                e.target.value
                              )
                            }
                          />
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => deleteQuestion(sectionIndex, taskIndex, setIndex, questionIndex)}
                          >
                            Delete Question
                          </button>
                        </div>
                        <input
                          type="text"
                          className="border p-2 mb-2 w-full"
                          placeholder="Question Text"
                          value={question.text || ''}
                          onChange={(e) =>
                            updateField(
                              `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.text`,
                              e.target.value
                            )
                          }
                        />
                        {question.type === 'multiple_choice' && (
                          <div>
                            {question.options && question.options.map((option, optionIndex) => (
                              <input
                                key={optionIndex}
                                type="text"
                                className="border p-2 mb-2 w-full"
                                placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                                value={option || ''}
                                onChange={(e) =>
                                  updateField(
                                    `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.options.${optionIndex}`,
                                    e.target.value
                                  )
                                }
                              />
                            ))}
                            <select
                              className="border p-2 mb-2 w-full"
                              value={question.answer || ''}
                              onChange={(e) =>
                                updateField(
                                  `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select Correct Answer</option>
                              {question.options && question.options.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        {question.type === 'true_false_not_given' && (
                          <select
                            className="border p-2 mb-2 w-full"
                            value={question.answer || ''}
                            onChange={(e) =>
                              updateField(
                                `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Answer</option>
                            {question.options && question.options.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        )}
                        {question.type === 'table' && (
                          <div>
                            <div className="flex mb-2">
                              {question.columns && question.columns.map((column, colIndex) => (
                                <input
                                  key={colIndex}
                                  type="text"
                                  className="flex-1 p-2 border rounded mr-2"
                                  placeholder={column.isAnswer ? 'Answer Column' : `Column ${colIndex + 1} Label`}
                                  value={column.label || ''}
                                  onChange={(e) =>
                                    updateField(
                                      `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.columns.${colIndex}.label`,
                                      e.target.value
                                    )
                                  }
                                  disabled={column.isAnswer}
                                />
                              ))}
                            </div>
                            {question.table && question.table.map((row, rowIndex) => (
                              <div key={rowIndex} className="flex mb-2">
                                <input
                                  type="text"
                                  className="flex-1 p-2 border rounded mr-2"
                                  placeholder="Content (e.g., Witness’s family name)"
                                  value={row.content || ''}
                                  onChange={(e) =>
                                    updateField(
                                      `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.content`,
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="text"
                                  className="flex-1 p-2 border rounded mr-2"
                                  placeholder="Question (e.g., 1 __________ Susan)"
                                  value={row.question || ''}
                                  onChange={(e) =>
                                    updateField(
                                      `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.question`,
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="text"
                                  className="flex-1 p-2 border rounded"
                                  placeholder="Correct Answer (e.g., Jones)"
                                  value={row.answer || ''}
                                  onChange={(e) =>
                                    updateField(
                                      `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.table.${rowIndex}.answer`,
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                            <div className="flex space-x-2">
                              <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => addTableRow(sectionIndex, taskIndex, setIndex, questionIndex)}
                              >
                                Add Row
                              </button>
                              <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => addTableColumn(sectionIndex, taskIndex, setIndex, questionIndex)}
                              >
                                Add Column
                              </button>
                            </div>
                          </div>
                        )}
                        {question.type === 'short_answer' && (
                          <input
                            type="text"
                            className="border p-2 mb-2 w-full"
                            placeholder="Correct Answer"
                            value={question.answer || ''}
                            onChange={(e) =>
                              updateField(
                                `${sectionIndex}.tasks.${taskIndex}.questions.${setIndex}.questions.${questionIndex}.answer`,
                                e.target.value
                              )
                            }
                          />
                        )}
                        {question.type === 'essay' && (
                          <p className="text-gray-500">Essay responses will be evaluated by AI (no predefined answer).</p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
      ))}

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">JSON Preview</h2>
        <textarea
          className="border p-2 w-full h-64 font-mono text-sm"
          value={jsonPreview}
          readOnly
        />
      </div>

      <button
        className="bg-brandRed text-white px-4 py-2 rounded"
        onClick={saveAssignment}
      >
        {selectedAssignmentId ? 'Update Assignment' : 'Save Assignment'}
      </button>
    </div>
  );
};

export default CreateAssignment;