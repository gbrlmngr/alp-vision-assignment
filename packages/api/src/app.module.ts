import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ApplicationConfigurationToken,
  applicationConfiguration,
} from './app.configuration';
import { schema as environmentSchema } from './environment.schema';
import { MeaningModule } from './meaning/meaning.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      envFilePath: ['.env.development.local', '.env.development'],
      load: [applicationConfiguration],
      validationSchema: environmentSchema,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl:
          process.env.NODE_ENV === 'production'
            ? configService.get<number>(
                `${ApplicationConfigurationToken}.API_GLOBAL_CACHE_TTL`,
              )
            : 0,
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>(
          `${ApplicationConfigurationToken}.API_GLOBAL_THROTTLER_TTL`,
        ),
        limit: configService.get<number>(
          `${ApplicationConfigurationToken}.API_GLOBAL_THROTTLER_LIMIT`,
        ),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow<string>(
          `${ApplicationConfigurationToken}.DATABASE_URL`,
        ),
        timezone: '+00:00',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    MeaningModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
