import React, { useReducer } from 'react';

const initialState = {
  questions: [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      answer: 'Paris',
      selectedOption: null,
    },
    {
      id: 2,
      question: 'What is the capital of Spain?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      answer: 'Madrid',
      selectedOption: null,
    },
    {
      id: 3,
      question: 'What is the capital of Germany?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      answer: 'Berlin',
      selectedOption: null,
    },
  ],
  isCompleted: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_OPTION':
      return {
        ...state,
        questions: state.questions.map((question) =>
          question.id === action.payload.questionId
            ? { ...question, selectedOption: action.payload.option }
            : question
        ),
      };
    case 'COMPLETE_QUIZ':
      return { ...state, isCompleted: true };
    default:
      return state;
  }
};

const QuizApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSelectOption = (questionId, option) => {
    dispatch({ type: 'SELECT_OPTION', payload: { questionId, option } }); 
    // intha "disptach tha "action" refer pannuthu so oru object "dot" use pannitha edupom
    // so athu nala tha switch case la  action.payload use pannirukom ipo action.payload 
    // kudurapa questionid or option varum so athula ethu venummo atha nama choose
  };

  const handleCompleteQuiz = () => {
    dispatch({ type: 'COMPLETE_QUIZ' });
  };

  const { questions, isCompleted } = state;

  const allAnswersCorrect = questions.every(
    (question) => question.selectedOption === question.answer
  );

return (
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-md ">
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-purple-700">Quiz</h2>
        {!isCompleted ? (
          <div>
            {questions.map((question) => (
              <div key={question.id} className="mb-4">
                <h3 className="block text-base font-bold text-gray-700">{question.question}</h3>
                <ul className="mt-1">
                  {question.options.map((option) => (
                    <li key={option} className="py-2 hover:bg-purple-500 duration-200">
                      <label className="">
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option}
                          disabled={question.selectedOption !== null}
                          onChange={() => handleSelectOption(question.id, option)}
                          className="mx-1 px-3 "
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button
              onClick={handleCompleteQuiz}
              disabled={!questions.every((q) => q.selectedOption)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
              Complete Quiz
            </button>
          </div>
        ) : (
          <p className="text-xl font-semibold mt-4">
            {allAnswersCorrect ? 'Congratulations! You got all answers correct!' : 'Try again!'}
          </p>
        )}
      </div>
    );
  };
  

export default QuizApp;
