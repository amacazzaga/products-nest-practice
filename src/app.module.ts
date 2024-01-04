import { Global, Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductService } from './app.service';
import { myMiddleware, myMiddlewareFunction } from './middleware/middleware';
import { LoggingInterceptor } from './interceptor/loggin.interceptor';
// Este es nuestro app module, si tuvieramos shared modules deberian estar todos volcados aqui, por ej :  imports: [ProductsModule] import :[UsersModule],

@Global() //podemos hacer este modulo global con este decorador para no tener que exportarlo muchisimas veces
@Module({
  imports: [],
  controllers: [AppController],
  providers: [ProductService,LoggingInterceptor] // pasamos el loggin interceptor aparte del servicio aqui en el modulo de productos como ejemplo
})

// asi se pasa el middleware en modules, aqui esta importado de la carpeta donde se creo y se ejecutará en todas las rutas de "products" que sean un GET
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(myMiddleware,myMiddlewareFunction) // aca pasamos dos middleware como ej, uno es una clase el otro una function (uno se ejecuta luego de otro!)
      .forRoutes({ path: 'products', method: RequestMethod.GET });
  }
}
