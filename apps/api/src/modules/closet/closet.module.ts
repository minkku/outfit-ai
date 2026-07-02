import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ClosetController } from './closet.controller';
import { ClosetRepository } from './closet.repository';
import { ClosetService } from './closet.service';

@Module({
  imports: [AuthModule],
  controllers: [ClosetController],
  providers: [ClosetService, ClosetRepository],
  exports: [ClosetService],
})
export class ClosetModule {}
