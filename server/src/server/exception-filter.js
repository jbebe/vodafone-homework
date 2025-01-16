import { Catch } from '@nestjs/common';
import { PrismaNotFoundException } from '../modules/post/post.service';

@Catch()
export class CatchEverythingFilter {
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status;
    if (exception instanceof PrismaNotFoundException) status = 404;
    else status = 500;

    response.status(status).end();
  }
}
