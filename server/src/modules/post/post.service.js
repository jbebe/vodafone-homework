import { Injectable, Dependencies } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.module';

export class PrismaNotFoundException {}

@Injectable()
@Dependencies(PrismaService)
export class PostService {
  constructor(prismaService){
    this.prismaService = prismaService;
  }

  async getPosts() {
    return await this.prismaService.post.findMany({
      include: { 
        tags: true
      },
    });
  }
  
  async getPost(id) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id
      },
      include: { 
        tags: true
      },
    });
    
    if (post === null) throw new PrismaNotFoundException()
      
    return post;
  }
  
  async getComments(postId) {
    return await this.prismaService.comment.findMany({
      where: {
        post_id: postId
      },
      include: {
        author: true
      }
    });
  }
  
  async getPostsByTag(tagId) {
    const tag = await this.prismaService.tag.findUnique({
      where: {
        id: tagId
      },
      include: {
        posts: {
          include: {
            tags: true
          }
        }
      }
    });

    return tag.posts;
  }
}
