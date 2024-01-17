import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './authorization/role.guard';
import { LoggingInterceptor } from './interceptor/loggin.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalFilters(new HttpExceptionFilter()); asi se veria app si usaramos un global filter!
  //app.useGlobalPipes(new ValidationPipe()); asi podriamos pasar un pipe a nivel global!Cuando aplicas el ValidationPipe de manera global 
  //utilizando app.useGlobalPipes(new ValidationPipe()), estás diciendo a NestJS que todas las solicitudes que lleguen 
  //a tu aplicación deben ser validadas según las reglas que hayas definido en los DTOs.
  app.useGlobalInterceptors( new LoggingInterceptor()) //pasamos el interceptor de login global pero con new en este caso,proporcionando una nueva instancia
  app.useGlobalGuards(new RolesGuard()); // asi podemos pasar un guard a nivel global, solo que este ejemplo no proteje ningun endpoint: ver role.guard.ts
  await app.listen(3000);
}
bootstrap();
