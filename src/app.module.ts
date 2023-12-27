import { Global, Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductService } from './app.service';
import { myMiddleware } from './middleware/middleware';
// Este es nuestro app module, si tuvieramos shared modules deberian estar todos volcados aqui, por ej :  imports: [ProductsModule] import :[UsersModule],

@Global() //podemos hacer este modulo global con este decorador para no tener que exportarlo muchisimas veces
@Module({
  imports: [],
  controllers: [AppController],
  providers: [ProductService],
})

// asi se pasa el middleware en modules, aqui esta importado de la carpeta donde se creo y se ejecutará en todas las rutas de "products" que sean un GET
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(myMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.GET });
  }
}
