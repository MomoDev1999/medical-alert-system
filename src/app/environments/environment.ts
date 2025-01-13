export const environment = {
  production: false, // Indica si este es un entorno de producción o desarrollo
  clientId: '0b5db7ec-8452-4f45-b6eb-4191c3a02bbb',
  tenantName: 'duoctenant.onmicrosoft.com', // Nombre del Tenant en Azure, extraído del campo "name"
  signInPolicy: 'B2C_1_DuocDemoAzure_Login', // Reemplaza con el nombre de tu política de inicio de sesión
  redirectUri: 'http://localhost:4200', // URL de redirección tras inicio de sesión
  apiBaseUrl: 'http://localhost:8080/api', // Base URL para tus APIs (backend)
};
