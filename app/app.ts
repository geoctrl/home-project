import './sass/main.scss';

import { Component } from '@angular/core';
import { AppHeader } from './components/app-header';
import { TaskComponent } from './components/task/task.ts';
import { ToasterComponent } from './components/toaster/toaster.ts';

@Component({
    selector: 'app',
    directives: [AppHeader, TaskComponent, ToasterComponent],
    template: `
        <toaster></toaster>
        <app-header></app-header>
        <task></task>
    `
})

export class AppComponent {}