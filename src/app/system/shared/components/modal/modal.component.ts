import {Component, Input} from '@angular/core';
import {NgxSmartModalService} from 'ngx-smart-modal';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() header = 'Фильтр';

  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }

}
