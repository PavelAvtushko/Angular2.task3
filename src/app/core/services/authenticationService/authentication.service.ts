import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

const users = [
	{
		name: 'pasha',
		pass: '123'
	},
	{
		name: 'name 2',
		pass: '321'
	}
];

@Injectable()
export class AuthenticationService {

	private userlogin: string;
	private subject = new Subject<string>();

	constructor() {
	}

	public logOut() {
		this.userlogin = null;
		return this.userlogin;
	}

	public logIn(log, pass) {
		if (!log || !pass) { return; }

		const user = users.find((el) => el.name === log);

		if (user) {
			this.userlogin = (user.pass === pass) ? log : null;
		} else {
			users.push({ name: log, pass });
			this.userlogin = log;
		}
		return this.userlogin;
	}

	public getUserInfo() {
		return this.userlogin;
	}

	public isAuthenticated() {
		return !!this.userlogin;
	}

	public sendUserLog(userlogin: string) {
		this.subject.next(userlogin);
	}

	public clearUserLog() {
		this.subject.next();
	}

	public getUserLog(): Observable<any> {
		return this.subject.asObservable();
	}
}
