import { Injectable } from '@angular/core';

import { Member } from './member';
import { MEMBERS } from './mock-members';

// @Injectable({
//   providedIn: 'root',
// })
// 公式は書いてあったけどudemy君は書いてない
export class MemberService {
  getMembers(): Promise<Member[]> {
    return Promise.resolve(MEMBERS);
  }
}
// export class MemberService {
//   getMembers(): Member[] {
//     return MEMBERS;
//   }
// }
