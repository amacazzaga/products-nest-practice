import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => { //tomamos parte la request gracias al ExecutionContext, nos interesa request.user
        const request = ctx.switchToHttp().getRequest();
        return request.user; // este decorador nos devuelve el usuario
    },
);
// podemos pasar este decorador como parametro y tambien combinarlo con pipes : 
// como parametro
/* @Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}
*/
// con algun pipe : 
/*
@Get()
async findOne(
  @User(new ValidationPipe({ validateCustomDecorators: true }))
  user: UserEntity,
) {
  console.log(user);
}*/
