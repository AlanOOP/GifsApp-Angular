import { Component, Input } from '@angular/core';
import { Gif } from '../../helpers/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html'
})
export class CardListComponent {

  @Input()
  public gifList: Gif[] = [];


}
