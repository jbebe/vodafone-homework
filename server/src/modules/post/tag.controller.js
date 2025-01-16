import {
  Controller,
  Dependencies,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Controller('tags/:id')
@Dependencies(PostService)
export class TagController {
  constructor(PostService) {
    this.postService = PostService;
  }

  @Get()
  async findAll(@Param('id') id) {
    const posts = await this.postService.getPostsByTag(id);

    posts.map(PostController.mapResponse);

    return {
      data: posts,
    };
  }
}
