// this will make sure thet all the variables will always be in string
const env = {
  appwrite: {
    endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    apikey: String(process.env.APPWRITE_API_KEY),
    projectName: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME),
  },
};

export default env;
