import env from "@/app/env.js";
import { Client, Account, Avatars, Databases, Storage } from "appwrite";

// create client
const client = new Client()
  .setEndpoint(env.appwrite.endpoint) // API Endpoint
  .setProject(env.appwrite.projectId); // project ID

// create databases
const databases = new Databases(client);
// create account
const account = new Account(client);
// create avatars
const avatars = new Avatars(client);
// create storage
const storage = new Storage(client);

export { client, databases, account, avatars, storage };
