import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './component/login/login.component';
import { ListsComponent } from './component/lists/lists.component';
import { GroupsComponent } from './component/groups/groups.component';
import { FriendsComponent } from './component/friends/friends.component';

export const routes: Routes = [
     //{ path: '', redirectTo: 'lists', pathMatch: 'full' },
     { path: 'login', component: LoginComponent },
     { path: 'lists', component: ListsComponent },
     { path: 'groups', component: GroupsComponent },
     { path: 'friends', component: FriendsComponent  },
    // { path: 'home', component: HomeComponent }
];

export const router: ModuleWithProviders = RouterModule.forRoot(routes);