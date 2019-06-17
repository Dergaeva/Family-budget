import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {combineLatest} from 'rxjs';
import {NgxSmartModalService} from 'ngx-smart-modal';
import * as moment from 'moment';

import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Category} from '../shared/models/category.model';
import {APPEvent} from '../shared/models/event.model';


@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {


  isLoaded = false;
  sub1:Subscription;

  categories:Category[] = [];
  events:APPEvent[] = [];
  filteredEvents:APPEvent[] = [];

  chartData = [];


  constructor(private categoriesService:CategoriesService,
              private eventService:EventsService,
              public ngxSmartModalService:NgxSmartModalService) {
  }




  ngOnInit() {
    this.sub1 = combineLatest([
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ]).subscribe((data:[Category[], APPEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];

      this.setOriginalEvents();
      this.calculateChartData();

      this.isLoaded = true;
    });
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  openModalPopup() {
    this.ngxSmartModalService.open('itemModal');
  }

  isApplyFilter(filterData) {

    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
    this.ngxSmartModalService.close('itemModal');
  }

  isCloseFilter() {
    this.setOriginalEvents();
    this.calculateChartData();
    this.ngxSmartModalService.close('itemModal');
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
