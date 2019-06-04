import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {


  // @Output() itemModal;
  @Output() filterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  private selectedPeriod = 'd';
  private selectedTypes = [];
  private selectedCategories = [];

  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }

  private timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'}
  ];

  private types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];


  closeFilter() {
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = 'd';
    this.ngxSmartModalService.close('itemModal');
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }

  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({checked, value}) {
    this.calculateInputParams('selectedCategories', checked, value);
  }

  applyFilter() {
    this.filterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

}

