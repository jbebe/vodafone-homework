import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  getHello() {
    return 'Hello World!';
  }
}
