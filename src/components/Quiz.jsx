import React, { useEffect, useRef, useState } from "react";
import { data } from "../utils/Question.js";
// import { FaCheckCircle } from "react-icons/fa";
// import { FaTimesCircle } from "react-icons/fa";

{
  /* <FaCheckCircle /> */
}
{
  /* <FaTimesCircle /> */
}

function Quiz() {
  let [score, setScore] = useState(0);
  let [wrongScore, setWrongScore] = useState(0);
  let [lock, setLock] = useState(false);
  let [index, setindex] = useState(0);
  let [result, setReasult] = useState(false);
  let [correctParcentage, setCorrectParcentage] = useState(0);
  let [inCorrectParcentage, setInCorrectParcentage] = useState(0);
  let totalAnswer = data.length;
  let correctAnswer = score;
  let incorrectAnswer = wrongScore;
  let question = data[index];
  let option1Ref = useRef(null);
  let option2Ref = useRef(null);
  let option3Ref = useRef(null);
  let option4Ref = useRef(null);
  let options = [option1Ref, option2Ref, option3Ref, option4Ref];
  useEffect(() => {
    let correctAnswerParcentage = (correctAnswer / totalAnswer) * 100;
    let inCorrectAnswerParcentage = (incorrectAnswer / totalAnswer) * 100;
    setCorrectParcentage(correctAnswerParcentage);
    setInCorrectParcentage(inCorrectAnswerParcentage);
  }, [correctAnswer, totalAnswer, incorrectAnswer]);
  let checkAnswer = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
        // setCorrectParcentage(correctAnswerParcentage);
      } else {
        e.target.classList.add("incorrect");

        // setInCorrectParcentage(inCorrectAnswerParcentage);
        setWrongScore((prev) => prev + 1);

        options[question.ans - 1].current.classList.add("correct");
        setLock(true);
      }
    }
  };
  let next = () => {
    if (index === data.length - 1) {
      setReasult(true);
      return 0;
    }
    if (lock === true) {
      setindex((prev) => prev + 1);
      setLock(false);

      options.map((element) => {
        element.current.classList.remove("correct");
        element.current.classList.remove("incorrect");
      });
    }
  };
  return (
    <div className="flex justify-center items-center py-6">
      <div
        className="min-w-[60%]
        px-10 py-10
     bg-white flex flex-col gap-5 rounded-2xl shadow-lg"
      >
        <h1 className="text-left font-bold text-2xl mb-2 text-gray-700">
          Quiz App
        </h1>
        <hr />

        {result ? (
          <div className="flex flex-col gap-7">
            <h1 className="text-2xl font-bold mb-3">Quiz Completed</h1>
            <h1 className="text-xl mb-3">Your Score Is {score}/ 5</h1>

            <div className=" w-full flex flex-col justify-end items-end">
              <div className="w-full flex justify-between">
                <div className="mb-2">
                  <h1 className="text-md">Max Score:100%</h1>
                </div>
                <div className="mb-2">
                  <h1 className="text-md">
                    Correct Answer Score:{correctParcentage}%
                  </h1>
                </div>
              </div>
              <div className="relative w-[100%] h-3 rounded-full bg-gray-300">
                <div
                  className="transition-all absolute h-[100%] top-0 bg-green-500 rounded-xl duration-75"
                  style={{
                    width: `${correctParcentage}%`,
                  }}
                ></div>
                <div
                  className="h-[100%] top-0 transition-all absolute bg-red-500 rounded-xl duration-75
                  "
                  style={{
                    width: `${inCorrectParcentage}%`,
                  }}
                ></div>
                {/* <div className="w-[80%] h-7 transition-all absolute bg-blue rounded-xl"></div> */}
              </div>
            </div>
            <div>
              <button
                type="button"
                className="py-2 px-14 rounded-md bg-blue-500 text-white text-xl font-bold hover:bg-blue-600 transition-all cursor-pointer
              "
                onClick={() => {
                  setindex(0);
                  setReasult(false);
                  setScore(0);
                  setCorrectParcentage(0);
                  setInCorrectParcentage(0);
                  setWrongScore(0);
                }}
              >
                Restart Quiz
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-7">
            <div>
              <h1 className="text-left text-lg">
                {index + 1}.{question.question}
              </h1>
            </div>

            <div className="flex flex-col gap-5">
              <div
                ref={option1Ref}
                className="py-3 px-5 border-1 border-gray-300 text-left text-md rounded-lg"
                onClick={(e) => checkAnswer(e, 1)}
              >
                {question.option1}
              </div>
              <div
                ref={option2Ref}
                className="py-3 px-5 border-1 border-gray-300 text-left text-md rounded-lg"
                onClick={(e) => checkAnswer(e, 2)}
              >
                {question.option2}
              </div>
              <div
                ref={option3Ref}
                className="py-3 px-5 border-1 border-gray-300 text-left text-md rounded-lg"
                onClick={(e) => checkAnswer(e, 3)}
              >
                {question.option3}
              </div>
              <div
                className="py-3 px-5 border-1 border-gray-300 text-left text-md rounded-lg"
                ref={option4Ref}
                onClick={(e) => checkAnswer(e, 4)}
              >
                {question.option4}
              </div>
            </div>

            <div>
              <button
                type="button"
                className="py-2 px-14 rounded-md bg-blue-500 text-white text-lg font-bold hover:bg-blue-600 transition-all cursor-pointer w-full"
                onClick={next}
              >
                Next Question
              </button>
            </div>

            <div className=" w-full flex flex-col justify-end items-end">
              <div className="w-full flex justify-between">
                <div className="mb-2">
                  <h1 className="text-md">Max Score:100%</h1>
                </div>
                <div className="mb-2">
                  <h1 className="text-md">
                    Correct Answer Score:{correctParcentage}%
                  </h1>
                </div>
              </div>
              <div className="relative w-[100%] h-3 rounded-full bg-gray-300">
                <div
                  className="transition-all absolute h-[100%] top-0 bg-green-500 rounded-xl duration-75"
                  style={{
                    width: `${correctParcentage}%`,
                  }}
                ></div>
                <div
                  className="h-[100%] top-0 transition-all absolute bg-red-500 rounded-xl duration-75
                  "
                  style={{
                    width: `${inCorrectParcentage}%`,
                  }}
                ></div>
                {/* <div className="w-[80%] h-7 transition-all absolute bg-blue rounded-xl"></div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
