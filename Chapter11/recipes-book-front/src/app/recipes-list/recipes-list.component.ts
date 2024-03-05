import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../core/services/recipes.service';
import { Recipe } from '../core/model/recipe.model';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { SharedDataService } from '../core/services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent implements OnInit {

  constructor(private service: RecipesService, private sharedService: SharedDataService, private router: Router) { }
  recipes$ = this.service.recipes$;

  /* The readonly stream */
  filterRecipesAction$ = this.service.filterRecipesAction$;

  filteredRecipes$ = combineLatest([this.recipes$, this.filterRecipesAction$]).pipe(
    map(([recipes, filter]: [Recipe[], Recipe]) => {
      return recipes.filter(recipe => recipe.title?.toLowerCase()
      .indexOf(filter?.title?.toLowerCase() ?? '') != -1)
    })
  );

  ngOnInit(): void {
  }

  onRating(event: any, recipe: Recipe) {
    console.log(event.value)
  }

  onCancelRating(recipe: Recipe) {
    console.log(recipe)
  }

  editRecipe(recipe: Recipe) {
    this.sharedService.updateSelectedRecipe(recipe);
    this.router.navigate(['/recipes/details']);
 }
}
