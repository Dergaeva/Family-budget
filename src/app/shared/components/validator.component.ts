import {Component, ContentChild, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormControlName, NgForm} from '@angular/forms';

@Component({
  selector: 'app-validator',
  template: `
    <ng-content></ng-content>
    <div *ngIf="formControl.invalid">
      <div *ngIf="formControl.errors.required && (form.invalid || formControl.touched)">
        <span class="label label-danger">Пожалуйста, введите {{ formControl.name }} qqqq</span>
      </div>
      <div *ngIf="formControl.errors.email && (form.invalid || formControl.touched)">
        <span class="label label-danger"> Введите корректный email. qqq</span>
      </div>
      <div *ngIf="formControl.errors.forbiddenEmail && (form.invalid || formControl.touched)">
        <span class="label label-danger">Email уже занят. qqqq </span>
      </div>
    </div>
    <div *ngIf="formControl.status === 'PENDING'">
      <img src="https://i.forbesimg.com/assets/img/loading_spinners/43px_on_transparent.gif"/> Checking...
    </div>
`,
  styles: [
    `
    img {
      width: 20px;
      height: 20px;
    }
  `
  ]
})

export class ValidatorComponent implements OnInit {
  @ContentChild(FormControlName, {static: false}) formControl;
  constructor(private form: NgForm) {

  }

  ngOnInit() { }

}
