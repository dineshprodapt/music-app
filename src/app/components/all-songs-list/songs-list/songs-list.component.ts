import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RestService } from 'src/app/services/rest.services';

export interface State {
  userId: string;
  id: string;
  title: string;
}

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})

export class SongsListComponent implements OnInit {

  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  states: State[];
  albumSongs = [];
  albumFiltered = [];
  constructor(private restService: RestService) {
    
  }

  ngOnInit(){

    this.restService.getAllSongsFromAlbum().subscribe(([res1, res2, res3]) => {
      this.albumSongs.push(...res1, ...res2, ...res3);
      this.albumFiltered = this.albumSongs;
    })
    
    this.restService.getAllSongsList().subscribe(res => {
      this.states = res;
    })
    
  }

  onSearchFilter(event) {
    this.albumFiltered = this.albumSongs.filter(item => item.title.toLowerCase().indexOf(event.target.value) === 0)
  }

  onSelect(state) {
    this.restService.searchAlbums(state.userId).subscribe(res=> {
      this.albumSongs = res;
    })
  }

}
