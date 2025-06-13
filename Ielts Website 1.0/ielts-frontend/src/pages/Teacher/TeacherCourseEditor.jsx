import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherCourseEditor = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Token ${token}` } };

  const [modules, setModules] = useState([]);
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(1);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/courses/${courseId}/modules/`, config);

    setModules(res.data);
  };

  const addModule = async () => {
    await axios.post(`${API_BASE_URL}/api/courses/${courseId}/modules/`, { title, order }, config);
    setTitle("");
    setOrder(order + 1);
    fetchModules();
  };

  const deleteModule = async (order) => {
    await axios.delete(`${API_BASE_URL}/api/modules/${order}/`, config);
    fetchModules();
  };

  const addBundle = async (order, contentType, contentId, description) => {
    await axios.post(`${API_BASE_URL}/api/modules/${order}/bundles/`, { order: order,content_type: contentType, content_id: contentId, description }, config);
    fetchModules();
  };

  const deleteBundle = async (bundleId) => {
    await axios.delete(`${API_BASE_URL}/api/bundles/${bundleId}/`, config);
    fetchModules();
  };

  return (
    <div className="p-6 bg-brandCream min-h-screen">
      <h1 className="text-3xl font-bold text-brandRed mb-6">Edit Course Roadmap</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Add Module</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Module Title" className="border p-2 mr-2" />
        <input value={order} onChange={(e) => setOrder(Number(e.target.value))} type="number" placeholder="order" className="border p-2 mr-2 w-24" />
        <button onClick={addModule} className="bg-brandRed text-white px-4 py-2 rounded">Add Module</button>
      </div>

      {modules.map(module => (
        <div key={module.id} className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-brandRed">Module {module.order}: {module.title}</h3>
            <button onClick={() => deleteModule(module.id)} className="text-white bg-red-500 px-3 py-1 rounded">Delete Module</button>
          </div>

          <BundlesEditor module={module} addBundle={addBundle} deleteBundle={deleteBundle} />
        </div>
      ))}
    </div>
  );
};

const BundlesEditor = ({ module, addBundle, deleteBundle }) => {
  const [contentType, setContentType] = useState("video");
  const [contentId, setContentId] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Add Bundle</h4>
        <select value={contentType} onChange={(e) => setContentType(e.target.value)} className="border p-2 mr-2">
          <option value="video">Video</option>
          <option value="study_material">Study Material</option>
          <option value="assignment">Assignment</option>
        </select>
        <input value={contentId} onChange={(e) => setContentId(e.target.value)} placeholder="Content ID" className="border p-2 mr-2 w-24" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border p-2 mr-2" />
        <button onClick={() => addBundle(module.id, contentType, contentId, description)} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
      </div>

      {/* <div>
        {module.bundles.map(bundle => (
          <div key={bundle.id} className="flex justify-between items-center p-2 border rounded mb-2">
            <p>{bundle.content_type.toUpperCase()} (ID: {bundle.content_id}) - {bundle.description}</p>
            <button onClick={() => deleteBundle(bundle.id)} className="text-white bg-red-500 px-3 py-1 rounded">Delete</button>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default TeacherCourseEditor;
