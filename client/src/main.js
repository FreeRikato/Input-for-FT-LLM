// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6sq2jbQA3O2HFMfeb9ZMiSyTj3ZxRgBc",
  authDomain: "input-for-finetuning-llm.firebaseapp.com",
  projectId: "input-for-finetuning-llm",
  storageBucket: "input-for-finetuning-llm.appspot.com",
  messagingSenderId: "90789948118",
  appId: "1:90789948118:web:575a337c8d74950d0ef777"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

  if (questions.length > 0) {
    try {
      for (const q of questions) {
        await addDoc(collection(db, "questions"), q);
      }
      alert('Questions submitted successfully!');
      document.getElementById('reset-btn').click();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Failed to submit questions. Please try again.');
    }
  } else {
    alert('Please enter at least one question.');
  }
});
