import { validate } from './env.validation';

export default () => {
  const envConfig = {
    DB_CONN_STRING: process.env.DB_CONN_STRING,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  };

  const validated = validate(envConfig);

  return {
    database: {
      uri: validated.DB_CONN_STRING,
    },
    cloudinary: {
      cloud_name: validated.CLOUDINARY_CLOUD_NAME,
      api_key: validated.CLOUDINARY_API_KEY,
      api_secret: validated.CLOUDINARY_API_SECRET,
    },
    firebase: {
      project_id: validated.FIREBASE_PROJECT_ID,
      client_email: validated.FIREBASE_CLIENT_EMAIL,
    },
  };
};
