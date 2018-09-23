import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { Test } from './../test';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Test[];
  tasks$: Test[];
  private searchTerms = new Subject<string>();

  constructor(private dataSrv: DataService) { }
  search(term: string): void {
    this.tasks$ = this.tasks;
    if (term.length === 0) { return; }
    const nTasks = [];
    this.tasks.forEach( (val, idx) => {
      const n: string = (val.name as string).toLowerCase();
      if (n.indexOf(term.toLowerCase()) > -1) {
        nTasks.push(val);
      }
    });
    this.tasks$ = nTasks;
  }
  getTasks(): void {
    this.dataSrv.getTests().subscribe(
      (data) => { this.tasks = data; this.tasks$ = data; }
    );
  }
  ngOnInit() {
    this.getTasks();
  }

}
