import { Component, OnInit } from '@angular/core';
import { Member } from './member';
import { MemberService } from './member.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MemberService],
})
export class AppComponent implements OnInit {
  title = '社員名簿';
  members: Member[];
  selectedMember: Member;

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.getMembers();
  }

  onSelect(member: Member): void {
    this.selectedMember = member;
  }

  getMembers(): void {
    this.memberService.getMembers().then((members) => (this.members = members));
    console.log(this.members);
  }
}
