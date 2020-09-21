import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MEMBERS } from './mock-members';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// import { InMemoryDataService } from './in-memory-data.service';
// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root',
})
// 公式は書いてあったけどudemy君は書いてない
export class MemberService {
  constructor(private http: HttpClient) {}
  private membersUrl = 'api/MEMBERS'; // Web APIのURL
  getMembers(): Observable<Member[]> {
    // return of(MEMBERS);
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
