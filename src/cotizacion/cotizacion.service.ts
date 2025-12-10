import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs'; // <--- Importante para convertir "flujos" a "promesas"

@Injectable()
export class CotizacionService {
  // 1. INYECCIÓN DE DEPENDENCIAS
  // Le pedimos a NestJS que nos preste el servicio HTTP
  constructor(private readonly httpService: HttpService) {}

  // 2. Método asíncrono para buscar datos
  async convertirMoneda(moneda: string, monto: number) {
    try {
      // Usaremos la API pública de mindicador.cl (muy común en Chile)
      const url = `https://mindicador.cl/api/${moneda}`;

      // 3. LA LLAMADA EXTERNA
      // NestJS usa "Observables" (streams de datos) por defecto.
      // Usamos 'firstValueFrom' para convertirlo a una "Promesa" (async/await)
      // que es más fácil de entender si vienes de Node.js clásico.
      const response = await firstValueFrom(this.httpService.get(url));
      
      const datos = response.data; // Aquí está el JSON que responde mindicador
      const valorActual = datos.serie[0].valor; // Sacamos el valor del día
      
      // 4. LÓGICA DE NEGOCIO (Cálculo)
      const total = monto / valorActual;

      return {
        moneda_origen: 'CLP',
        moneda_destino: moneda.toUpperCase(),
        monto_clp: monto,
        valor_del_dia: valorActual,
        total_convertido: Math.round(total * 100) / 100 // Redondeamos a 2 decimales
      };

    } catch (error) {
      // 5. MANEJO DE ERRORES
      // Si la API falla o la moneda no existe, lanzamos un error HTTP bonito
      throw new HttpException(
        'Moneda no encontrada o servicio caído', 
        HttpStatus.BAD_REQUEST
      );
    }
  }
}