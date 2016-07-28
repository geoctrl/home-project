import { Component } from '@angular/core';
import { ToasterService } from "./toaster-svc";

@Component({
    selector: 'toaster',
    template: `
        <div class="toaster-container">
            <div class="toaster toaster--success"
                 *ngFor="let toaster of toasterService.toasters"
                 [ngClass]="{'toaster--success': toaster.type == 'success', 'toaster--error': toaster.type == 'error'}">
                <span class="toaster__icon">
                    <i class="toaster__icon--error fa fa-warning"></i>
                    <i class="toaster__icon--success fa fa-check-circle-o"></i>
                </span>
                <button class="toaster__close btn btn-white-transparent"
                        (click)="toasterService.removeToaster(toaster.id, true)">
                    <i class="fa fa-times"></i>
                </button>
                <span class="toaster__notice">{{toaster.notice}}</span>
            </div>
        </div>
`
})

export class ToasterComponent {
    constructor(public toasterService: ToasterService) {}
}