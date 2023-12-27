import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


// este ejemplo basico de un middleware da cuente que, como en express pueden acceder al objeto de req y de res
@Injectable()
export class myMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req,res);
    next();
  }
}
