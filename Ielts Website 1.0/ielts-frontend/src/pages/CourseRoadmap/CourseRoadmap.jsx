import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseRoadmap = () => {
  const { courseId } = useParams();
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const token = localStorage.getItem('token');
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${API_BASE_URL}/api/course-roadmap/${courseId}/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setBundles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load roadmap');
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, [courseId]);

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
      <h2 className="text-brandRed text-3xl font-bold mb-6">Course Roadmap</h2>
      {bundles.length === 0 ? (
        <p className="text-gray-600">No roadmap items found for this course.</p>
      ) : (
        <div className="space-y-6">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-brandRed text-lg font-semibold">Step {bundle.order}: {bundle.content_type.charAt(0).toUpperCase() + bundle.content_type.slice(1)}</h3>
              {bundle.content ? (
                <>
                  <p className="text-gray-600">{bundle.description}</p>
                  <h4 className="text-md font-medium mt-2">{bundle.content.title}</h4>
                  {bundle.content_type === 'video' && (
                    <>
                      <p className="text-gray-500">Skill: {bundle.content.skill || 'N/A'}</p>
                      <video controls className="w-full mt-2 rounded-lg">
                        <source src={bundle.content.video_file} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </>
                  )}
                  {bundle.content_type === 'study_material' && (
                    <>
                      <p className="text-gray-500">Skill: {bundle.content.skill || 'N/A'}</p>
                      <a
                        href={bundle.content.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-brandRed px-4 py-2 rounded-lg hover:bg-brandCream hover:text-brandRed transition duration-150 mt-2 inline-block"
                      >
                        View/Download
                      </a>
                    </>
                  )}
                  {bundle.content_type === 'assignment' && (
                    <p className="text-gray-500">Skill: {bundle.content.skill}</p>
                  )}
                </>
              ) : (
                <p className="text-gray-500">Content not available.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseRoadmap;