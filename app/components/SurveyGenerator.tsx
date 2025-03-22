"use client";

import React from "react";
import { SparklesIcon, ArrowRightIcon } from "lucide-react";
interface SurveyCreatorProps {
  title: string;
  setTitle: (title: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}
const SurveyGenerator: React.FC<SurveyCreatorProps> = ({
  title,
  setTitle,
  onGenerate,
  isGenerating,
}) => {
  return (
    <div className="p-8 md:p-10 flex flex-col items-center dark:bg-black dark:text-white">
      <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-8">
        <SparklesIcon className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-3 dark:text-white">
        AI Survey Creator
      </h1>
      <p className="text-gray-600 text-center mb-8 max-w-md dark:text-white/70">
        Enter a survey title below and our AI will generate relevant questions
        for your feedback campaign.
      </p>
      <div className="w-full space-y-6">
        <div className="relative">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1 dark:text-white/70"
          >
            Survey Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Customer Satisfaction Survey"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white text-gray-800"
            disabled={isGenerating}
          />
        </div>
        <button
          onClick={onGenerate}
          disabled={!title.trim() || isGenerating}
          className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
            !title.trim() || isGenerating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg"
          }`}
        >
          {isGenerating ? (
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
              Generating Questions...
            </>
          ) : (
            <>
              Generate Questions
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
export default SurveyGenerator;
