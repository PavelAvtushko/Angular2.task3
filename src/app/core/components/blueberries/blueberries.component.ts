import { ElementRef, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';
import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '../../services';

@Component({
	selector: 'blueberries',
	templateUrl: 'blueberries.component.html',
	styles: [require('./blueberries.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlueberriesComponent implements AfterViewInit {

	public imagePath: string = 'http://miles.by/blueberries.png';
	@Input() public shift: any;
	@Output() public chooseCourseItem: EventEmitter<any> = new EventEmitter<any>();

	constructor(
		private elementRef: ElementRef) {
	}

	public mouseDown($event) {
		const element = this.elementRef.nativeElement;
		this.chooseCourseItem.emit({ $event, element });
	}

	public ngAfterViewInit() {
		this.elementRef.nativeElement.ondragstart = () => {
			return false;
		};

		this.elementRef.nativeElement.onmousedown = ($event) => {
			this.elementRef.nativeElement.style.position = 'absolute';
			document.body.appendChild(this.elementRef.nativeElement);
			this.moveAt($event);

			document.onmousemove = (e) => {
				this.moveAt(e);
			};
		};
	}

	public mouseUp() {
		document.onmousemove = null;
		this.elementRef.nativeElement.onmouseup = null;
	}

	private moveAt(e) {
		this.elementRef.nativeElement.style.left = e.pageX - this.shift.shiftX + 'px';
		this.elementRef.nativeElement.style.top = e.pageY - this.shift.shiftY + 'px';
	};
};
