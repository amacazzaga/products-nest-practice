import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return  //validateRequest(request); la funcion validate request debera estar declarada e incluir su propia logica en este caso tendria sentido que la logica sea de autorizacion 
  } 
}

/*if it returns true, the request will be processed.
if it returns false, Nest will deny the request.*/