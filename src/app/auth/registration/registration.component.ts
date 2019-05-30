import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import {UserService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  registration_validation_messages = {
    'email': [
      {type: 'required', message: 'Email не может быть пустым.'},
      {type: 'email', message: 'Введите корректный email.'},
      {type: 'forbiddenEmail', message: 'Email уже занят.'}
    ],
    'password': [
      {type: 'required', message: 'Пароль не может быть пустым.'},
      {type: 'minlength', message: 'Пароль должен быть меньше 5 сиволов.'}
    ],
    'name': [
      {type: 'required', message: 'Имя не может быть пустым.'},
      {type: 'minlength', message: 'Имя не должно быть меньше 3 сиволов.'}
    ]
  };

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'agree': new FormControl(false, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);

    this.userService.createNewUser(user)
      .subscribe(() => {
          this.router.navigate(['/login'], {
            queryParams: {
              nowCanLogin: true
            }
          });
        }
      );
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return this.userService.getUserbyEmail(control.value)
      .toPromise()
      .then((user: User) => {
        if (user) {
          return {forbiddenEmail: true};
        } else {
          return null;
        }
      });
  }

}
