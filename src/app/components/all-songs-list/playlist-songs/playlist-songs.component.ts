import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistDialogComponent } from '../../dialog/playlist-dialog/playlist-dialog.component';

@Component({
  selector: 'app-playlist-songs',
  templateUrl: './playlist-songs.component.html',
  styleUrls: ['./playlist-songs.component.scss']
})
export class PlaylistSongsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  playListData = [];
  playListSongs = [];
  showPlayList: boolean = false;

  ngOnInit(): void {
    this.playListData =  JSON.parse(localStorage.getItem('playlist'));

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PlaylistDialogComponent, {
      width: '450px',
      data: {}

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.playListData = JSON.parse(localStorage.getItem(result.playlistname));
    });
  }

  onSelectPlaylist(list) {
    console.log(list)
      this.showPlayList = true;
      this.playListSongs = JSON.parse(localStorage.getItem(list.playlistname));
  }
}
