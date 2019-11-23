import { Component, OnInit, Input } from '@angular/core';
import { House } from '../House';

@Component({
  selector: 'jesi-house-thumbnail',
  templateUrl: './house-thumbnail.component.html',
  styleUrls: ['./house-thumbnail.component.scss'],
})
export class HouseThumbnailComponent {
  @Input() house: House;
  @Input() isFavorite: boolean;
}
