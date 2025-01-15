import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { PostModule } from './post/post.module';

const clientPath = join(__dirname, '..', '..', '..', 'client');

@Module({
  imports: [
    PostModule,
    ServeStaticModule.forRoot({
      rootPath: clientPath,
    }),
  ]
})
export class AppModule {}
