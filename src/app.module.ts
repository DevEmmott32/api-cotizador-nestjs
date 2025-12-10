import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CotizacionModule } from './cotizacion/cotizacion.module';

@Module({
  imports: [CotizacionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
