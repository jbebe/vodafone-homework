import { join } from 'path';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';

const clientPath = join(__dirname, '..', '..', '..', 'client');

@Module({
  imports: [
    PrismaModule,
    PostModule,
    // all referenced modules must be declared before routing
    RouterModule.register([
      {
        path: 'api',
        module: PostModule,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: clientPath,
    }),
  ],
})
export class AppModule {}
