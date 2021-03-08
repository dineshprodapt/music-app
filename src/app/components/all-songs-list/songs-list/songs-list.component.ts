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
  constructor(private restService: RestService) {
    
  }

  ngOnInit(){
    this.restService.getAllSongsList().subscribe(res => {
      console.log(res);
      this.states = res;
      this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
    })
    
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.title.toLowerCase().indexOf(filterValue) === 0);
  }

  onSelect(state) {
    console.log(state);
    this.restService.searchAlbums(state.userId).subscribe(res=> {
      console.log(res);
      this.albumSongs = res;
    })
  }

}
