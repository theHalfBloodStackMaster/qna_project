import env from "@/app/env.js";
import { Avatars, Client, Databases, Storage, Users } from "node-appwrite";

// create client
let client = new Client();

client
  .setEndpoint(env.appwrite.endpoint) // API Endpoint
  .setProject(env.appwrite.projectId) // project ID
  .setKey(env.appwrite.apikey); // secret API key

// create databases
const databases = new Databases(client);
// create storage
const storage = new Storage(client);
// create users
const users = new Users(client);
// create avatars
const avatars = new Avatars(client);

export { client, databases, storage, users, avatars };
