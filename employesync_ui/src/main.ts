import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appRouting } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideAnimationsAsync(), appRouting]
}).catch(err => console.error(err));
