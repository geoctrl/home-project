import { Component } from '@angular/core';
import { TaskService } from "./task-svc";
import { TaskItem } from './task-item.ts';

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
                        <input type="text" placeholder="Task Name" [(ngModel)]="taskInput">
                    </div>
                </div>
                
                <div class="task-message" [hidden]="tasks.length || componentError">No tasks! Why don't you make some?</div>
                <div class="task-message" [hidden]="!componentError">Whoops, there was an issue talking to the API</div>
                
                <div class="task-item-container">
                    <task-item *ngFor="let task of tasks" [task]="task" [getTasks]="getTasks"></task-item>
                </div>
            </div>
        </div>
    `
})

export class TaskComponent {
    constructor(public taskService: TaskService) {
        this.getTasks();
    }

    taskInput: string = '';
    tasks = [];
    componentError: boolean = false;

    getTasks() {
        this.taskService.getTask().subscribe(
            res => {
                this.tasks = res;
            },
            err => {
                this.componentError = true;
                this.tasks = [];
            }
        );
    };

    createTask() {
        if (!this.componentError) {
            let taskInput = this.taskInput;
            this.taskInput = '';
            this.tasks.push({task_name: taskInput});

            this.taskService.createTask(taskInput||'Untitled').subscribe(
                res => {
                    this.taskInput = '';
                    this.getTasks();
                },
                err => {
                    this.taskInput = taskInput;
                    this.tasks.shift();
                    // TODO: add toaster: `Oops, we're unable to add the task - please try again later`
                }
            );
        }
    };

}