import {Component, EventEmitter, Output, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';

import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category.model';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {

  private sub1: Subscription;


  @Output() categoryAdd = new EventEmitter<Category>();

  private add_category_validation_messages = {
    'name': [
      {type: 'required', message: 'Название категории не может быть пустым.'}
    ],
    'capacity': [
      {type: 'required', message: 'Поле не может быть пустым'}
    ]
  };

  constructor(private categoriesService: CategoriesService) {

  }


  onSubmit(form: NgForm) {
    let name: any, capacity: any;
    ({name, capacity} = form.value);
    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new Category(name, capacity);

    this.sub1 = this.categoriesService.addCategory(category)
      .subscribe((c: Category) => {
        form.reset();
        form.form.patchValue({capacity: 1});
        this.categoryAdd.emit(c);
      });

  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
