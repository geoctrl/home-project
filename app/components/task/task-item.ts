import { Component, Input } from '@angular/core';
import { TaskService } from "./task-svc";
import { debounce } from '../../core/utils';
import { ToasterService } from '../toaster/toaster-svc';


@Component({
	selector: 'task-item',
	template: `
        <div class="task-item" [class.isRemoving]="isRemoving">
            <button [class.isUpdating]="isUpdating || isRemoving"
                    class="task-item__remove btn btn-grey-transparent btn-square"
                    (click)="removeTask()">
                <i class="fa fa-times"></i>
            </button>
            <div class="task-item__number">
                <span>{{taskNumber}}</span>
                <i class="fa fa-pencil"></i>
            </div>
            <div class="task-item__name">
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
    constructor(public taskService: TaskService, public toasterService: ToasterService) {}

    @Input() task;
    @Input() taskIndex;
    @Input() taskNumber;

    isRemoving: boolean = false;
    isUpdating: boolean = false;
    inputTask: string = '';

    ngOnInit() {
        this.inputTask = this.task.task_name;
    }

    updateTask = debounce(() => {
        this.taskService.updateTask(this.inputTask || 'Untitled', this.task.task_id).subscribe(
            res => {
                this.isUpdating = false;
                this.toasterService.success(`Successfully updated task ${this.taskNumber}`);
            },
            err => {
                this.isUpdating = false;
                this.toasterService.error(`Unable to update task ${this.taskNumber}`);
            }
        );
    }, 1000);

    removeTask() {
        this.isRemoving = true;
        this.taskService.removeTask(this.task.task_id).subscribe(
            res => {
                this.taskService.tasks.splice(this.taskIndex, 1);
                this.toasterService.success(`Successfully removed ${this.inputTask}`);
                this.isRemoving = false;
            },
            err => {
                this.toasterService.error(`Unable to remove ${this.inputTask}`);
                this.isRemoving = false;
            }
        );
    }
}