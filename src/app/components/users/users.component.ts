import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  UserData,
  UserService,
} from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  dataSource: UserData | null = null;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role'];
  filterValue: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.userService.findAll(1, 10).subscribe((userData) => {
      this.dataSource = userData;
      console.log(this.dataSource);
    });
  }

  onPaginateChange(event: PageEvent) {
    const page = event.pageIndex;
    const size = event.pageSize;

    if (!this.filterValue) {
      this.userService
        .findAll(page + 1, size)
        .subscribe((userData) => (this.dataSource = userData));
    } else {
      this.userService
        .paginateByName(page, size, this.filterValue)
        .subscribe((userData) => (this.dataSource = userData));
    }
  }

  findByName(username: string) {
    this.userService
      .paginateByName(0, 10, username)
      .subscribe((userData) => (this.dataSource = userData));
  }
}
