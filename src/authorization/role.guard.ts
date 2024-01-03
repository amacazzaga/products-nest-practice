import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        return true; // aqui devolvemos true en cualquier caso, tendria sentido implementar alguna logica basada en roles en este caso como debajo
    }
}


@Injectable()
export class RolesGuardWithRoleDecoratorImplemented implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean { //el contexto es el entorno y la informacion asociada a la ejecucion de un codigo en un momento especifico
        const roles = this.reflector.get(Roles, context.getHandler()); //aca usamos el decorador de roles, en el primer parametro, en el segundo el contexto
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return //matchRoles(roles, user.roles), por ejemplo, aqui deberiamos declarar una function matchRoles
    }
}

/*
Usar el decorador @UseGuards(RolesGuard) directamente en un controlador o 
un método de un controlador es una forma de aplicar el guardia (RolesGuard) de manera directa y específica a ese 
controlador o método en particular. En cambio, la reflexión y el uso de metadatos en el RolesGuard permiten una mayor 
flexibilidad y reutilización al permitir la definición de roles de manera más dinámica y centralizada.*/

