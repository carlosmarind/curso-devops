import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculoModule } from './operacion/calculo/calculo.module';

@Module({
  imports: [CalculoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
