import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../../models/pokemon';
import { PokemonAmount } from '../../models/pokemon-amount';
import { PokemonResult } from '../../models/pokemon-result';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

  pokemon: Pokemon[] = [];
  pokemonAmount!: PokemonAmount;
  sprites!: any;
  urlImg!: string;
  pkmResult!: Array<PokemonResult>
  pageNumber: number = 0;
  previousDisabled: boolean = true;
  lastPageNumber: number = 999;
  countAmount: number = 0;
  nextDisabled: boolean = false;
  detailHidden: boolean = true;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    const offset = 0
    const limit = 20

    let newName = ''
    this.pokemonService.readByAmount(offset,limit).subscribe(pokemonAmount => {
      
      this.pokemonAmount = pokemonAmount
      this.pkmResult = this.pokemonAmount.results
      this.countAmount = this.pokemonAmount.count
      this.pageNumber = 1;
      this.lastPageNumber = Math.ceil(this.countAmount / limit)
      if(this.pageNumber === this.lastPageNumber){
        this.previousDisabled = true
        this.nextDisabled = true
      }
      this.pokemonAmount.results.forEach(obj => {
        newName = obj.name
        this.pokemonService.readByName(newName).subscribe(pokemon => {
          this.pokemon.push(pokemon)
        })
      })
    })
  }

  getPokemon() {
    return this.pokemon;
  }

  onClickButtonPrevious(){
    let newName = ''
    this.pokemon = []
    this.pokemonService.readByPage(this.pokemonAmount.previous).subscribe(pokemonAmount => {
      this.pokemonAmount = pokemonAmount
      this.pkmResult = this.pokemonAmount.results
      if(this.pokemonAmount.previous === null){
        this.pageNumber = 1;
      }
      this.pokemonAmount.results.forEach(obj => {
        newName = obj.name
        this.pokemonService.readByName(newName).subscribe(pokemon => {
        
          this.pokemon.push(pokemon)
        })
      })
    })
    this.pageNumber = this.pageNumber - 1
    if(this.pageNumber === 1 ){
      this.previousDisabled = true
    } 
    if(this.pageNumber !== this.lastPageNumber){
      this.nextDisabled = false
    }
  }

  onClickButtonNext() {
    let newName = ''
    this.pokemon = []
    this.pokemonService.readByPage(this.pokemonAmount.next).subscribe(pokemonAmount => {
      this.pokemonAmount = pokemonAmount
      console.log('antes if next null this page: ', this.pageNumber)
      if(pokemonAmount.next === null){
        this.pageNumber = this.lastPageNumber
        console.log('next null this page: ', this.pageNumber)
      }
      this.pkmResult = this.pokemonAmount.results
      this.pokemonAmount.results.forEach(obj => {
        newName = obj.name
        this.pokemonService.readByName(newName).subscribe(pokemon => {
        
          this.pokemon.push(pokemon)
        })
      })
    })
    this.pageNumber = this.pageNumber + 1
    if(this.pageNumber !== 1 ){
      this.previousDisabled = false
    }
    if(this.pageNumber === this.lastPageNumber){
      this.nextDisabled = true
    }
  }

}
