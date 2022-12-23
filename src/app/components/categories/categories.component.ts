import {Component, OnInit} from '@angular/core';
import {TodosGetList} from "../../store/actions/todos.action";
import {CategoriesGetList} from "../../store/actions/categories.action";
import {Store} from "@ngxs/store";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoriesState} from "../../store/states/categories.state";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(private store: Store, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.store.dispatch(new CategoriesGetList());

    this.store.select(CategoriesState.getCategories).subscribe((list) => {
      this.categories = list;
    });
  }
}
