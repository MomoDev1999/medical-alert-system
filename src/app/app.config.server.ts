import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import {
  MsalInterceptor,
  MsalService,
  MSAL_INSTANCE,
} from '@azure/msal-angular';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';

const msalInstanceFactory = (): IPublicClientApplication => {
  return new PublicClientApplication({
    auth: {
      clientId: '<CLIENT_ID>', // Reemplaza con tu Client ID
      authority:
        'https://<TENANT_NAME>.b2clogin.com/<TENANT_NAME>.onmicrosoft.com/<SIGN_IN_POLICY>',
      redirectUri: 'http://localhost:4200',
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
    },
  });
};

export const appProviders = [
  provideHttpClient(withInterceptorsFromDi()), // Cliente HTTP con interceptores
  {
    provide: MSAL_INSTANCE, // Proveedor de la instancia de MSAL
    useFactory: msalInstanceFactory,
  },
  MsalService, // Servicio MSAL
  {
    provide: HTTP_INTERCEPTORS, // Configuración del interceptor para solicitudes HTTP
    useClass: JwtInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true,
  },
];
