import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db"; 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, questions, answers } = body;

    if (
      !title ||
      !questions ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid data: title and questions are required" },
        { status: 400 }
      );
    }

    const newSurvey = await db.survey.create({
      data: {
        title,
        questions,
      },
    });

    const newResponse = await db.response.create({
      data: {
        surveyId: newSurvey.id,
        answers: answers || [],
      },
    });

    return NextResponse.json(
      {
        survey: newSurvey,
        response: newResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating survey or response:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
