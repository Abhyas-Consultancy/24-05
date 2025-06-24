import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SkillContent = () => {
  const { skill } = useParams();
  const [content, setContent] = useState({ videos: [], study_materials: [], assignments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const token = localStorage.getItem('token');
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${API_BASE_URL}/api/skill-content/${skill}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setContent(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load content');
        setLoading(false);
      }
    };
    fetchContent();
  }, [skill]);

  if (loading) return <div className="text-center mt-10 text-brandRed">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="bg-brandCream min-h-screen p-6">
      <button
        onClick={() => navigate('/student-dashboard')}
        className="mb-4 bg-brandRed text-white px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150"
      >
        Back to Dashboard
      </button>
      <h2 className="text-brandRed text-3xl font-bold mb-6 capitalize">{skill} Content</h2>

      <div className="mb-8">
        <h3 className="text-brandRed text-xl font-semibold mb-4">Videos</h3>
        {content.videos.length === 0 ? (
          <p className="text-gray-600">No videos available for this skill.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.videos.map((video) => (
              <div key={video.id} className="bg-white p-4 rounded-lg shadow-lg">
                <h4 className="text-brandRed text-lg font-semibold">{video.title}</h4>
                <p className="text-gray-600">{video.description}</p>
                <video controls className="w-full mt-2 rounded-lg">
                  <source src={video.video_file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-brandRed text-xl font-semibold mb-4">Study Materials</h3>
        {content.study_materials.length === 0 ? (
          <p className="text-gray-600">No study materials available for this skill.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.study_materials.map((material) => (
              <div key={material.id} className="bg-white p-4 rounded-lg shadow-lg">
                <h4 className="text-brandRed text-lg font-semibold">{material.title}</h4>
                <p className="text-gray-600">{material.description}</p>
                <a
                  href={material.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 mt-2 inline-block"
                >
                  View/Download
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-brandRed text-xl font-semibold mb-4">Assignments</h3>
        {content.assignments.length === 0 ? (
          <p className="text-gray-600">No assignments available for this skill.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.assignments.map((assignment) => (
              <div key={assignment.id} className="bg-white p-4 rounded-lg shadow-lg">
                <h4 className="text-brandRed text-lg font-semibold">{assignment.title}</h4>
                <p className="text-gray-600">{assignment.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillContent;