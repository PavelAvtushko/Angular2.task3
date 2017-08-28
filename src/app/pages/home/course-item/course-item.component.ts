import { Component, ViewEncapsulation, EventEmitter, Input, Output, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CourseItem } from '../../../core/entities';

@Component({
	selector: 'course-item',
	templateUrl: 'course-item.component.html',
	styles: [require('./course-item.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	//changeDetection: ChangeDetectionStrategy.OnPush
})

export class CourseItemComponent {
	private shiftX: number;
	private shiftY: number;
	@Input() public course: CourseItem;
	@Input() public coord: any;
	@Output() public deleteCourse: EventEmitter<CourseItem> = new EventEmitter<CourseItem>();
	@Output() public editCourse: EventEmitter<CourseItem> = new EventEmitter<CourseItem>();
	@Output() public checkCourseItem: EventEmitter<CourseItem> = new EventEmitter<CourseItem>();


	constructor(private elementRef: ElementRef) {
	}

	public mouseDown(course, $event) {
		// if ($event.target.type !== 'button') {

			const box = this.elementRef.nativeElement.getBoundingClientRect();
			this.shiftX = this.coord.left - box.left + pageXOffset;
			this.shiftY = this.coord.top - box.top + pageYOffset;

		 	this.checkCourseItem.emit(course);
		// 	console.log('child', this.coord.left, this.coord.top);
		// 	document.onmousemove = () => {

		// 		this.moveAt();
		// 	};
		// };
	}

	public ngAfterContentInit() {
	
		var blueberries = this.elementRef.nativeElement;

		blueberries.ondragstart = function () {
			return false;
		};

		// this.coord.left = $event.pageX;
		// this.coord.top = $event.pageY;

		blueberries.onmousedown = (e) => {
			
			//var clientRect = getClientRect(blueberries);
			var box = this.elementRef.nativeElement.getBoundingClientRect();
			var shiftX = this.coord.left - box.left + pageXOffset;
			var shiftY = this.coord.top - box.top + pageYOffset;

			blueberries.style.position = 'absolute';

			moveAt(shiftX, shiftY);

			document.onmousemove = (e) => {
				moveAt(shiftX, shiftY);
			};

			blueberries.onmouseup = function() {
				document.onmousemove = null;
				blueberries.onmouseup = null;
			};
		}

		const moveAt = (shiftX, shiftY) => {
			blueberries.style.left = this.coord.left - this.shiftX + 'px';
			blueberries.style.top = this.coord.top - this.shiftY + 'px';
		}

		function getClientRect(elem) {
			var box = elem.getBoundingClientRect();

			return {
				top: box.top + pageYOffset,
				left: box.left + pageXOffset
			};
		}

	}

	public moveAt() {
		console.dir(this.elementRef);

		console.log(' this.coord.left', this.coord.left);
		console.log('this.shiftX', this.shiftX);
		console.log(' this.coord.left - this.shiftX ', this.coord.left - this.shiftX + 'px');
		console.dir(this.elementRef.nativeElement.style.left);
		this.elementRef.nativeElement.style.left = this.coord.left - this.shiftX + 'px';
		this.elementRef.nativeElement.style.top = this.coord.top - this.shiftY + 'px';
	}

	// public event() {

	// 	var blueberries = document.getElementById('blueberries');

	// 	blueberries.ondragstart = function () {
	// 		return false;
	// 	};

	// 	blueberries.onmousedown = function (e) {
	// 		var clientRect = getClientRect(blueberries);


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

	public onEditCourse(course: CourseItem): void {
		this.editCourse.emit(course);
		//this.ref.markForCheck();
	}

	public onDeleteCourse(course: CourseItem): void {
		this.deleteCourse.emit(course);
	}

}
