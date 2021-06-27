# Piramide de pruebas

## Estatus

Aceptado

## Contexto

Es necesario definir la piramide de pruebas.

## Decisión

Hasta ahora se utilizará las siguientes pruebas:

- Pruebas unitarias: utilizando jest.
- Pruebas de integración: utilizando jest.
- Pruebas de seguridad:
  - eslint-plugin-security: Para validar problemas de seguridad en el código
  - Snyk: Para validar vulnerabilidades de packages y docker. Para poder ejecutarlas se debe crar cuenta gratis en snyk.io y configurar archivo .env con SNYK_TOKEN.
- Pruebas de mutación: utilizando stryker.

## Consecuencias

A medida que el proyecto crezca se debe evaluar una mejor solución para ejecutar las pruebas de mutación, ya que por experiencia, tienden a demorar.
