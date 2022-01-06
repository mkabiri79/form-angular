import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { IUser } from '../Model/Model';
import { Observable, tap } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: IUser[];
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users = this.usersService.getUsers();
  }
}
