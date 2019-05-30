import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../../shared/models/category.model';
import {CategoriesService} from '../../shared/services/categories.service';
import {Message} from '../../../shared/models/message.model';


@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Output() categoryEdit = new EventEmitter<Category>();


  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  edit_category_validation_messages = {
    'name': [{type: 'required', message: 'Название категории не может быть пустым.'}],
    'capacity': [{type: 'required', message: 'Поле не может быть пустым'}]
  };


  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);

  }

  onSubmit(form: NgForm) {
    let capacity: any, name: any;
    ({capacity, name} = form.value);
    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new Category(name, capacity, +this.currentCategoryId);

    this.categoriesService.updateCategory(category)
    // tslint:disable-next-line:no-shadowed-variable
      .subscribe((category: Category) => {
        this.categoryEdit.emit(category);
        this.message.text = 'Категория успешно отредактирована';
        window.setTimeout(() => this.message.text = '', 5000);

      });

  }

}


