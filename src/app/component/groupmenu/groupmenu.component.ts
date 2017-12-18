import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-groupmenu',
  templateUrl: './groupmenu.component.html',
  styleUrls: ['./groupmenu.component.css']
})

export class GroupmenuComponent implements OnInit {

  public parid: string;
  
  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.parid = params['id'];
    });
  }
}
