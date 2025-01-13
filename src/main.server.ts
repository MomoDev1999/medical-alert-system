import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appProviders } from './app/app.config.server';

const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [...appProviders], // Asegúrate de usar el spread operator
  });

export default bootstrap;
