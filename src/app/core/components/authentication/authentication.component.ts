import { Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../services';

@Component({
	selector: 'authentication',
	templateUrl: 'authentication.component.html',
	styles: [require('./authentication.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class AuthenticationComponent {
	public user: string;

	constructor(
		public authenticationService: AuthenticationService) {
	}

	public logOut(e) {
		e.preventDefault();
		this.user = this.authenticationService.logOut();
		this.sendUserLog();
	}

	public logIn(e, log, pass) {
		e.preventDefault();
		this.user = this.authenticationService.logIn(log, pass);
		this.sendUserLog();
	}

	public getUserInfo(e) {
		e.preventDefault();
		const currentuser = this.authenticationService.getUserInfo();
		console.log('current user: ' + currentuser);
	}

	public sendUserLog(): void {
		this.authenticationService.sendUserLog(this.user);
	}

	public clearUserLog(): void {
		this.authenticationService.clearUserLog();
	}
}
