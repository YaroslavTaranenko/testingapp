import { Injectable } from '@angular/core';
import { Test } from './test';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  tests: Test[] = [
    { name: 'Math', lastExamine: null, rating: 0.0, questions: [
        { text: '5 + 5 is: ', answers: [
          { text: '10', isCorrext: true },
          { text: '55', isCorrext: false },
          { text: '15', isCorrext: false },
          { text: '25', isCorrext: false }
        ]},
        { text: '10 - 5 is: ', answers: [
          { text: '15', isCorrext: false },
          { text: '20', isCorrext: false },
          { text: '5', isCorrext: true },
          { text: '10', isCorrext: false }
        ]},
        { text: '10 * 15 is: ', answers: [
          { text: '100', isCorrext: false },
          { text: '150', isCorrext: true },
          { text: '15', isCorrext: false },
          { text: '200', isCorrext: false }
        ]}
      ]
    }, { name: 'Geometry', lastExamine: new Date('13:25:00 15-08-2018'), rating: 50, questions: [
      { text: 'Round square: ', answers: [
        { text: '(2*3,14*r)^2', isCorrext: true },
        { text: '55', isCorrext: false },
        { text: '15', isCorrext: false },
        { text: '25', isCorrext: false }
      ]},
      { text: 'Square square: ', answers: [
        { text: '(2piR)^2', isCorrext: false },
        { text: '20', isCorrext: false },
        { text: 'a^2', isCorrext: true },
        { text: '10', isCorrext: false }
      ]},
      { text: 'Paralelepiped square ', answers: [
        { text: '100', isCorrext: false },
        { text: 'a * b', isCorrext: true },
        { text: '15', isCorrext: false },
        { text: '200', isCorrext: false }
      ]}
      ]
    }, { name: 'Programming', lastExamine: null, rating: 0.0, questions: [
        { text: 'Array declaration: ', answers: [
          { text: 'let arr = [];', isCorrext: true },
          { text: '55', isCorrext: false },
          { text: '15', isCorrext: false },
          { text: '25', isCorrext: false }
        ]},
        { text: 'String declaration: ', answers: [
          { text: '15', isCorrext: false },
          { text: '20', isCorrext: false },
          { text: 'let a: string; ', isCorrext: true },
          { text: '10', isCorrext: false }
        ]},
        { text: 'Importing class: ', answers: [
          { text: '100', isCorrext: false },
          { text: 'import { ClassName } from "path/to/class";', isCorrext: true },
          { text: '15', isCorrext: false },
          { text: '200', isCorrext: false }
        ]}
      ]
    }
  ];

  getTests(): Observable<Test[]> {
    return of(this.tests);
  }

  constructor() { }
}
