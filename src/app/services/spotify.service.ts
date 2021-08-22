import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private _http: HttpClient) { }

  private url: string = 'https://jsonplaceholder.typicode.com';

  getSongs() {
    return this._http
      .get(this.url + `/photos`)
      .pipe(map(data => data));
  }

  getAlbums() {
    return this._http
      .get(this.url + `/albums`)
      .pipe(map(data => data));
  }

  getAlbumById(id: string) {
    return this._http.get(this.url + `/albums/${id}`, {
    });
  }

  getAlbumSongs(id: string) {
    return this._http
      .get(this.url + `/albums/${id}/photos`, {
      })
      .pipe(map(data => data));
  }

  getFavorites() {
    return JSON.parse(localStorage.getItem("favorites"));
  }

  setFavorites(item: any) {
    let data = JSON.parse(localStorage.getItem("favorites"));
    if (data == undefined) {
      data = [];
    }
    data.push(item);
    localStorage.setItem("favorites", JSON.stringify(data));
    return data;
  }

  removeFavorites(item: any) {
    let data = JSON.parse(localStorage.getItem("favorites"));
    if (data == undefined) {
      data = [];
    }
    const pos = data.findIndex((favorite: { id: String; }) => favorite.id == item.id);
    data.splice(pos,1);
    localStorage.setItem("favorites", JSON.stringify(data));
    return data;
  }
}
