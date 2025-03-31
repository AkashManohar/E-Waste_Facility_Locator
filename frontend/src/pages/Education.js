import { useState } from "react";
import { Info, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../components/ui/button"; 


const questions = [
  {
    question: "What is the best way to dispose of an old smartphone?",
    options: [
      { text: "Throw it in the trash", correct: false },
      { text: "Take it to an e-waste center", correct: true },
      { text: "Store it at home forever", correct: false },
    ],
  },
  {
    question: "Which component of e-waste is most harmful to the environment?",
    options: [
      { text: "Plastic casing", correct: false },
      { text: "Lead & Mercury", correct: true },
      { text: "Glass screen", correct: false },
    ],
  },
  {
    question: "How long does it take for electronic waste to decompose?",
    options: [
      { text: "1-2 years", correct: false },
      { text: "100+ years", correct: true },
      { text: "It decomposes instantly", correct: false },
    ],
  },
];

export default function Education() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerClick = (isCorrect) => {
    setSelectedAnswer(isCorrect);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold text-green-700">E-Waste Education Center</h1>
      <p className="text-lg text-gray-600 mt-2 max-w-3xl">
        Learn how e-waste impacts the environment and how you can make a difference by recycling responsibly.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Info className="w-12 h-12 text-blue-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-2">What is E-Waste?</h2>
          <p className="text-gray-600 mt-2">E-waste includes discarded electronic devices like phones, laptops, and appliances.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <XCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-2">Harmful Effects</h2>
          <p className="text-gray-600 mt-2">Toxic chemicals from e-waste can pollute soil, water, and air, harming human health.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          <h2 className="text-xl font-semibold mt-2">How to Recycle?</h2>
          <p className="text-gray-600 mt-2">Find certified e-waste recycling centers to dispose of your old electronics responsibly.</p>
        </div>
      </div>

      <button onClick={() => setShowQuiz(true)} className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
        Take the E-Waste Quiz
      </button>

      {showQuiz && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md max-w-xl">
          {showResult ? (
            <div>
              <h2 className="text-2xl font-bold text-green-700">Quiz Completed! 🎉</h2>
              <p className="text-lg mt-3">Your Score: {score} / {questions.length}</p>
              <Button className="mt-4" onClick={() => window.location.reload()}>Restart Quiz</Button>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-green-700">Quick Quiz</h2>
              <p className="text-lg text-gray-700 mt-2">{questions[currentQuestion].question}</p>
              <div className="mt-4 space-y-2">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    className={`w-full py-3 text-lg font-semibold rounded-md ${
                      selectedAnswer === null
                        ? "bg-gray-200 hover:bg-gray-300"
                        : option.correct
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                    disabled={selectedAnswer !== null}
                    onClick={() => handleAnswerClick(option.correct)}
                  >
                    {option.text}
                    {selectedAnswer !== null && option.correct && <CheckCircle className="inline ml-2" />}
                    {selectedAnswer !== null && !option.correct && <XCircle className="inline ml-2" />}
                  </Button>
                ))}
              </div>
              {selectedAnswer !== null && (
                <Button className="mt-4 bg-blue-600 text-white" onClick={nextQuestion}>Next</Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
