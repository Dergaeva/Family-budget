import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {combineLatest} from 'rxjs';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Category} from '../shared/models/category.model';
import {APPEvent} from '../shared/models/event.model';
import {HistoryFilterComponent} from './history-filter/history-filter.component';


@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(private categoriesService: CategoriesService,
              private eventService: EventsService,
              private modalService: NgbModal
              ) {
  }

  private isLoaded = false;
  private sub1: Subscription;

  categories: Category[] = [];
  events: APPEvent[] = [];

  private chartData = [];

  private isFilterVisible = false;

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

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  filterApply(filterData) {
    console.log(filterData);
  }

  filterCancel() {
    this.toggleFilterVisibility(false);
  }

  open() {
    // const modalRef = this.modalService.open(ModalComponent);
    this.modalService.open(HistoryFilterComponent);
    // modalRef.componentInstance.header = 'About';
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
