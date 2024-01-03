import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>(); // reflexión de TypeScript: es la capacidad de un programa para examinar y modificar su propia estructura, es este caso nos interesa examinar los roles