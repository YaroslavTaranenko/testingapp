import { Question } from './question';

export class Test {
    name: string;
    lastExamine: Date;
    rating: number;
    questions: Question[];
    constructor (name: string, lastExamine: Date = null, rating: number, questions: Question[]) {
        this.name = name;
        this.lastExamine = lastExamine;
        this.rating = rating;
        this.questions = questions;
    }
}
