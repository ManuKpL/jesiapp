import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { JesiappPage } from 'src/app/shared/JesiappPage';
import { HousesService } from '../houses.service';
import { House } from '../House';

@Component({
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss'],
})
export class HousesListComponent implements OnInit, JesiappPage {
  public readonly pageTitle = 'Houses list';

  public houses$!: Observable<House[]>;

  public constructor(private readonly housesService: HousesService, private readonly router: Router) {}

  public ngOnInit() {
    this.loadHouses();
  }

  public openDetails(id) {
    this.router.navigateByUrl('/houses/' + id);
  }

  private loadHouses() {
    this.houses$ = this.housesService.listHouses();
  }
}
