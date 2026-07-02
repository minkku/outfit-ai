import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { OutfitController } from './outfit.controller';
import { OutfitRepository } from './outfit.repository';
import { OutfitService } from './outfit.service';

@Module({
  imports: [AuthModule],
  controllers: [OutfitController],
  providers: [OutfitService, OutfitRepository],
})
export class OutfitModule {}
