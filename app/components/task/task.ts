import { Component } from '@angular/core';
import { TaskService } from "./task-svc";
import { TaskItem } from './task-item.ts';
import { ToasterService } from '../toaster/toaster-svc';

@Component({
	selector: 'task',
    directives: [TaskItem],
	template: `
        <div class="task-view"></div>
        <div class="task-view-overlay">
            <div class="container">
                <div class="task-header">Tasks</div>
                <div class="task-add" [ngClass]="{'task-add--error': componentError}">
                    <button class="task-add__button btn btn-primary" (click)="createTask()">Create Task</button>
                    <div class="task-add__input">
                        <input type="text" placeholder="Task Name" [(ngModel)]="taskInput" (keydown)="createTaskOnEnter($event)">
                    </div>
                </div>
                
                <div class="task-message" [hidden]="taskService.tasks.length || componentError">No tasks! Why don't you make some?</div>
                <div class="task-message" [hidden]="!componentError">Whoops, there was an issue talking to the API</div>
                
                <div class="task-item-container">
                    <task-item *ngFor="let task of taskService.tasks; let i = index"
                               [task]="task"
                               [taskIndex]="i"
                               [taskNumber]="i+1"></task-item>
                </div>
            </div>
        </div>
    `
})

export class TaskComponent {
    constructor(public taskService: TaskService, public toasterService: ToasterService) {
        this.getTasks();
    }

    taskInput: string = '';
    componentError: boolean = false;

    getTasks() {
        this.taskService.getTask().subscribe();
    };

    createTaskOnEnter(e) {
        if (e.keyCode == 13) {
            this.createTask();
        }
    }

    createTask() {
        if (!this.componentError && this.taskInput.length) {
            let taskInput = this.taskInput;
            this.taskInput = '';
            this.taskService.tasks.push({task_name: taskInput});

            this.taskService.createTask(taskInput||'Untitled').subscribe(
                res => {
                    this.getTasks();
                    this.toasterService.success(`Successfully created task "${taskInput}"`);
                },
                err => {
                    // put everything back to how it was
                    this.taskInput = taskInput;
                    this.taskService.tasks.pop();
                    this.toasterService.error(`Unable to add the task "${taskInput}"`);
                }
            );
        } else if (!this.taskInput.length) {

        }
    };

}