import {Injectable, ElementRef} from '@angular/core';

@Injectable()
export class ToasterSvc {
    constructor(public elemenet: ElementRef) {}

    add(toast, title, type) {

    };

}