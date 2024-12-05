import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../helpers/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  template: `
    <img class="w-full h-46 rounded-t-xl" [src]="gif.images.downsized_medium.url" [alt]="gif.id">
    <div class="p-4 md:p-5">
      <h3 class="text-lg font-bold text-gray-800 dark:text-white">
        {{gif.title}}
      </h3>
    </div>
  `
})
export class GifsCardComponent implements OnInit {

  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif Property is required');
  }

}
