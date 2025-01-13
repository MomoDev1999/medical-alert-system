import { environment } from './environments/environment';

export const msalConfig = {
  auth: {
    clientId: environment.clientId,
    authority: `https://${environment.tenantName}.b2clogin.com/${environment.tenantName}.onmicrosoft.com/${environment.signInPolicy}`,
    redirectUri: environment.redirectUri,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};
