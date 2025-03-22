"use client";

import { useState } from "react";
import axios from "axios";
import SurveyGenerator from "./components/SurveyGenerator";
import SurveyQuestions from "./components/SurveyQuestions";
import { useTheme } from "./components/ThemeContext";

export default function Home() {
  const [surveyTitle, setSurveyTitle] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [questions, setQuestions] = useState<string[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await axios.post("/api/generate", { surveyTitle });
      setQuestions(res.data.questions);
      setIsGenerating(false);
      setIsGenerated(true);
    } catch (error) {
      console.error("Error generating questions", error);
    }
  };

  const handleReset = () => {
    setSurveyTitle("");
    setQuestions([]);
    setIsGenerated(false);
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <main className="min-h-screen  bg-slate-50  p-4 md:p-8 flex flex-col items-center justify-center w-full dark:bg-black/90 ">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500">
        <button
          className="cursor-pointer absolute top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded-md"
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
        {!isGenerated ? (
          <>
            <SurveyGenerator
              title={surveyTitle}
              setTitle={setSurveyTitle}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </>
        ) : (
          <SurveyQuestions
            title={surveyTitle}
            questions={questions}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  );
}
