import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola Mundo!!!!';asd
  }

  getHi(): string {
    return 'Hi there!!!';
  }
}
