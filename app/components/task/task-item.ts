import { Component, Input } from '@angular/core';
import { TaskService } from "./task-svc";
import { debounce } from '../../core/utils';

@Component({
	selector: 'task-item',
	template: `
        <div class="task-item" [class.isRemoving]="isRemoving">
            <button [style.display]="isUpdating?'none':'inline-block'"
                    class="task-item__remove btn btn-grey-transparent btn-square"
                    (click)="removeTask()">
                <i class="fa fa-times"></i>
            </button>
            <div class="task-item__name">
                <i class="task-item__edit fa fa-pencil"></i>
                <input type="text"
                       [(ngModel)]="inputTask"
                       placeholder="Untitled"
                       (keyup)="updateTask(); isUpdating = true;">
            </div>
            <i [style.display]="isUpdating?'block':'none'"
               class="task-item__loading fa fa-refresh fa-spin fa-3x fa-fw"></i>
		</div>
    `
})

export class TaskItem {
    constructor(public taskService: TaskService) {
    }

    @Input() task;
    @Input() getTasks: Function;

    isRemoving: boolean = false;
    inputTask: string = '';
    isUpdating: boolean = false;

    ngOnInit() {
        this.inputTask = this.task.task_name;
    }

    updateTask = debounce(() => {
        this.taskService.updateTask(this.inputTask || 'Untitled', this.task.task_id).subscribe(
            res => {
                this.getTasks();
                this.isUpdating = false;
            },
            err => {
                this.isUpdating = false;
                // TODO: toaster: unable to update task name
            }
        );
    }, 1000);

    removeTask() {
        this.isRemoving = true;
        this.taskService.removeTask(this.task.task_id).subscribe(
            res => {
                this.getTasks();
                this.isRemoving = false;
            },
            err => {
                // TODO: toaster: unable to remove task
                this.isRemoving = false;
            }
        );
    }
}