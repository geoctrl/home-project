import { Component } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';


class Hero {
    id: number;
    name: string;
}

@Component({
    selector: 'home-app',
    viewProviders: [HTTP_PROVIDERS],
    template: `
        <h1>{{title}}</h1>
        <h2>{{hero.name}} details!</h2>
        <div><label>id: </label>{{hero.id}}</div>
        <div>
            <label>name: </label>
            <input [(ngModel)]="hero.name" placeholder="name" type="text">
        </div>
    `
})

export class AppComponent {
    constructor(http: Http) {
        console.log('here')
        http.get('https://httpbin.org/get').subscribe(res => this.data);
    };
    title = 'Tour of Heroes';
    hero: Hero = {
        id: 1,
        name: 'Windstorm'
    };
    data = null;
}