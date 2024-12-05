import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get _tagsHistory(): string[] {
    return [...this.gifsService.tagsHistory]
  }

  public searchGif(tag: string): void {
    this.gifsService.searchTag(tag);
  }

}
