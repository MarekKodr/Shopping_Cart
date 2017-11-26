import { ListService } from './service/list.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AUTH_PROVIDERS } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { router } from './app.router';
import { firebaseConfig } from '../environments/firebase.config';
import { CapitalizePipe } from './pipe/capitalize.pipe';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SliderComponent } from './component/slider/slider.component';
import { Service } from './service/service';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { ListsComponent } from './component/lists/lists.component';
import { CardComponent } from './component/card/card.component';
import { GroupsComponent } from './component/groups/groups.component';
import { FriendsComponent } from './component/friends/friends.component';
import { AddlistComponent } from './component/addlist/addlist.component';
import { ListComponent } from './component/list/list.component';
import { ListmenuComponent } from './component/listmenu/listmenu.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { SearchFriendComponent } from './component/search-friend/search-friend.component';
import { AddgroupComponent } from './component/addgroup/addgroup.component';
import { GroupComponent } from './component/group/group.component';
import { GroupmenuComponent } from './component/groupmenu/groupmenu.component';


import { AddItemComponent } from './component/add-item/add-item.component';
import { GroupListsComponent } from './component/group-lists/group-lists.component';
import { GroupListsMenuComponent } from './component/group-lists-menu/group-lists-menu.component';
import { AddListToGroupComponent } from './component/add-list-to-group/add-list-to-group.component';
import { SearchInGroupComponent } from './component/search-in-group/search-in-group.component';
import { GroupEditMenuComponent } from './component/group-edit-menu/group-edit-menu.component';
import { BroadcastService } from './service/broadcast.service';
import { GroupService } from './service/group.service';
import { SearchGroupComponent } from './component/search-group/search-group.component';
import { MyListComponent } from './component/my-list/my-list.component';
import { SearchListComponent } from './component/search-list/search-list.component';
import { AddNoteGroupComponent } from './component/add-note-group/add-note-group.component';
import { GroupHeaderComponent } from './component/group-header/group-header.component';
import { AddMemberComponent } from './component/add-member/add-member.component';
import { SearchUserComponent } from './component/search-user/search-user.component';
import { SearchItemMyListComponent } from './component/search-item-my-list/search-item-my-list.component';
import { ItemService } from './service/item.service';
import { SearchItemComponent } from './component/search-item/search-item.component';
import { MyListMenuComponent } from './component/my-list-menu/my-list-menu.component';
import { AddFriendComponent } from './component/add-friend/add-friend.component';
import { FriendMenuComponent } from './component/friend-menu/friend-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SliderComponent,
    WelcomeComponent,
    FooterComponent,
    NavbarComponent,
    ListsComponent,
    CardComponent,
    GroupsComponent,
    FriendsComponent,
    AddlistComponent,
    ListComponent,
    ListmenuComponent,
    AddItemComponent,
    CapitalizePipe,
    RegistrationComponent,
    SearchFriendComponent,
    AddgroupComponent,
    GroupComponent,
    GroupmenuComponent,
    AddItemComponent,
    GroupListsComponent,
    GroupListsMenuComponent,
    AddListToGroupComponent,
    SearchInGroupComponent,
    GroupEditMenuComponent,
    SearchGroupComponent,
    MyListComponent,
    SearchListComponent,
    AddNoteGroupComponent,
    GroupHeaderComponent,
    AddMemberComponent,
    SearchUserComponent,
    SearchItemMyListComponent,
    SearchItemComponent,
    MyListMenuComponent,
    AddFriendComponent,
    FriendMenuComponent
  ],
  imports: [
    router,
    BrowserModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [Service, BroadcastService, ListService, GroupService, ItemService],
  bootstrap: [AppComponent]
})

export class AppModule { }
