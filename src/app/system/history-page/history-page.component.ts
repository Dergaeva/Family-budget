import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Category} from '../shared/models/category.model';
import {APPEvent} from '../shared/models/event.model';
import {Subscription} from 'rxjs/Subscription';
import {combineLatest} from 'rxjs';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {


  private isLoaded = false;
  private sub1: Subscription;

  categories: Category[] = [];
  events: APPEvent[] = [];

  private chartData = [];


  constructor(private categoriesService: CategoriesService,
              private eventService: EventsService,
              public ngxSmartModalService: NgxSmartModalService) {
  }


  
  openModalPopup() {
    this.ngxSmartModalService.open('itemModal');
  }

  ngOnInit() {
    this.sub1 = combineLatest([
      this.categoriesService.getCategories(),
      this.eventService.getEvents()
    ]).subscribe((data: [Category[], APPEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];

      this.calculateChartData();

      this.isLoaded = true;
    });
  }

  private calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat) => {
      const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  filterApply(filterData) {
    console.log(filterData);
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
