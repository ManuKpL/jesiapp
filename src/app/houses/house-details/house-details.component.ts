import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { HousesService } from './../houses.service';
import { CharactersService } from './../../characters/characters.service';
import { House } from '../House';
import { Character } from '../../characters/Character';

@Component({
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss'],
})
export class HouseDetailsComponent implements OnInit {
  public readonly pageTitle = "House's Details";

  public characters$!: Observable<Character[]>;
  public house$!: Observable <House>;

  public constructor(private route: ActivatedRoute,private houseService: HousesService, private characterService: CharactersService, private router: Router) {}

  public ngOnInit(){
    const { id } = this.route.snapshot.params;
    this.house$ = this.houseService.getHouse(id);
    console.log(this.house$);
    this.characters$ = this.characterService.listHouseCharacters(id);
  }

}
