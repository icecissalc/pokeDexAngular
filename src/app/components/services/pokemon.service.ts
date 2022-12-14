import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { PokemonAmount } from '../models/pokemon-amount';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrlPk = "https://pokeapi.co/api/v2/pokemon"

  readById(id: number): Observable<Pokemon> {
    const url = `${this.baseUrlPk}/${id}`
    return this.http.get<Pokemon>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readByName(name: string): Observable<Pokemon> {
    const url = `${this.baseUrlPk}/${name}`
    return this.http.get<Pokemon>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readByAmount(offset: number, limit: number): Observable<PokemonAmount> {
    const url = `${this.baseUrlPk}/?offset=${offset}&limit=${limit}`
    return this.http.get<PokemonAmount>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  readByPage(url: string): Observable<PokemonAmount> {
    return this.http.get<PokemonAmount>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    return EMPTY
  }
}
