import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';
import { Service } from '../../service/service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {

  public actFriend: FirebaseObjectObservable<any>;
  public user: FirebaseListObservable<any>;
  public users: any[];
  public idpar: string;
  public startWith = new Subject();
  public endWith = new Subject();

  constructor(
    private afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public actUser: Service,
    public activatedRoute: ActivatedRoute) {

    this.afAuth.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = db.list('users/' + auth.uid);
        }
      });
  }

  ngOnInit() {
    console.log('ngOnInit');
    // this.actUser.findCustomers(this.startWith, this.endWith)
    //   .subscribe(users => this.users = users);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.idpar = params['id'];
    });
  }

  public addMember(id: string, email: string, foto: string): void {
    // this.db.database().ref('/users/' + this.actUser.user.uid + '/friends').child(id).set({ email: email, foto: foto });
  }


  // public isFriend(id: string, email: string): void {

  //   console.log('USER: ', email);

  //   this.db.list('/users/' + this.actUser.user.uid + '/friends/' + id).subscribe(gr => {
  //     if (gr.length == 0) {
  //       console.log('this.friend == false');
  //       this.friend = false;
  //     } else {
  //       console.log('this.friend == true');
  //       this.friend = true;
  //     }
  //   });
  // }

  // public search($event: any): void {
  //   let queryText: string = $event.target.value;
  //   if (queryText.length > 0) {
  //     this.startWith.next(queryText)
  //     this.endWith.next(queryText + '\uf8ff')
  //   }
  //   else {
  //     this.users = [];
  //   }
  // }
}
