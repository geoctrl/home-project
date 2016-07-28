import { Injectable } from '@angular/core';
import { Toaster } from './toaster-model';
import { guid } from '../../core/utils';
import forEach = require("core-js/fn/array/for-each");

@Injectable()
export class ToasterService {
    public toasters: Toaster[] = [];
    private duration: number = 7000;

    public success(notice:string) {
        this.createToaster(notice, 'success');
    };

    public error(notice: string) {
        this.createToaster(notice, 'error');
    };

    /**
     * remove toaster
     * @param toasterId {string}
     * @param force {boolean} immediately close toaster
     */
    public removeToaster(toasterId:string, force:boolean=false) {
        let toasterIndex = -1;
        if (force) {
            this.toasters.splice(toasterIndex, 1);
        } else {
            setTimeout(() => {
                this.toasters.forEach((toaster, index) => {
                    if (toaster.id == toasterId) toasterIndex = index;
                });
                // check if toaster still exists
                // it might have been force closed by the user
                if (toasterIndex > -1) {
                    this.toasters.splice(toasterIndex, 1);
                }
            }, this.duration);
        }
    }

    /**
     * create toaster
     * @param notice {string}
     * @param type {string}
     */
    private createToaster(notice:string, type:string) {
        let newToaster = {
            id: guid(),
            notice: notice,
            type: type
        };
        this.toasters.push(newToaster);
        this.removeToaster(newToaster.id);
    }
}