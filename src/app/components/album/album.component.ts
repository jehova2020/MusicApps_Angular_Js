import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  albumId: string;
  @Input() album: any = {};
  preloading: boolean = true;
  @Input() songs: any[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _spotifyService: SpotifyService
  ) {
    this._activatedRoute.params.subscribe(params => {
      this.albumId = params['id'];
    });
  }

  ngOnInit() {
    this.getAlbumById();
    this.getAlbumSongs();
  }

  getAlbumById() {
    this._spotifyService.getAlbumById(this.albumId).subscribe((data: any) => {
      this.album = data;
      console.log(data);
      this.preloading = false;

    });
  }

  getAlbumSongs() {
    this._spotifyService.getAlbumSongs(this.albumId).subscribe((data: any) => {
      this.songs = data;
      console.log(data);
      this.preloading = false;

    });
  }

}
