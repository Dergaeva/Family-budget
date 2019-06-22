import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';


import {UserService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {fadeStateTrigger} from "../../shared/animations/fade.animation";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {


  form:FormGroup;
  message:Message;

  account_validation_messages = {
    'email': [
      {type: 'required', message: 'Email не может быть пустым.'},
      {type: 'email', message: 'Введите корректный email'}
    ],
    'password': [
      {type: 'required', message: 'Пароль не может быть пустым.'},
      {type: 'minlength', message: 'Пароль должен быть больше 5 сиволов '}
    ]
  };

  constructor(private userService:UserService,
              private authService:AuthService,
              private router:Router,
              private route:ActivatedRoute,
              private title:Title,
              private meta: Meta
  ) {
    title.setTitle('Вход в систему');
    meta.addTags([
      {name: 'keywords', content: 'логин, вход, ситема'},
      {name: 'description', content: 'Страница для входа в ситему'}
    ])

  }

  ngOnInit() {
    this.message = new Message('danger', '');

    this.route.queryParams
      .subscribe((params:Params) => {
        if (params['nowCanLogin']) {
          this.showMessage({
            text: 'Теперь вы можете зайти в систему',
            type: 'success'
          });
        } else if (params['accessDenied']) {
          this.showMessage({
            text: 'Для работы с системой необходимо залогинется',
            type: 'warning'
          });
        }
      });


    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message:Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }


  onSubmit() {
    const formData = this.form.value;

    this.userService.getUserbyEmail(formData.email)
      .subscribe((user:User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            this.authService.login(user);
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage({
              text: 'Пароль неверный',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'Пользователь не найден',
            type: 'danger'
          });
        }

      });
  }

}
