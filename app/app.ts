import { Component } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';


@Component({
    selector: 'home-app',
    template: `<div>this is the app</div>`
})
class AppComponent {}

bootstrap(AppComponent);