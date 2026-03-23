import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
<<<<<<< HEAD
    return 'Hello World!!!!!';
=======
    return 'Hola Mundo!';
>>>>>>> feature-hi
  }

  getHi(): string {
    return 'Hi there!';
  }
}
