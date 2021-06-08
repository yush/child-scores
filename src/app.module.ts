import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScoresController } from './scores/scores.controller';
import { ScoresService } from './scores/scores.service';

@Module({
  imports: [],
  controllers: [AppController, ScoresController],
  providers: [AppService, ScoresService],
})
export class AppModule {}
