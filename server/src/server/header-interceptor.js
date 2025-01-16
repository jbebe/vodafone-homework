import { Injectable } from '@nestjs/common';

@Injectable()
export class HeaderInterceptor {
  intercept(context, next) {
    const http = context.switchToHttp();
    const response = http.getResponse();
    const request = http.getRequest();

    if (request.url.startsWith('/api/')) {
      response.setHeader('Cache-Control', 'no-cache');
      response.setHeader('Content-Type', 'application/json');
    } else {
      response.setHeader('Cache-Control', 'public, max-age=300'); // 5 mins cache
    }

    return next.handle();
  }
}
