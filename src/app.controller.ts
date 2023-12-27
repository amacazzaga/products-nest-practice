import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './app.service';

/*nuestro DTO es un objeto que declara el tipo del producto es usado solo en el metodo de POST*/
export class ProductDto {
  name: string;
  price: number;
  description: string;
}
/////
@Controller("products")
export class AppController {// clase
  @Post() //decorador (metodo http) , es un post a /products
  create(@Body() createProductDto: ProductDto) {
    return 'This action adds a new product';// en realidad devolveria createProductDto, es a modo de ejemplo!!
  }
  @Get()
  findAllProducts(@Res() res: Response) { //ejemplo de como incorporar @Res decorador de expres para dar una respuesta
    res.status(HttpStatus.CREATED).send("todos los productos"); // 
  }
  @Get("categories") //decorador , es un get a /categories/products
  findAllCategories(): string[] {
    return ["telefonos", "tablets", "notebooks"]; //a modo de ejemplo devolvemos las categorias de los products
  }
  @Get(":id") //decorador que es un get a /products/:id
  findOProductById(@Param() params: any): string {
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

///ejemplo de como usar un servicio de productos en un controlador
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: ProductDto) {
    this.productService.create(createProductDto);
  }
  }
  //////

  /*el controlador siempre corresponde a un modulo asi que debera ser incluido en app.modules , asi como tambien su provider,
  en nuestro caso se veria asi : @Module({
  controllers: [appController],
  providers: [appsService],
})*/







