/*
 * Angular 2 decorators and services
 */
import {
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	styles: [
		require('./styles/vendors.scss'),
		require('./styles/index.scss'),
		require('./app.styles.scss')
	],
	template: require('./app.template.html')
})
export class AppComponent implements OnInit {
	public userName: string;
	private shift = { shiftX: 0, shiftY: 0 };

	constructor() {
	}

	public ngOnInit() {
	}

	public chooseCourseItem = ({$event, element }): void => {
		const box = element.getBoundingClientRect();
		this.shift = {
			shiftX: $event.pageX - box.left - pageXOffset,
			shiftY: $event.pageY - box.top - pageYOffset
		}
		console.dir(this.shift)
	}
}
