import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddSongDialogComponent } from '../../dialog/add-song-dialog/add-song-dialog.component';
import { PlaylistDialogComponent } from '../../dialog/playlist-dialog/playlist-dialog.component';

@Component({
  selector: 'app-playlist-songs',
  templateUrl: './playlist-songs.component.html',
  styleUrls: ['./playlist-songs.component.scss']
})
export class PlaylistSongsComponent implements OnInit {

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { }
  playListData = [];
  playListSongs = [];
  currentPlayList: string;
  showPlayList: boolean = false;
  message: string = "Song Deleted Successfully!"

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
      this.currentPlayList = list.playlistname;
      this.playListSongs = JSON.parse(localStorage.getItem(list.playlistname));
  }

  deleteSong(song) {
    console.log("Delete song", song, this.playListSongs);
    this.playListSongs = this.playListSongs.filter(item => item.id != song.id);
    localStorage.setItem(this.currentPlayList, JSON.stringify(this.playListSongs));
    this.snackBar.open(this.message, 'Ok', {
      duration: 2000,
    });
  }

  backToPlaylist() {
    this.showPlayList = false;
  }

  shuffleSongs() {
    var shuffle = (array) => array.sort(() => Math.random() - 0.5);
    shuffle(this.playListSongs);
  }

  addSong(): void{
      const dialogRef = this.dialog.open(AddSongDialogComponent, {
        width: '650px',
        data: {}
  
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
  }
}
