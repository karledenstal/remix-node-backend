declare global {
  namespace NodeJS { // eslint-disable-line
    interface ProcessEnv { // eslint-disable-line
      NODE_ENV: 'development' | 'production';
      MONGO_PATH: string;
      MONGO_USER: string;
      MONGO_PASS: string;
      MONGO_AUTH_SOURCE: string;
      MONGO_DB: string;
      PORT?: string;
      JWT_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
