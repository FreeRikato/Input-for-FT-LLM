let questionCount = 1;

document.getElementById('next-btn').addEventListener('click', () => {
  questionCount++;
  const questionsContainer = document.getElementById('questions-container');
  const newQuestionLabel = document.createElement('label');
  newQuestionLabel.setAttribute('for', `question-${questionCount}`);
  newQuestionLabel.className = 'block text-lg font-medium mb-2 text-gray-700';
  newQuestionLabel.innerHTML = `<strong>Your Question ${questionCount}:</strong>`;
  
  const newQuestionTextarea = document.createElement('textarea');
  newQuestionTextarea.id = `question-${questionCount}`;
  newQuestionTextarea.rows = 4;
  newQuestionTextarea.className = 'block p-2 mb-4 border rounded-lg text-gray-700';
  
  questionsContainer.appendChild(newQuestionLabel);
  questionsContainer.appendChild(newQuestionTextarea);
});

document.getElementById('reset-btn').addEventListener('click', () => {
  questionCount = 1;
  const questionsContainer = document.getElementById('questions-container');
  questionsContainer.innerHTML = `
    <label for="question-1" class="block text-lg font-medium mb-2 text-gray-700"><strong>Your Question 1:</strong></label>
    <textarea id="question-1" rows="4" class="block p-2 mb-4 border rounded-lg text-gray-700"></textarea>
  `;
});

document.getElementById('submit-btn').addEventListener('click', async () => {
  const careerPath = document.getElementById('career-path').value;
  const questions = [];

  for (let i = 1; i <= questionCount; i++) {
    const question = document.getElementById(`question-${i}`).value;
    if (question) {
      questions.push({ career_path: careerPath, question: question });
    }
  }
  // const base_url = "http://localhost:3000"
  // const base_url = "http://192.168.0.51:3000"
  const base_url = "https://input-for-ft-llm.onrender.com"
  if (questions.length > 0) {
    try {
      const response = await fetch(`${base_url}/submit_questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ questions: questions })
      });

      if (response.ok) {
        alert('Questions submitted successfully!');
        document.getElementById('reset-btn').click();
      } else {
        alert('Failed to submit questions.');
      }
    } catch (error) {
      alert('Failed to submit questions. Please check your network connection and try again.');
    }
  } else {
    alert('Please enter at least one question.');
  }
});
