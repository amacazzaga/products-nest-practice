import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalFilters(new HttpExceptionFilter()); asi se veria app si usaramos un global filter!
  await app.listen(3000);
}
bootstrap();
