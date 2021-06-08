import { Controller, Get, Header, Res } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { Response } from 'express';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoreService: ScoresService) {}

  @Get()
  async getPdfScore(@Res() res: Response) {
    const pdf = await this.scoreService.getScore();
    const stream = this.scoreService.getReadableStream(pdf);
    stream.pipe(res);
  }
}
