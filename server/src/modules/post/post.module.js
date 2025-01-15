import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { CommentController } from './comment.controller';
import { TagController } from './tag.controller';
import { PostService } from './post.service';
import { PrismaService, PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PostController, CommentController, TagController],
  providers: [PrismaService, PostService],
})
export class PostModule {}
