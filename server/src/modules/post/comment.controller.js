import { Controller, Dependencies, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostService } from '../post/post.service';

@Controller('posts/:postId/comments')
@Dependencies(PostService)
export class CommentController {
  constructor(PostService) {
    this.postService = PostService;
  }

  @Get()
  async findAll(@Param('postId', ParseIntPipe) postId) {
    const comments = await this.postService.getComments(postId);

    comments.map(this.mapResponse);

    return {
      data: comments
    }
  }

  mapResponse(entity){
    entity.created_at = entity.created_at.toJSON().split('T')[0];
    entity.author = entity.author.name;
  }
}
