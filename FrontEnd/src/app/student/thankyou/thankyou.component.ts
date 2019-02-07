import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  template: `
    <p>
      Thank you for the exam. You will receive an email regarding your score.
    </p>
  `,
  styles: []
})
export class ThankyouComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
