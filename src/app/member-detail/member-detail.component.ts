// import { Component, Input, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Member } from '../member';
// import 'rxjs/add/operator/switchMap';
import { MemberService } from '../member.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
})
export class MemberDetailComponent implements OnInit {
  // @Input() member: Member;
  member: Member;
  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMember();
  }

  getMember() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.memberService.getMember(id).then((member) => (this.member = member));
    // this.route.paramMap
    //   .switchMap((param: ParamMap) => {
    //     // console.log(param);
    //     this.memberService.getMember(+param.get('id'));
    //   })
    //   .subscribe((member) => this.member);
  }

  goBack() {
    this.location.back();
  }
}
