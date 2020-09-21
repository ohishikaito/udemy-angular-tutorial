import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Member } from '../member';
// import 'rxjs/add/operator/switchMap';
import { MemberService } from '../member.service';
import { Observable } from 'rxjs';
// import { memory } from 'console';
//
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
})
export class MemberDetailComponent implements OnInit {
  @Input() member: Member;
  members: Member[];
  // member: Member; //@Input()がないと読み込めないらしい。
  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMembers();
    this.getMember();
  }

  getMembers(): void {
    this.memberService
      .getMembers()
      .subscribe((members) => (this.members = members));
  }

  getMember() {
    const id = +this.route.snapshot.paramMap.get('id');
    // console.log(+this.route.snapshot.paramMap.get('id'));
    this.memberService
      .getMember(id)
      .subscribe((member) => (this.member = member));
  }

  goBack() {
    this.location.back();
  }

  saveMember() {
    this.memberService.update(this.member).subscribe(() => this.goBack());
  }

  deleteMember() {
    // this.members = this.members.filter((h) => h !== member);
    // this.members = this.members.fil;
    this.memberService.delete(this.member).subscribe(() => this.goBack());
  }
}
