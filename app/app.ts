require('reflect-metadata');
import 'es6-shim';
import 'zone.js';
import { Component } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

@Component({
    selector: 'app',
    template: `<h1>Test this app out yo</h1>`
})
class MyComponent{}

bootstrap(MyComponent);