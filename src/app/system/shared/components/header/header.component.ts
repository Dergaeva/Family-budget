import {Component, OnDestroy} from '@angular/core';
import {AuthService} from '../../../../shared/services/auth.service';
import {User} from '../../../../shared/models/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  date: Date = new Date;
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(private authService: AuthService) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
