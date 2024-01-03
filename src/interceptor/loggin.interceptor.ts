import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before...');

        const now = Date.now();
        return next
            .handle() // esto es crucial, si no se llama ese metodo, no se ejecutara el route handler :  
            //La llamada a next.handle() en el interceptor es lo que permite que la ejecución continúe hacia el controlador.
            .pipe(
                tap(() => console.log(`After... ${Date.now() - now}ms`)),
            );
    }
}