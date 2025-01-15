import { Controller, Dependencies, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('api')
@Dependencies(PostService)
export class PostController {
  constructor(PostService) {
    this.PostService = PostService;
  }

  @Get()
  getPost() {
    return this.PostService.getHello();
  }
}
