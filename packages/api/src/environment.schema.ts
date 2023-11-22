import * as joi from 'joi';

export const schema = joi.object({
  NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
  API_PORT: joi.number().min(1).max(65535).required(),
  API_GLOBAL_CACHE_TTL: joi.number().min(0).required(),
  API_GLOBAL_THROTTLER_TTL: joi.number().min(0).required(),
  API_GLOBAL_THROTTLER_LIMIT: joi.number().min(0).required(),
  DATABASE_URL: joi.string().uri({ scheme: ['postgresql'] }),
});
