import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductService } from './app.service';
// Este es nuestro app module, si tuvieramos shared modules deberian estar todos volcados aqui, por ej :  imports: [ProductsModule] import :[UsersModule],

@Global() //podemos hacer este modulo global con este decorador para no tener que exportarlo muchisimas veces
@Module({
  imports: [],
  controllers: [AppController],
  providers: [ProductService],
})
export class AppModule { }
