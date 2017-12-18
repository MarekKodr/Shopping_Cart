import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-group-lists-menu',
  templateUrl: './group-lists-menu.component.html',
  styleUrls: ['./group-lists-menu.component.css']
})
export class GroupListsMenuComponent implements OnInit {

  public parid: string;
  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
  }
}
