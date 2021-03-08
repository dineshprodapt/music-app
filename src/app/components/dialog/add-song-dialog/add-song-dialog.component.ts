import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from 'src/app/services/rest.services';

@Component({
  selector: 'app-add-song-dialog',
  templateUrl: './add-song-dialog.component.html',
  styleUrls: ['./add-song-dialog.component.scss']
})
export class AddSongDialogComponent implements OnInit {

  playListSongs = [];
  message: string = "Song Added Successfully!"
  constructor(
    public dialogRef: MatDialogRef<AddSongDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restService: RestService,
    private snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    //For testing 
    this.restService.searchAlbums(9).subscribe(res => {
      this.playListSongs = res;
    })
  }

  addToPlaylist(list) {
    let playlist = JSON.parse(localStorage.getItem(this.data.currentPlayList));
    playlist.unshift(list);
    localStorage.setItem(this.data.currentPlayList, JSON.stringify(playlist));
    this.snackBar.open(this.message, 'Ok', {
      duration: 2000,
    });
    this.dialogRef.close();

  }

}
