import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {forkJoin} from 'rxjs';

const apiUrl = environment.api;

@Injectable({
  providedIn: 'root',
})
export class RestService {

  constructor(
    protected httpClient: HttpClient
  ) { }


  public handleError(error: HttpErrorResponse, url: string) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error(url, error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(url, `code: ${error.status}, body: ${error.error}`);
    }
    // Return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  
  getAllSongsList(): Observable<any> {
    return this.httpClient.get<any[]>(`${apiUrl}`+'albums')
      .pipe(
      catchError((err) => this.handleError(err, `${apiUrl}`+'albums'))
      );
  }

    
  getAllSongsFromAlbum(): Observable<any> {

    return forkJoin(
      this.httpClient.get<any[]>(`${apiUrl}`+'photos?albumId='+`1`),
      this.httpClient.get<any[]>(`${apiUrl}`+'photos?albumId='+`2`),
      this.httpClient.get<any[]>(`${apiUrl}`+'photos?albumId='+`3`)
      .pipe(
           catchError((err) => this.handleError(err, `${apiUrl}`+'albums'))
        ))
   
  }

   
  searchAlbums(userId): Observable<any> {

    return this.httpClient.get<any[]>(`${apiUrl}`+'photos?albumId='+`${userId}`)
      .pipe(
      catchError((err) => this.handleError(err,'`${apiUrl}`+photos?albumId='+`${userId}`))
      );
  }

}
