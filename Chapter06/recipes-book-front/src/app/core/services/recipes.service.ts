import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/environments/environment';
// import { catchError, of } from 'rxjs';

const BASE_PATH = environment.basePath

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

  constructor(private http: HttpClient) { }

  recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`);
  
  private filterRecipeSubject = new BehaviorSubject<Recipe>({title: '' });
  filterRecipesAction$ = this.filterRecipeSubject.asObservable();

  updateFilter(criteria: Recipe) {
    this.filterRecipeSubject.next(criteria);
  }
}
