import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  members: Member[];
  selectedMember: Member;

  constructor(private memberService: MemberService, private router: Router) {}

  ngOnInit(): void {
    this.getMembers();
  }

  onSelect(member: Member): void {
    this.selectedMember = member;
  }

  getMembers(): void {
    this.memberService.getMembers().then((members) => (this.members = members));
    // console.log(this.members);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedMember.id]);
  }
}
