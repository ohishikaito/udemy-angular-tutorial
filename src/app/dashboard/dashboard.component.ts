import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  members: Member[];
  constructor(private membersService: MemberService) {}

  ngOnInit(): void {
    this.membersService
      .getMembers()
      .then((members) => (this.members = members.slice(1, 5)));
  }
}
