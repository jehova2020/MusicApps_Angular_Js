import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() items: any[] = [];
  farHeart = farHeart;
  fasHeart = fasHeart;
  favorites: any[] = [];
  message: string;
  error: boolean = false;

  constructor(private _spotifyService: SpotifyService,private toastr: ToastrService) { }

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites() {
    this.favorites = this._spotifyService.getFavorites();
  }

  isFavorite(id: String) {
    if (this.favorites != null && this.favorites != undefined) {
      let item = this.favorites.find((favorite) => favorite.id == id);
      if (item != undefined) {
        return fasHeart;
      }
    }
    return farHeart;
  }

  changeFavorite(song: any) {
    if (this.favorites != null && this.favorites != undefined) {
      let item = this.favorites.find((favorite) => favorite.id == song.id);
      if (item != undefined) {
        this.toastr.error('Success', 'Removed from Favorites!');
        return this.favorites = this._spotifyService.removeFavorites(song);
      }
    }
    this.toastr.success('Success', 'Added to Favorites!');
    return this.favorites = this._spotifyService.setFavorites(song);
  }
}
