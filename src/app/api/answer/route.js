import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config.js";
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request) {
  try {
    // while craeting answers, attributes are to be taken care
    // attributes of ansers are -> content, questionId, autherId
    const { questionId, answer, authorId } = await request.json();

    // create document with the given answer
    const response = await databases.createDocument(db, answer, ID.unique(), {
      content: answer,
      authorId: authorId,
      questionId: questionId,
    });

    // increase reputation of author after posting answer
    const prefs = await users.getPrefs(authorId);
    await users.updatePrefs(authorId, {
      reputation: Number(prefs.reputation) + 1,
    });

    // return response
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.message || "Error creating answer",
      },
      { status: error?.status || error?.code || 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    // fetch the answer
    const { answerId } = await request.json();

    const answer = await databases.getDocument(db, answerCollection, answerId);

    // remove content, questionId, authorID
    const answerResponse = await databases.deleteDocument(
      db,
      answerCollection,
      answerId,
    );

    // decrease author reputation
    const prefs = await users.getPrefs(answer.authorId);
    await users.updatePrefs(answer.authorId, {
      reputation: Number(prefs.reputation) - 1,
    });

    // return response
    return NextResponse.json({ data: answerResponse }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error?.message || "Error deleting answer",
      },
      { status: error?.status || error?.code || 500 },
    );
  }
}
