declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'test';
      API_PORT: string;
      API_GLOBAL_CACHE_TTL: string;
      API_GLOBAL_THROTTLER_TTL: string;
      API_GLOBAL_THROTTLER_LIMIT: string;
      DATABASE_URL: string;
    }
  }
}

export {};
