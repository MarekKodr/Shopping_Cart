import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-note-group',
  templateUrl: './add-note-group.component.html',
  styleUrls: ['./add-note-group.component.css']
})

export class AddNoteGroupComponent implements OnInit {

  private modalWindow: NgbModalRef;
  public grId: string;
  
  constructor(
    public groupService: GroupService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  open(content, id: string) {
    this.grId = id;
    this.modalWindow = this.modalService.open(content);
  }
  
  public addNote(note: string): void {
    this.groupService.addNote(note, this.grId);
    this.modalWindow.close();
  }
}
