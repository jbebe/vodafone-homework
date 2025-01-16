import { Injectable, Dependencies } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.module';

export class PrismaNotFoundException {}

@Injectable()
@Dependencies(PrismaService)
export class PostService {
  constructor(prismaService) {
    this.prismaService = prismaService;
  }

  async getPosts() {
    return await this.prismaService.post.findMany({
      include: {
        tags: true,
      },
      orderBy: [{ created_at: 'desc' }],
    });
  }

  async getPost(id) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
      include: {
        tags: true,
      },
    });

    if (post === null) throw new PrismaNotFoundException();

    return post;
  }

  async getComments(postId) {
    // check if post exists and throw if not
    await this.getPost(postId);

    return await this.prismaService.comment.findMany({
      where: {
        post_id: postId,
      },
      include: {
        author: true,
      },
      orderBy: [{ created_at: 'desc' }],
    });
  }

  async throwIfTagDoesNotExist(id) {
    // checking for existence can be optimized
    const tag = await this.prismaService.tag.findUnique({
      where: { id },
    });

    if (tag === null) throw new PrismaNotFoundException();
  }

  async getPostsByTag(tagId) {
    // check if tag exists and throw if not
    await this.throwIfTagDoesNotExist(tagId);

    const tag = await this.prismaService.tag.findUnique({
      where: {
        id: tagId,
      },
      include: {
        posts: {
          include: {
            tags: true,
          },
          orderBy: [{ created_at: 'desc' }],
        },
      },
    });

    return tag.posts;
  }
}
