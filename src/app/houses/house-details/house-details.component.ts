import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { JesiappPage } from 'src/app/shared/JesiappPage';
import { CharactersService } from 'src/app/characters/characters.service';
import { HousesService } from '../houses.service';
import { Character } from 'src/app/characters/Character';
import { House } from '../House';
import { UserService } from 'src/app/user/user.service';

@Component({
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss'],
})
export class HouseDetailsComponent implements OnInit, JesiappPage {
  public pageTitle = 'House Details';

  public isFavorite!: boolean;

  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly housesService: HousesService,
    private readonly charactersService: CharactersService,
    private readonly userService: UserService,
  ) {}

  public house$: Observable<House>;
  public characters$: Observable<Character[]>;

  public ngOnInit(): void {
    const id = this.readId();
    this.fetchData(id);
    this.setIsFavorite(id);
  }

  public addAsFavorite(houseId: number): void {
    this.userService.addFavoriteHouse(houseId).subscribe(() => {
      this.isFavorite = true;
    });
  }

  private fetchData(id: number) {
    this.house$ = this.housesService.getHouse(id);
    this.characters$ = this.charactersService.listHouseCharacters(id);
  }

  private readId(): number {
    const { id } = this.activatedRoute.snapshot.params;
    return parseInt(id, 10);
  }

  private setIsFavorite(id: number): void {
    const { currentUser } = this.userService;
    if (currentUser) {
      this.isFavorite = id === currentUser.favoriteHouse;
    }
  }
}
