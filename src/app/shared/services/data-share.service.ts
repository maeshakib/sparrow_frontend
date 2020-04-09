import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// import { User } from './../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
	public userId: any = null;
	public userName: string = null;
	public pp: string = null;
	private user = new BehaviorSubject(null);
	private chatList = new BehaviorSubject(null);
	private userPP = new BehaviorSubject(null);
	selectedChatList: Observable<any> = this.chatList.asObservable();
	selectedUser: Observable<any> = this.user.asObservable();
	selectedUserPP: Observable<string> = this.userPP.asObservable();

	constructor() { }

	changeSelectedUser(message) {
		this.user.next(message);
	}

	getUserId(): number {
		// if (this.userId  === null) {
		// 	this.userId = localStorage.getItem('userid');
		// }
		this.userId = localStorage.getItem('userId');
		return this.userId;
	}

	getUserName(): string {
		// if (this.userName === null) {
		// 	this.userName = localStorage.getItem('username');
		// }
		this.userName = localStorage.getItem('username');
		return this.userName;
	}

	getUserPP(): string {
		// if (this.pp === null) {
		// 	this.pp = localStorage.getItem('pp');
		// }
		this.pp = localStorage.getItem('pp');
		return this.pp;
	}

	changeChatList(users) {
		this.chatList.next(users);
	}

	changeUserPP(pp) {
		this.userPP.next(pp);
	}
}
