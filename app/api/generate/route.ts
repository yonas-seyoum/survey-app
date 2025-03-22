import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const prompt = requestBody.surveyTitle;

    const body = JSON.stringify({
      model: "command",
      prompt: `Generate five engaging questions for a survey based on the topic: ${prompt}`,
      max_tokens: 300,
      temperature: 0.9,
      stop_sequences: [],
      return_likelihoods: "NONE",
      stream: false,
    });

    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer cJqVjyvSQl6fZDHIMq3p5KafZs59wzsT4FvvtnGl`,
      },
      body,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("API Error:", errorResponse);
      return NextResponse.json({ error: errorResponse.message, status: 500 });
    }

    const responseBody = await response.json();

    const lines = responseBody.generations[0].text.split("\n");

    const questions = lines
      .filter((line: any) => line.trim().endsWith("?"))
      .map((line: any) => line.trim())
      .map((line: any) => line.replace(/^\d+\.\s*/, ""));

    console.log("Extracted questions:", questions);
    return NextResponse.json({
      questions,
      status: 201,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error", status: 500 });
  }
}
