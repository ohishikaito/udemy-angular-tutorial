import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MEMBERS } from './mock-members';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// import { InMemoryDataService } from './in-memory-data.service';

@Injectable({
  providedIn: 'root',
})
// 公式は書いてあったけどudemy君は書いてない
export class MemberService {
  constructor(private http: HttpClient) {}
  private membersUrl = 'api/MEMBERS'; // Web APIのURL
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }

  getMembers(): Observable<Member[]> {
    return this.http
      .get<Member[]>(this.membersUrl)
      .pipe(catchError(this.handleError<Member[]>('getMembers', [])));
  }

  getMember(id: number): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;
    return this.http
      .get<Member>(url)
      .pipe(catchError(this.handleError<Member>('getMembers')));
  }

  update(member: Member): Observable<Member> {
    return this.http
      .put<Member>(this.membersUrl, member, this.httpOptions)
      .pipe(catchError(this.handleError<Member>('update')));

    // headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    // return this.http.put(this.membersUrl, member, this.headers);
  }

  create(member: Member): Observable<Member> {
    return this.http
      .post<Member>(this.membersUrl, member, this.httpOptions)
      .pipe(catchError(this.handleError<Member>('create')));
  }

  delete(member: Member): Observable<Member> {
    const id = member.id;
    // const id = typeof member === 'number' ? member : member.id;
    // console.log(id);
    const url = `${this.membersUrl}/${id}`;
    return this.http
      .delete<Member>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Member>('delete')));
    // const url = `${this.membersUrl}/${member}`;
    // return this.http.delete<Member>(url);
  }

  search(term: string): Observable<Member[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http
      .get<Member[]>(`${this.membersUrl}/?name=${term}`)
      .pipe(catchError(this.handleError<Member[]>('search', [])));
  }
}
// getMembers(): Promise<Member[]> {
//   return Promise.resolve(MEMBERS);
// } // 昔のやつ

// getMembers(): Promise<Member[]> {
//   return this.http
//     .get(this.membersUrl)
//     .toPromise()
//     .then((response) => response.json().data as Member[])
//     .catch(this.handleError);
// } //移したらエラー出る。ネチャネチャだる

// getMember(id: number): Observable<Member> {
//   const url = `${this.membersUrl}/${id}`;
//   return this.getMembers().then((members) =>
//     members.find((member) => member.id === id)
//   );
// }

// export class MemberService {
//   getMembers(): Member[] {
//     return MEMBERS;
//   }
// }
