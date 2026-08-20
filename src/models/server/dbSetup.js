import { db } from "../name.js";
import createAnswerCollection from "./answer.collection.js";
import createCommentCollection from "./comment.collection.js";
import createQuestionCollection from "./question.collection.js";
import createVoteCollection from "./vote.collection.js";
import { databases } from "./config.js";

export default async function getOrCreateDB() {
  try {
    // check for existing db
    await databases.get(db);
    console.log("Database connected");
  } catch (error) {
    try {
      // create a new db
      await databases.create(db, db);
      console.log("Database created");
      // create and excute all the collections
      await Promise.all([
        createAnswerCollection(),
        createCommentCollection(),
        createQuestionCollection(),
        createVoteCollection(),
      ]);
      console.log("Collections are collected");
      console.log("Database connected");
    } catch (error) {
      console.log("Error createing databases or collection", error);
    }
  }
  return databases;
}
