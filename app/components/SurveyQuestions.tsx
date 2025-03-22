"use client";

import React, { useState } from "react";
import { RefreshCwIcon, SendIcon } from "lucide-react";
interface SurveyQuestionsProps {
  title: string;
  questions: string[];
  onReset: () => void;
}
const SurveyQuestions: React.FC<SurveyQuestionsProps> = ({
  title,
  questions,
  onReset,
}) => {
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };
  const handleSubmit = async () => {
    const surveyData = {
      title,
      questions,
      answers,
    };
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(surveyData),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Failed to submit survey");
      }
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting survey:", error);
    }
  };
  if (submitted) {
    return (
      <div className="p-8 md:p-10 flex flex-col items-center dark:bg-black">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-3">
          Thank You!
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Your responses have been recorded successfully.
        </p>
        <button
          onClick={onReset}
          className="flex items-center justify-center py-3 px-6 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <RefreshCwIcon className="mr-2 h-5 w-5" />
          Create New Survey
        </button>
      </div>
    );
  }
  return (
    <div className="p-8 md:p-10 dark:bg-black ">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 dark:text-white">
        {title}
      </h1>
      <div className="space-y-8">
        {questions.map((question, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-black dark:text-white"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-3 dark:text-white/80">
              Question {index + 1}: {question}
            </h3>
            <textarea
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder="Your answer here..."
              rows={3}
              className="text-gray-400 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 dark:bg-black/40"
            />
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <button
          onClick={onReset}
          className="cursor-pointer py-2 px-4 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300"
        >
          <RefreshCwIcon className="inline mr-2 h-4 w-4" />
          Start Over
        </button>
        <button
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="cursor-pointer flex items-center py-2 px-6 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submit
              <SendIcon className="inline ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Submit
              <SendIcon className="inline ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
export default SurveyQuestions;
