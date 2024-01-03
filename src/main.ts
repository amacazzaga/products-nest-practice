import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './authorization/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalFilters(new HttpExceptionFilter()); asi se veria app si usaramos un global filter!
  //app.useGlobalPipes(new ValidationPipe()); asi podriamos pasar un pipe a nivel global!
  app.useGlobalGuards(new RolesGuard()); // asi podemos pasar un guard a nivel global, solo que este ejemplo no proteje ningun endpoint: ver role.guard.ts
  await app.listen(3000);
}
bootstrap();
