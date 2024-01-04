import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map(data => ({ data })));
    }
} // aqui podriamos agregar metadata por ejemplo la hora de la respuesta... o tambien cambiar algo de lo que enviamos al user con algo de logica como en el siguiente caso:

@Injectable()
export class TransformInterceptorMapped<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next
            .handle()
            .pipe(map(value => value === null ? '' : value)); // aqui con un map transformamos la respuesta de null para enviar un string vacio
    }
}
