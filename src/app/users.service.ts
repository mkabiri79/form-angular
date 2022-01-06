import { Injectable } from '@angular/core';
import { mockdata } from 'src/assets/mockData';
import { HttpClient } from '@angular/common/http';
import { IUser } from './Model/Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: IUser[] = mockdata;
  getUsers() {
    return this.users;
  }
  postUsers(user: IUser) {
    console.log(this.users);
    this.users.unshift(user);
  }
}
