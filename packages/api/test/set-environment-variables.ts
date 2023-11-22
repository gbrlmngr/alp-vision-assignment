process.env.NODE_ENV = 'test';
process.env.API_PORT = '8081';
process.env.API_GLOBAL_CACHE_TTL = '0';
process.env.API_GLOBAL_THROTTLER_TTL = '1';
process.env.API_GLOBAL_THROTTLER_LIMIT = '30';
process.env.DATABASE_URL =
  'postgresql://postgres:secret@localhost:5432/alp-vision';
