import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
<<<<<<< HEAD
    return 'Hola Mundo!';
=======
    return 'Hola Mundo!!!!';asd
>>>>>>> 6ca2d503db87bf7d726085e07e278f88c4a78856
  }

  getHi(): string {
    return 'Hi there!!!';
  }
}
