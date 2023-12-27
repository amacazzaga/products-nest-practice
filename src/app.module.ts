import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductService } from './app.service';
// Este es nuestro app module, si tuvieramos shared modules deberian estar todos volcados aqui, por ej :  imports: [ProductsModule] import :[UsersModule],

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ProductService],
})
export class AppModule { }
