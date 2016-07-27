import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Task } from './task-model';

const headers = new Headers({
    'Application-ID': 'cbba140e-539e-11e6-9168-0a5449992ecf',
    'Content-Type': 'application/json'
});

@Injectable()
export class TaskService {
    constructor (private http: Http) {};

    private apiUrl = 'http://homework.avantlink.com/tasks';

    getTask(): Observable<Task[]> {
        return this.http
            .get(this.apiUrl, { headers })
            .map(this.unwrapData)
            .map(res => {
                return res.reverse();
            })
            .catch(this.handleError);
    };

    createTask(taskName) {
        let body = JSON.stringify({name: taskName});
        return this.http
            .post(this.apiUrl, body, { headers })
            .map(this.unwrapData)
            .catch(this.handleError);
    };

    updateTask(taskName, taskId) {
        let body = JSON.stringify({name: taskName});
        return this.http
            .put(`${this.apiUrl}?id=${taskId}`, body, { headers })
            .map(this.unwrapData)
            .catch(this.handleError);
    };

    removeTask(taskId) {
        return this.http
            .delete(`${this.apiUrl}`, { headers })
            .map(this.unwrapData)
            .catch(this.handleError)
    };

    private unwrapData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : `Server Error`;
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}