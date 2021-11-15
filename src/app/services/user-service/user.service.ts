import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../auth-service/authentication.service';

export interface UserData {
  items: User[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  findAll(page: number, size: number): Observable<UserData> {
    const params = new HttpParams().set('page', page).set('limit', size);

    return this.http.get<UserData>('/api/users', { params }).pipe(
      map((userData) => userData),
      catchError((err) => throwError(err))
    );
  }

  paginateByName(
    page: number,
    size: number,
    username: string
  ): Observable<UserData> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', size)
      .set('username', username);
    
    return this.http.get<UserData>('/api/users', { params }).pipe(
      map((userData) => userData),
      catchError((err) => throwError(err))
    )
  }
}
