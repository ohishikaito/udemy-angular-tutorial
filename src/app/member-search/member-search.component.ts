import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.scss'],
})
export class MemberSearchComponent implements OnInit {
  members$: Observable<Member[]>;
  private searchTerms = new Subject<string>();
  constructor(private memberService: MemberService) {}

  search(term: string): void {
    this.searchTerms.next(term); // 検索語をobservableストリームにpushする
    // console.log(term);
    // console.log(this.searchTerms);
    // console.log(this.members$);
    console.log(new Subject());
  }
  ngOnInit(): void {
    this.searchResult();
    // console.log('init');
  }

  searchResult(): void {
    this.members$ = this.searchTerms.pipe(
      // 各キーストロークの後、検索前に300ms待つ)
      debounceTime(300),
      // 直前の検索語と同じ場合は無視する
      distinctUntilChanged(),
      // 検索語が変わる度に、新しい検索observableにスイッチする
      switchMap((term: string) => this.memberService.search(term))
    );
  }
}
