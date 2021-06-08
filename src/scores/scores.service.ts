import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { once } from 'events';
import * as path from 'path';
import * as fs from 'fs';
import { Readable } from 'stream';

@Injectable()
export class ScoresService {
  async getScore() {
    const FILENAME = 'output';
    let output;
    const process = spawn('lilypond', [
      '-o',
      `static/${FILENAME}`,
      'static/exercises.ly',
    ]);
    process.stdout.on('data', function (code) {
      output = code;
    });

    process.stderr.on('error', function (code) {
      console.log('error:' + code);
      output = code;
    });

    console.log('data:' + output);

    await once(process, 'close');

    const filepath = path.join(
      __dirname,
      '..',
      '..',
      'static',
      `${FILENAME}.pdf`,
    );
    console.log(filepath);
    const pdf = await new Promise<Buffer>((resolve, reject) => {
      fs.readFile(filepath, {}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    return pdf;
  }

  getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return stream;
  }
}
