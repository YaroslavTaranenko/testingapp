import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { DataService } from './../data.service';
import { User } from './../user';
import { Test } from './../test';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {
  user: User;
  tests: Test[];
  constructor(private userSrv: UserService, private dataSrv: DataService) { }

  getUser() {
    this.userSrv.getCurUser().subscribe(
      (usr) => { this.user = usr; }
    );
  }
  getTests(): void {
    this.dataSrv.getTests().subscribe(
      (data) => { this.tests = data; }
    );
  }
  ngOnInit() {
    this.getTests();
    this.getUser();
  }

}
