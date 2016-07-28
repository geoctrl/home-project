
import {TaskComponent} from "./task";
import {beforeEachProviders, inject} from "@angular/core/testing";
import {TestComponentBuilder} from "@angular/compiler/testing";
import {TaskService} from "./task-svc";
import {HTTP_PROVIDERS} from '@angular/http';
import {ToasterService} from "../toaster/toaster-svc";


describe('Task: component', () => {
    let tcb;

    beforeEachProviders(() => [
        TestComponentBuilder,
        TaskComponent,
        TaskService,
        HTTP_PROVIDERS,
        ToasterService
    ]);

    beforeEach(inject([TestComponentBuilder], _tcb => {
        tcb = _tcb;
    }));


        it (`should have "componentError" as boolean`, done => {
        tcb.createAsync(TaskComponent).then(fixture => {
            let taskComponent = fixture.componentInstance;

            expect(typeof taskComponent.componentError).toBe('boolean');
            done();
        }).catch(e => done.fail(e));
    });
});