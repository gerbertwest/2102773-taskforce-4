import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import rabbitConfig from './config/rabbit.config';

const ENV_TASK_FILE_PATH = 'apps/task/.task.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [rabbitConfig],
      envFilePath: ENV_TASK_FILE_PATH
    }),
  ]
})
export class ConfigTaskModule {}
