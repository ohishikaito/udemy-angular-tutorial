import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Member } from '../member';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss'],
})
export class MemberDetailComponent implements OnInit {
  constructor() {}
  @Input() member: Member;
  ngOnInit(): void {}
}
