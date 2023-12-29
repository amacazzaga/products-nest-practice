import { Body, Controller, ForbiddenException, Get, HttpStatus, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
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
    try { res.status(HttpStatus.CREATED).send("todos los productos") } catch (error) {
      throw new ForbiddenException();// hemos creado una clase para manejar estas excepciones en la carpeta forbidden
    }
    ; // 
  }
  @Get("categories") //decorador , es un get a /categories/products
  findAllCategories(): string[] {
    return ["telefonos", "tablets", "notebooks"]; //a modo de ejemplo devolvemos las categorias de los products
  }
  @Get(":id") //decorador que es un get a /products/:id
  findProductById(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a ${params.id} product by id`;
  }

}
//podemos usar un get by id y aplicarle un pipe como aca :

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
  constructor(private productService: ProductService) { }

    // podemos usar un get by id de product y usar un pipe, asi podemos asegurarnos que el parametro sea un numero
    @Get(':id')
    async findProductByIdWithPipe(@Param('id', ParseIntPipe) id: number) {
      return // por ej this.productService.findOne(id)
    }

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







