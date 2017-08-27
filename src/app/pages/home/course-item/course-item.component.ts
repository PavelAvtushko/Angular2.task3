import { Component, ViewEncapsulation, EventEmitter, Input, Output } from '@angular/core';
import { CourseItem } from '../../../core/entities';

@Component({
	selector: 'course-item',
	templateUrl: 'course-item.component.html',
	styles: [require('./course-item.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})

export class CourseItemComponent {
	@Input() public course: CourseItem;
	@Input() public coord: any;
	@Output() public deleteCourse: EventEmitter<CourseItem> = new EventEmitter<CourseItem>();
	@Output() public editCourse: EventEmitter<CourseItem> = new EventEmitter<CourseItem>();
	@Output() public checkCourseItem: EventEmitter<CourseItem> = new EventEmitter<CourseItem>();

	constructor() {
	}

	public mouseDown(course) {
		//console.log('mouse down');
		// console.log(coord.left);
		// console.log(coord.right);
		this.checkCourseItem.emit(course);
	}

	// public event() {

	// 	var blueberries = document.getElementById('blueberries');

	// 	blueberries.ondragstart = function () {
	// 		return false;
	// 	};

	// 	blueberries.onmousedown = function (e) {
	// 		var clientRect = getClientRect(blueberries);
	// 		var shiftX = e.pageX - clientRect.left;
	// 		var shiftY = e.pageY - clientRect.top;

	// 		blueberries.style.position = 'absolute';
	// 		document.body.appendChild(blueberries);
	// 		moveAt(e, shiftX, shiftY);

	// 		document.onmousemove = function (e) {
	// 			moveAt(e, shiftX, shiftY);
	// 		};

	// 		blueberries.onmouseup = function () {
	// 			document.onmousemove = null;
	// 			blueberries.onmouseup = null;
	// 		};
	// 	}

	// 	function moveAt(e, shiftX, shiftY) {
	// 		blueberries.style.left = e.pageX - shiftX + 'px';
	// 		blueberries.style.top = e.pageY - shiftY + 'px';
	// 	}
	// }

	public onEditCourse(course: CourseItem): void {
		this.editCourse.emit(course);
	}

	public onDeleteCourse(course: CourseItem): void {
		this.deleteCourse.emit(course);
	}

}
