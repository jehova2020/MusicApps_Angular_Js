import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  @Input() items: any[] = [];
  preloading: boolean = true;
  message: string;
  error: boolean = false;

  constructor(private _router: Router, private _spotifyService: SpotifyService) { }

  viewDetails(albumId: string) {
    this._router.navigate(['/albums/' + albumId]);
  }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this._spotifyService.getAlbums().subscribe(
      (data: any) => {
        this.items = data;
        this.preloading = false;
      },
      error => {
        this.preloading = false;
        this.error = true;
        this.message = error.error.error.message;
        console.log(error.error.error.message);
      }
    );
  }
}
