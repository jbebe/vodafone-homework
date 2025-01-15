import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { CatchEverythingFilter } from './server/exception-filter';

bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CatchEverythingFilter());
  await app.listen(process.env.PORT || 3000);
}
