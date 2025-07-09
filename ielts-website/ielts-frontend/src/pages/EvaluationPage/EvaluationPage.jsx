import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EvaluationPage = () => {
  const { submissionId } = useParams();
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await fetch(`/api/evaluations/${submissionId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Failed to fetch evaluation');
        const data = await response.json();
        setEvaluation(data);
      } catch (error) {
        console.error('Failed to fetch evaluation:', error);
      }
    };
    fetchEvaluation();
  }, [submissionId]);

  if (!evaluation) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Evaluation for Submission {submissionId}</h1>
      <h2 className="text-xl mt-4">Overall Feedback</h2>
      <p className="whitespace-pre-line">{evaluation.overall_feedback}</p>
      <h2 className="text-xl mt-4">Analytics</h2>
      <p>Total Questions: {evaluation.analytics.total_questions}</p>
      <p>Correct Answers: {evaluation.analytics.correct_answers}</p>
      <p>Accuracy: {evaluation.analytics.accuracy_percentage}%</p>
      <p>Score: {evaluation.analytics.score}</p>
      <h2 className="text-xl mt-4">Question-by-Question Results</h2>
      <ul>
        {evaluation.results.map(result => (
          <li key={result.question_id} className="mt-2">
            <p><strong>Question ID:</strong> {result.question_id}</p>
            <p><strong>Status:</strong> {result.status}</p>
            <p><strong>Submitted Answer:</strong> {result.submitted_answer}</p>
            <p><strong>Correct Answer:</strong> {result.correct_answer || 'N/A'}</p>
            <p><strong>Scores:</strong></p>
            <ul>
              <li>Task Achievement: {result.scores.task_achievement}</li>
              <li>Coherence and Cohesion: {result.scores.coherence_cohesion}</li>
              <li>Lexical Resource: {result.scores.lexical_resource}</li>
              <li>Grammatical Range: {result.scores.grammatical_range}</li>
              <li>Overall: {result.scores.overall}</li>
            </ul>
            <p><strong>Feedback:</strong> {typeof result.feedback === 'object' ? JSON.stringify(result.feedback) : result.feedback}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EvaluationPage;