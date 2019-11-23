import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { JesiappPage } from 'src/app/shared/JesiappPage';
import { HousesService } from '../houses.service';
import { House } from '../House';
import { UserService } from 'src/app/user/user.service';

@Component({
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss'],
})
export class HousesListComponent implements OnInit, JesiappPage {
  public readonly pageTitle = 'Houses list';

  public favoriteHouseId!: number;
  public houses$!: Observable<House[]>;

  public constructor(
    private readonly housesService: HousesService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  public ngOnInit() {
    this.loadHouses();
    this.initFavoriteHouseId();
  }

  public openDetails(houseId: number): void {
    this.router.navigateByUrl(`/houses/${houseId}`);
  }

  private loadHouses() {
    this.houses$ = this.housesService.listHouses();
  }

  private initFavoriteHouseId(): void {
    const { currentUser } = this.userService;
    if (currentUser) {
      this.favoriteHouseId = currentUser.favoriteHouse;
    }
  }
}
