import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');

        const now = Date.now();
        return next
            .handle() // esto es crucial, si no se llama ese handle() metodo, no se ejecutara el route handler ... create, post get el q sea
            //La llamada a next.handle() en el interceptor es lo que permite que la ejecución continúe hacia el controlador, cuando este metodo hanlde
            // retorna Observable, luego tenemos otra cantidad de operadores para usar, en este caso es pipe()
            .pipe(
                tap(() => console.log(`After... ${Date.now() - now}ms`)),
            );
    }
}