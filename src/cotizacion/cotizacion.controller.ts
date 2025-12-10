import { Controller, Get, Query, Param } from '@nestjs/common';
import { CotizacionService } from './cotizacion.service';

@Controller('cotizacion') // Esto define la ruta base: http://localhost:3000/cotizacion
export class CotizacionController {
  
  // Inyectamos el servicio para poder usarlo
  constructor(private readonly cotizacionService: CotizacionService) {}

  // RUTA: GET /cotizacion/convertir/:moneda?monto=5000
  // Ejemplo: http://localhost:3000/cotizacion/convertir/dolar?monto=10000
  @Get('convertir/:moneda')
  convertir(
    @Param('moneda') moneda: string, // Lee 'dolar' de la URL
    @Query('monto') monto: string    // Lee '?monto=10000'. Ojo: siempre llega como string
  ) {
    // Convertimos el monto a número antes de pasarlo al servicio
    const montoNumero = Number(monto);
    return this.cotizacionService.convertirMoneda(moneda, montoNumero);
  }
}