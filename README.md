# 💰 API Cotizador de Monedas (NestJS)

API RESTful desarrollada con **NestJS** que realiza conversiones de moneda en tiempo real (Pesos Chilenos a Dólar, Euro, UF, UTM, etc.) consumiendo datos financieros externos.

Este proyecto demuestra la implementación de arquitectura modular, inyección de dependencias y comunicación entre servicios HTTP.

## 🚀 Tecnologías y Conceptos Clave

* **NestJS (Node.js):** Framework principal.
* **TypeScript:** Tipado estático y Programación Orientada a Objetos.
* **HttpModule (Axios):** Para consumo de APIs externas.
* **RxJS & Promesas:** Manejo de flujos asíncronos (`firstValueFrom`).
* **Arquitectura MVC:** Separación limpia entre Controladores (Rutas) y Servicios (Lógica).
* **Manejo de Errores:** Excepciones HTTP personalizadas.

## ⚙️ Instalación y Ejecución

1.  Clonar el repositorio:
    ```bash
    git clone [https://github.com/TU_USUARIO/api-cotizador-nestjs.git](https://github.com/TU_USUARIO/api-cotizador-nestjs.git)
    cd api-cotizador-nestjs
    ```

2.  Instalar dependencias:
    ```bash
    npm install
    ```

3.  Levantar el servidor en modo desarrollo:
    ```bash
    npm run start:dev
    ```

La API estará escuchando en `http://localhost:3000`.

## 🔌 Endpoints

### 1. Convertir Moneda
Obtiene el valor actual del indicador económico y calcula la conversión desde Pesos Chilenos (CLP).

**Petición:**
`GET /cotizacion/convertir/:moneda?monto=XXXX`

**Parámetros:**
* `:moneda` (Ruta): El indicador a consultar (ej: `dolar`, `euro`, `uf`, `utm`).
* `?monto` (Query): La cantidad en pesos chilenos a convertir.

**Ejemplo de Uso:**
`http://localhost:3000/cotizacion/convertir/dolar?monto=5000`

**Respuesta Exitosa (200 OK):**
```json
{
    "moneda_origen": "CLP",
    "moneda_destino": "DOLAR",
    "monto_clp": 5000,
    "valor_del_dia": 950.50,
    "total_convertido": 5.26
}