import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RestService } from 'src/app/services/rest.services';

@Component({
  selector: 'app-playlist-dialog',
  templateUrl: './playlist-dialog.component.html',
  styleUrls: ['./playlist-dialog.component.scss']
})
export class PlaylistDialogComponent implements OnInit {

  filteredArray: any;
  playlistItems = [];
  constructor(
    public dialogRef: MatDialogRef<PlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private restService: RestService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.restService.getAllSongsList().subscribe(data => {
      console.log("popup", data);
      let resArr = [];

      data.forEach(function(item){
        var i = resArr.findIndex(x => x.userId == item.userId);
        if(i <= -1){
          resArr.push({id: item.id, userId: item.userId});
        }
      });
      console.log(resArr);  
      this.filteredArray = resArr;    

    })

  }

  createPlayList() {
     console.log(this.data);
     this.restService.searchAlbums(this.data.albumId).subscribe(res => {
       console.log(res);
       var arr= [];
       let playlist = {"playlistname": this.data.playlistname, "creationDate": new Date()};
       let playlistFromStorage = JSON.parse(localStorage.getItem('playlist'))
       if(playlistFromStorage) {
          this.playlistItems.push(playlist, ...playlistFromStorage);
          playlistFromStorage.push(playlist);
          localStorage.setItem("playlist", JSON.stringify(playlistFromStorage));
          localStorage.setItem(this.data.playlistname, JSON.stringify(res));
       }
       else {
          arr.push(playlist);
          localStorage.setItem("playlist", JSON.stringify(arr));
          localStorage.setItem(this.data.playlistname, JSON.stringify(res));
       }

       this.dialogRef.close(this.data.playlistname);
     })
  }

}
