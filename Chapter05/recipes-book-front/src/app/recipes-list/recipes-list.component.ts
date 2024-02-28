import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RecipesService } from '../core/services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent implements OnInit {

  constructor(private service: RecipesService) { }
  
  recipes$ = this.service.recipes$;

  ngOnInit(): void {
  }
}
