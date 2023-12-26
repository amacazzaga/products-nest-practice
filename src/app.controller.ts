import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("products")
export class AppController {// clase
  constructor(private readonly appService: AppService) {}

  @Get("categories") //decorador
  findAll(): string[] {
    return ["telefonos","tablets"]; //a modo de ejemplo
  }
  @Get(":id")
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} product by id`;
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
