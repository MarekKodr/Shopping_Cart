import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Service } from '../../service/service';
import { User } from '../../model/user';

@Component({
  selector: 'app-friend-menu',
  templateUrl: './friend-menu.component.html',
  styleUrls: ['./friend-menu.component.css']
})
export class FriendMenuComponent implements OnInit {
  public users: FirebaseListObservable<any[]>;
  public flag: string = '';

  constructor(
    public db?: AngularFireDatabase,
    public actUser?: Service) { }

  ngOnInit() {
  }

  public showFriends(): void {
    this.users = this.db.list('/users/' + this.actUser.user.uid + '/friends');
    this.flag = "showFriends";
  }

  public showSendReq(): void {
    this.flag = 'showSendReq';
    this.users = this.db.list('/users/' + this.actUser.user.uid + '/sendRequest');

  }

  public showMyReq(): void {
    this.users = this.db.list('/users/' + this.actUser.user.uid + '/request');
    this.flag = "showMyReq";
  }


  public delFriend(id: string): void {
    this.db.object('users/' + this.actUser.user.uid + '/friends/' + id).remove();
    this.db.object('users/' + id + '/friends/' + this.actUser.user.uid).remove();
  }

  public delRequest(id: string): void {
    this.db.object('users/' + this.actUser.user.uid + '/sendRequest/' + id).remove();
    this.db.object('users/' + id + '/request/' + this.actUser.user.uid).remove();
  }

  public acceptRequest(id: string, email: string, foto: string): void {
    let user: FirebaseObjectObservable<User>;
    user = this.db.object('users/' + id + '/request/' + this.actUser.user.uid);


    this.db.object('users/' + id + '/friends/' + this.actUser.user.uid).set({ email: this.actUser.user.email, foto: this.actUser.user.foto });
    this.db.object('users/' + this.actUser.user.uid + '/friends/' + id).set({ email: email, foto: foto });

    this.db.object('users/' + this.actUser.user.uid + '/sendRequest/' + id).remove();
    this.db.object('users/' + id + '/request/' + this.actUser.user.uid).remove();

    this.db.object('users/' + id + '/sendRequest/' + this.actUser.user.uid).remove();
    this.db.object('users/' + this.actUser.user.uid + '/request/' + id).remove();
  }

}
