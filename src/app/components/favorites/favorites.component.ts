import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @Input() favorites: any[] = [];
  message: string;
  error: boolean = false;
  preloading: boolean = true;

  constructor(private _spotifyService: SpotifyService) {}

  ngOnInit() {
    this.getFavorites();
    this.preloading = false;
  }

  getFavorites() {
    this.favorites = this._spotifyService.getFavorites();
    this.preloading = false;
  }
}
