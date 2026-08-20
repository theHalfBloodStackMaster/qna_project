import { Permission, IndexType } from "node-appwrite";

import { db, questionCollection } from "../name.js";
import { databases } from "./config.js";

export default async function createQuestionCollection() {
  // create collection
  await databases.createCollection(db, questionCollection, questionCollection, [
    Permission.read("any"),
    Permission.read("Users"),
    Permission.create("Users"),
    Permission.update("Users"),
    Permission.delete("Users"),
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
  await Promise.all([
    databases.createIndex(
      db,
      questionCollection,
      "title",
      IndexType.FullText,
      ["title"],
      ["asc"],
    ),
    databases.createIndex(
      db,
      questionCollection,
      "content",
      IndexType.FullText,
      ["content"],
      ["asc"],
    ),
  ]);
}
