import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllSongsListComponent } from './components/all-songs-list/all-songs-list.component';
import { SongsListComponent } from './components/all-songs-list/songs-list/songs-list.component';
import { PlaylistSongsComponent } from './components/all-songs-list/playlist-songs/playlist-songs.component';
import { AppCommonModule } from './common/common.module';
import { PlaylistDialogComponent } from './components/dialog/playlist-dialog/playlist-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AllSongsListComponent,
    SongsListComponent,
    PlaylistSongsComponent,
    PlaylistDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
