import { ElementRef, ChangeDetectionStrategy,  AfterViewInit } from '@angular/core';
import { Component, ViewEncapsulation, EventEmitter, Input, Output } from '@angular/core';
import { CourseItem } from '../../../core/entities';

@Component({
	selector: 'course-item',
	templateUrl: 'course-item.component.html',
	styles: [require('./course-item.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseItemComponent implements AfterViewInit {

	@Input() public course: CourseItem;
	@Input() public shift: any;
	@Output() public deleteCourse: EventEmitter<CourseItem> = new EventEmitter<CourseItem>();
	@Output() public editCourse: EventEmitter<CourseItem> = new EventEmitter<CourseItem>();
	@Output() public chooseCourseItem: EventEmitter<any> = new EventEmitter<any>();
	constructor(private elementRef: ElementRef) {
	}

	public mouseDown($event) {
		if ($event.target.type === 'button') {
			return;
		}
		const element = this.elementRef.nativeElement;
		this.chooseCourseItem.emit({ $event, element });
	}

	public ngAfterViewInit() {
		this.elementRef.nativeElement.ondragstart = () => {
			return false;
		};

		this.elementRef.nativeElement.onmousedown = ($event) => {
			if ($event.target.type === 'button') {
				return;
			}
			this.elementRef.nativeElement.style.position = 'absolute';
			document.body.appendChild(this.elementRef.nativeElement);
			this.moveAt($event);

			document.onmousemove = (e) => {
				this.moveAt(e);
			};
		};
	}

	public onEditCourse(course: CourseItem): void {
		this.editCourse.emit(course);
	}

	public onDeleteCourse(course: CourseItem): void {
		this.deleteCourse.emit(course);
	}

	public mouseUp($event) {
		if ($event.target.type === 'button') {
			return;
		}
		document.onmousemove = null;
		this.elementRef.nativeElement.onmouseup = null;
		this.removeLeftStyle();
	}

	private moveAt(e) {
		this.elementRef.nativeElement.style.left = e.pageX - this.shift.shiftX + 'px';
		this.elementRef.nativeElement.style.top = e.pageY - this.shift.shiftY + 'px';
	}

	private removeLeftStyle() {
		this.elementRef.nativeElement.style.left = '0';
		this.elementRef.nativeElement.style.top = '0';
		this.elementRef.nativeElement.style.position = 'relative';
		document.getElementById('courseList').appendChild(this.elementRef.nativeElement);
	}

}
