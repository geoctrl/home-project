import './sass/main.scss';

import { Component } from '@angular/core';
import { AppHeader } from './components/app-header';
import { TaskComponent } from './components/task/task.ts';

@Component({
    selector: 'app',
    directives: [AppHeader, TaskComponent],
    template: `
        <app-header></app-header>
        <task></task>
    `
})

export class AppComponent {}