import { Permission } from "node-appwrite";

import { db, questionCollection } from "../name.js";
import { databases } from "./config.js";

export default async function createQuestionCollection() {
  // create collection
  await databases.createCollection(db, questionCollection, questionCollection, [
    Permission.read("any"),
    Permission.read("users"),
    Permission.create("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Question collection is created");

  // create attributes of question collection

  await Promise.all([
    databases.createStringAttribute(db, questionCollection, "title", 100, true),
    databases.createStringAttribute(
      db,
      questionCollection,
      "content",
      10000,
      true,
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      "autherId",
      50,
      true,
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      "tags",
      50,
      true,
      undefined,
      true,
    ),
    databases.createStringAttribute(
      db,
      questionCollection,
      "attachmentId",
      100,
      false,
    ),
  ]);
  console.log("Question Attributes created");

  // create indexes of question collection
  /*
  await Promise.all([
    databases.createIndex(
      db,
      questionCollection,
      "title",
      "fulltext",
      ["title"],
      ["asc"],
    ),
    databases.createIndex(
      db,
      questionCollection,
      "content",
      "fulltext",
      ["content"],
      ["asc"],
    ),
  ]); */
}
