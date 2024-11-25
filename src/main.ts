import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { appRouting, routes } from './app/app.routes';

import { AppComponent } from './app/app.component';
import { provideRouter, RouterModule } from '@angular/router';

bootstrapApplication(AppComponent ,appConfig)
  .catch((err) => console.error(err));
