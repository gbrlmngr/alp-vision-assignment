import { registerAs } from '@nestjs/config';

export const ApplicationConfigurationToken = 'APPLICATION_CONFIGURATION';

export const applicationConfiguration = registerAs(
  ApplicationConfigurationToken,
  () => ({
    NODE_ENV: process.env.NODE_ENV,
    API_PORT: Number(process.env.API_PORT || 8888),
    API_GLOBAL_CACHE_TTL: Number(process.env.API_GLOBAL_CACHE_TTL || 5000),
    API_GLOBAL_THROTTLER_TTL: Number(process.env.API_GLOBAL_THROTTLER_TTL || 1),
    API_GLOBAL_THROTTLER_LIMIT: Number(
      process.env.API_GLOBAL_THROTTLER_LIMIT || 10,
    ),
    DATABASE_URL: process.env.DATABASE_URL,
  }),
);
