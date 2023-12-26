import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

/*nuestro DTO es un objeto que declara el tipo del producto es usado solo en el metodo de POST*/
export class ProductDto {
  name: string;
  age: number;
  breed: string;
}

@Controller("products")
export class AppController {// clase
  constructor(private readonly appService: AppService) { }
  @Post() //decorador (metodo http)
  create(@Body() createProductDto: ProductDto) {
    return 'This action adds a new product';
  }
  @Get("categories") //decorador
  findAll(): string[] {
    return ["telefonos", "tablets"]; //a modo de ejemplo
  }
  @Get(":id") //decorador
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a ${params.id} product by id`;
  }
}
// ejemplo de como usando host podemos entender que la request es de admin y devolverle la pagina al adm de nuestros products
@Controller({ host: 'admin.example.com' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}


