import { Component, ViewEncapsulation, OnInit, OnDestroy, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { Pipe, PipeTransform, ElementRef } from '@angular/core';
import { CourseService, ChartService, AuthenticationService } from '../../core/services';
import { CourseItem } from '../../core/entities';

import { TodoService } from '../../core/services';
import { TodoItem } from '../../core/entities';

@Component({
	selector: 'home',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./home.styles.scss')],
	template: require('./home.template.html')
})

export class HomeComponent implements OnInit, OnDestroy {
	public courseData: CourseItem;
	// private todoServiceSubscription: Subscription;
	// private todoList: TodoItem[];
	private authenticationSubscription: Subscription;
	private isLoading: boolean = false;
	private courseList: CourseItem[];
	private isShowingForm: boolean = false;
	private chartData: any;
	private chartName: string;
	private coord = {left:0, top:0};
	private userName: string;

	constructor(
		// private todoService: TodoService,
		private courseService: CourseService,
		private chartService: ChartService,
		private authenticationService: AuthenticationService,
		private elementRef: ElementRef) {
	}

	public ngOnInit() {
		this.chartName = 'The biggest cities in the world';
		this.chartService.getChartData((res) => {
			this.chartData = res.json();
		});

		this.isLoading = false;
		// this.todoServiceSubscription = this.todoService.getTodoItems().subscribe((res: TodoItem[]) => {
		// 	this.todoList = res;
		// 	this.isLoading = false;
		// });

		this.authenticationSubscription = this.authenticationService.getUserLog().subscribe((userLog) => {
			this.userName = userLog;
			this.courseList = this.courseService.getList(this.userName);
		});
	}

	public ngOnDestroy() {
		// this.todoServiceSubscription.unsubscribe();
		this.authenticationSubscription.unsubscribe();
	}

	public deleteCourse = (course: CourseItem): void => {
		this.courseService.removeItem(this.userName, course.id);
		this.courseList = this.courseList.filter((elem) => elem !== course);
		this.showForm(false);
	}

	public checkCourseItem = (course: CourseItem): void => {
		console.log('mousedown on element', course);
		//console.log(this.coord.left, this.coord.top);
	}

	public hand ($event){
		this.coord.left = $event.pageX;
		this.coord.top = $event.pageY;
	}

	public editCourse = (course: CourseItem): void => {
		this.courseData = course;
		this.showForm(true);
	}

	public addNewCourse = (data): void => {
		this.courseList = (data.id)
			? this.courseService.updateItem(this.userName, data)
			: this.courseService.createCourse(this.userName, data);
		this.showForm(false);
	}

	public findCourses(request: string) {
		this.courseList = this.courseService.findItems(this.userName, request);
	}

	private showForm = (flag: boolean): void => {
		if (!flag) {
			this.courseData = null;
		}
		this.isShowingForm = flag;
	}
}
