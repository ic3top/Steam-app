import { NgModule } from '@angular/core';
import { FriendsComponent } from './pages/friends/friends.component';
import { FriendsRoutingModule } from './friends-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserCardsComponent } from './components/user-cards/user-cards.component';
import { FriendRequestsComponent } from './components/friend-requests/friend-requests.component';
import { AccordionComponent } from './components/accordion/accordion.component';


@NgModule({
  declarations: [
    FriendsComponent,
    UserCardsComponent,
    FriendRequestsComponent,
    AccordionComponent,
  ],
  imports: [
    FriendsRoutingModule,
    SharedModule,
  ],
})
export class FriendsModule {}
