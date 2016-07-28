import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { TaskReceive, TaskSend } from './task-model';

@Injectable()
export class TaskService {
    constructor (private http: Http) {};

    public tasks: TaskReceive[] = [];
    private apiUrl = 'http://homework.avantlink.com/tasks';

    getTask(): Observable<TaskSend[]> {
        let headers = new Headers({
            'Application-ID': 'cbba140e-539e-11e6-9168-0a5449992ecf',
            'Content-Type': 'application/json'
        });
        return this.http
            .get(this.apiUrl, { headers })
            .map(this.unwrapData)
            .map(res => res.reverse())
            .map(res => {
                this.tasks = res;
            })
            .catch(this.handleError);
    };

    createTask(taskName): Observable<TaskSend> {
        let body = JSON.stringify({name: taskName});
        let headers = new Headers({
            'Application-ID': 'cbba140e-539e-11e6-9168-0a5449992ecf',
            'Content-Type': 'application/json'
        });
        return this.http
            .post(this.apiUrl, body, { headers })
            .map(this.unwrapData)
            .catch(this.handleError);
    };

    updateTask(taskName, taskId): Observable<TaskSend> {
        let body = JSON.stringify({name: taskName});
        let headers = new Headers({
            'Application-ID': 'cbba140e-539e-11e6-9168-0a5449992ecf',
            'Content-Type': 'application/json'
        });
        return this.http
            .put(`${this.apiUrl}?id=${taskId}`, body, { headers })
            .map(this.unwrapData)
            .catch(this.handleError);
    };

    removeTask(taskId): Observable<TaskSend> {
        let headers = new Headers({
            'Application-ID': 'cbba140e-539e-11e6-9168-0a5449992ecf'
        });
        return this.http
            .delete(`${this.apiUrl}?id=${taskId}`, { headers })
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