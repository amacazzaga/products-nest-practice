import { Body, Controller, ForbiddenException, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Res, UseGuards, UsePipes, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './app.service';
import { ZodValidationPipe } from './validation/zodValidationPipe';
import { createProductSchema } from './schema/zodSchema';
import { RolesGuard } from './authorization/role.guard';
import { LoggingInterceptor } from './interceptor/loggin.interceptor';

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
  @UsePipes(new ZodValidationPipe(createProductSchema)) // con el decorador de usePipes es cuando validamos la request respecto del esquema que hicimos y el custom pipe, ese custom pipe toma el esquema como parametro
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
@UseGuards(RolesGuard) // aqui siguendo con la logica de rutas protegias, como cuando usamos host arriba, creamos un guard que proteje endpoints de administrador, 
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}

///ejemplo de como usar un servicio de productos en un controlador
@UseInterceptors(LoggingInterceptor) // decorador de interceptor , toma como param la funcion que creamos de login, aplica a todos los route handler
//porque esta aplicado a nivel de la clase ProductsController
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) { }

  // podemos usar un get by id de product y usar un pipe, asi podemos asegurarnos que el parametro sea un numero, podriamos tirar un error en caso contrario
  @Get(':id')
  async findProductByIdWithPipe(@Param('id', ParseIntPipe) id: number) {
    return // por ej this.productService.findOne(id)
  }
  //una forma similar de usar estos pipes , para query params:
  @Get()
  async findOne(@Query('id', ParseIntPipe) id: number) {
    return  // por ej this.productService.findOne(id)
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







