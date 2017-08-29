import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlueberriesComponent } from './blueberries.component';

@NgModule({
	imports: [CommonModule],
	declarations: [
		BlueberriesComponent
	],
	providers: [],
	exports: [BlueberriesComponent]
})
export class BlueberriesModule {
	constructor() {
	}
}
