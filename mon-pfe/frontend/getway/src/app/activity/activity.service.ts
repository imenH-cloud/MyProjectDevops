import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from './activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'http://localhost:3000/activities';

  constructor(private http: HttpClient) {}

  create(activity: Partial<Activity>): Observable<any> {
    return this.http.post<Activity>(this.apiUrl, activity);
  }

  getAll(page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<{ data: any[], total: number }>(this.apiUrl);
  }

  search(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search`, {
      params: new HttpParams().set('query', query)
    });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  update(id: number, activity: Partial<any>): Observable<any> {
    return this.http.patch<Activity>(`${this.apiUrl}/${id}`, activity);
  }

  markAsComplete(id: number): Observable<any> {
    return this.http.put<Activity>(`${this.apiUrl}/${id}/complete`, {});
  }

  delete(id: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
