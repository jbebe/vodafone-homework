import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { CatchEverythingFilter } from './server/exception-filter';
import { HeaderInterceptor } from './server/header-interceptor';

bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new CatchEverythingFilter());
  app.useGlobalInterceptors(new HeaderInterceptor());
  await app.listen(process.env.PORT || 3000);
}
