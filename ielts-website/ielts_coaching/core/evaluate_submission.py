def evaluate_submission(submission, assignment):
    """
    Evaluate a submission by comparing answers with the correct answers from the assignment.
    Returns evaluation results and analytics.
    """
    results = []
    correct_count = 0
    total_questions = 0
    suggestions = []

    # Extract questions from assignment
    questions_by_id = {}
    for section in assignment['json_content']['sections']:
        for task in section['tasks']:
            for question_set in task['questions']:
                for question in question_set['questions']:
                    key = f"{section['section_id']}_{task['id']}_{question['question_id']}"
                    questions_by_id[key] = question

    # Compare answers
    for key, submitted_answer in submission['answers'].items():
        if key not in questions_by_id:
            results.append({
                'question_id': key,
                'status': 'invalid',
                'submitted_answer': submitted_answer,
                'correct_answer': None,
                'scores': {
                    'task_achievement': 0,
                    'coherence_cohesion': 0,
                    'lexical_resource': 0,
                    'grammatical_range': 0,
                    'overall': 0
                },
                'feedback': 'Invalid question ID'
            })
            continue

        question = questions_by_id[key]
        correct_answer = question['answer']
        total_questions += 1

        # For short answer, MCQ, true/false, and table questions
        if question['type'] in ['short_answer', 'multiple_choice', 'true_false_not_given', 'table']:
            is_correct = False
            analysis = ""
            score = 0

            if question['type'] == 'table':
                correct_answer = correct_answer if isinstance(correct_answer, list) else [correct_answer]
                submitted_answer = submitted_answer if isinstance(submitted_answer, list) else [submitted_answer]
                correct_count_table = sum(
                    1 for s, c in zip(submitted_answer, correct_answer)
                    if str(s).strip().lower() == str(c).strip().lower()
                )
                total = len(correct_answer) if correct_answer else 1
                score = (correct_count_table / total) * 9
                is_correct = correct_count_table == total
                analysis = f"{'All' if is_correct else f'{correct_count_table}/{total}'} answers correct."
            else:
                is_correct = str(submitted_answer).strip().lower() == str(correct_answer).strip().lower()
                score = 9 if is_correct else 0
                analysis = "Correct" if is_correct else f"Incorrect. Expected: {correct_answer}"

                # Check for spelling issues
                if question['type'] == 'short_answer' and len(str(submitted_answer)) > 3:
                    if 'pessimistic' in correct_answer.lower() and 'passamistic' in submitted_answer.lower():
                        suggestions.append(f"Question {question['number']}: Correct spelling is 'pessimistic', not 'passamistic'.")
                    elif not is_correct:
                        suggestions.append(f"Question {question['number']}: Incorrect answer '{submitted_answer}'. Correct answer is '{correct_answer}'.")

            results.append({
                'question_id': key,
                'status': 'correct' if is_correct else 'incorrect',
                'submitted_answer': submitted_answer,
                'correct_answer': correct_answer,
                'scores': {
                    'task_achievement': score,
                    'coherence_cohesion': score,
                    'lexical_resource': score,
                    'grammatical_range': score,
                    'overall': score
                },
                'feedback': analysis
            })
            if is_correct:
                correct_count += 1

    # Generate analytics
    accuracy = (correct_count / total_questions) * 100 if total_questions > 0 else 0
    analytics = {
        'total_questions': total_questions,
        'correct_answers': correct_count,
        'accuracy_percentage': round(accuracy, 2),
        'score': round(sum(r['scores']['overall'] for r in results) / total_questions, 1) if total_questions > 0 else 0,
        'suggestions': suggestions
    }

    # Overall evaluation
    overall_feedback = f"Submission for {assignment['title']} (ID: {submission['id']}) evaluated.\n"
    overall_feedback += f"Accuracy: {analytics['accuracy_percentage']}% ({correct_count}/{total_questions} correct).\n"
    if accuracy >= 80:
        overall_feedback += "Strong performance. Focus on minor errors to improve further.\n"
    elif accuracy >= 60:
        overall_feedback += "Good effort. Review incorrect answers and suggestions for improvement.\n"
    else:
        overall_feedback += "Significant improvement needed. Study the material and focus on key concepts.\n"
    overall_feedback += "\nSuggestions for Improvement:\n" + "\n".join(suggestions) if suggestions else "\nNo specific suggestions."

    return {
        'results': results,
        'analytics': analytics,
        'overall_feedback': overall_feedback
    }