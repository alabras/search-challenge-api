[![Pipeline](https://github.com/alabras/search-challenge-api/actions/workflows/pipeline.yml/badge.svg)](https://github.com/alabras/search-challenge-api/actions)
[![Known Vulnerabilities](https://snyk.io/test/github/alabras/search-challenge-api/badge.svg)](https://snyk.io/test/github/alabras/search-challenge-api)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2Falabras%2Fsearch-challenge-api%2Fmain)](https://dashboard.stryker-mutator.io/reports/github.com/alabras/search-challenge-api/main)
[![dependencies Status](https://david-dm.org/alabras/search-challenge-api/status.svg)](https://david-dm.org/alabras/search-challenge-api)
[![devDependencies Status](https://david-dm.org/alabras/search-challenge-api/dev-status.svg)](https://david-dm.org/alabras/search-challenge-api?type=dev)

# Desafío de busqueda :D

Esta es la componente API del desafío, es una API REST y su responsabilidad es buscar los productos en la base de datos y aplicar la lógica de negocio.

## Comandos rápidos

- npm run awesome: Ejecuta pruebas
- npm start: Inicia en modo desarrollo.
- npm run watch: Inicia en modo watch.

## Descripción de carpetas

La estructura de carpetas es la siguiente:

- .github/workflows: Donde se encuentra definido los pipelines.
- docs/adr: Listado de deficiones
- reports
  - coverage: Resultado de coverage de pruebas unitarias.
  - junit: Reporte de las pruebas unitarias y de integración en formato xml.
  - mutation: Resultado de las pruebas de mutación en formato html.
- src
  - middlewares: Listado de middlewares.
  - repositories: Repositorios, conexión con la base de datos.
  - routers: Deifinición de los endpoints admitidos.
  - services: Implementación de la lógica de negocio.
  - utils: funciones genericas
- test
  - integracion: Pruebas de integracion
  - mocks: Listado de archivos usado para pruebas.

## Pirámide de pruebas

Se definió la siguiente pirámide de pruebas:

- Unitarias
- Mutación: utilizando `stryker`
- Integración utilizando `jest` y base de datos en memoria con `mongo-unit`.
- Seguridad
  - Paquetes: usando herramienta `snyk` (ver nota de snyk más abajo)
  - Docker: usando herramienta `snyk`, se verifican issues de seguiridad dentro de la imagen docker.
  - Código: utilizando linter `eslint-plugin-security` se validan ciertas reglas de seguridad en el código.

## Seguridad

Se ha implementado lo siguiente:

- Headers de seguridad: Se aplicaron un conjunto de headers de seguridad.

- Imagen Docker Non ROOT: Se está ejecutando con usuario diferente a ROOT.

- Imagen Docker Multistage: Usando `docker multistage build` se minimiza la cantidad de código publicado, dejando solamente lo necesario para su ejecución.

## Variables de Entorno

Las variables de entorno se leen del archivo .env y estas son:

- MONGO_DATABASE: Nombre de la base de datos de mongo.
- MONGO_CONNECTION: String de conexión de mongo.
- LIST_CORS_URL: Listado de urls a ser permitidas. CORS

Al momento de construcción de imagen docker, no se incluyen estas variables, con el objetivo de que sean configuradas al momento de ejecución. Con esto se logra que la misma imagen docker sirva para cualquier ambiente.

## Pipelines

Existen dos pipelines:

- Pipeline: El cual se ejecuta en cada push, corre las pruebas unitarias, integración, realiza build de la imagen docker y publica en infraestructura.

- Testing: El cual se ejecuta con un cron (una vez al día), y corre todas las pruebas de la piramide de pruebas.

## Consideraciones

1. Sistema no maneja autentificación ni autorización, está fuera del alcance.

2. Se asumio que cuando buscara por números, solo buscara por Id de Producto, en caso contrario buscaría por marcas y descripciones de productos.

3. Se asumió que solamente entregara descuentos si la busqueda es palindromó, o sea, cuando busque por ID de producto, no aplicará descuento.

### Ejecución de Snyk

Para ejecutar pruebas con Snyk debe definir `SNYK_TOKEN` como variable de entorno.

El token, lo puede obtener en https://app.snyk.io/account en apartado Auth Token. (Es grátis :D)

## TODO

- Falta implementar manejo de logs ya que al estar en un ambiente de prueba no se buscó una solución para esto.

- Mejora en el manejo de secretos.

- Falta mostrar el resultado de la ejecución de las pruebas (unitarias, integracion, mutación, etc) en algún dashboard al finalizar el pipeline
