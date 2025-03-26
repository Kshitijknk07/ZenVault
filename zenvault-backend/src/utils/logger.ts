export const logger = {
  info: (message: string) => {
    const timestamp = new Date().toISOString();
    console.log(`\x1b[36m[INFO]\x1b[0m [${timestamp}] ${message}`);
  },

  error: (message: string) => {
    const timestamp = new Date().toISOString();
    console.error(`\x1b[31m[ERROR]\x1b[0m [${timestamp}] ${message}`);
  },

  warn: (message: string) => {
    const timestamp = new Date().toISOString();
    console.warn(`\x1b[33m[WARN]\x1b[0m [${timestamp}] ${message}`);
  },

  debug: (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      const timestamp = new Date().toISOString();
      console.debug(`\x1b[32m[DEBUG]\x1b[0m [${timestamp}] ${message}`);
    }
  },
};
