
import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { TaskService } from './components/task/task-svc';
import { ToasterService } from './components/toaster/toaster-svc';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app';

enableProdMode();

// start the app
bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    TaskService,
    ToasterService
]).catch((err: any) => console.error(err));