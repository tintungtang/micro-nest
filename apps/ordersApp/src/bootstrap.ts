import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { RemoteEntryComponent } from './app/remote-entry/entry.component';

export function bootstrap() {
    return bootstrapApplication(RemoteEntryComponent, appConfig);
  }
