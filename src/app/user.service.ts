import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  currentUser: User = {
    firstName: 'Yaroslav',
    lastName: 'Taranenko',
    photo: 'default.jpg',
    studyClass: '7A'
  };

  getCurUser(): Observable<User> {
    return of(this.currentUser);
  }
  constructor() { }
}
