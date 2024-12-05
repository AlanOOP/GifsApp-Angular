import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../helpers/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private apiKey = import.meta.env.NG_APP_PUBLIC_API_KEY;

  public gifsList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('History Ready');
    this.searchLoadNav();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
  }

  private searchLoadNav(): void {
    if (this._tagsHistory.length < 1) return;
    const tag = this._tagsHistory[0]
    this.searchTag(tag)
  }

  private organizeHistory(tag: string): void {
    tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory.slice(0, 10);
    this.saveLocalStorage();

  }

  public async searchTag(tag: string): Promise<void> {

    if (tag.length < 1) return;

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', 10)

    this.organizeHistory(tag)
    this.http.get<SearchResponse>(`https://api.giphy.com/v1/gifs/search`, { params })
      .subscribe(resp => this.gifsList = resp.data);
  }



}
