import { Controller, Dependencies, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
@Dependencies(PostService)
export class PostController {
  constructor(PostService) {
    this.postService = PostService;
  }

  @Get()
  async findAll() {
    const posts = await this.postService.getPosts();

    posts.map(PostController.mapResponse);

    return {
      data: posts
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id) {
    const post = await this.postService.getPost(id);
    
    PostController.mapResponse(post);

    return {
      data: post
    }
  }

  static mapResponse(entity){
    entity.created_at = entity.created_at.toJSON().split('T')[0];
    entity.tags = entity.tags.map(x => x.id);
  }
}
