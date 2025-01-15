import { Module } from '@nestjs/common';
import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  async onModuleInit() {
    await this.$connect()
  }
}

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
