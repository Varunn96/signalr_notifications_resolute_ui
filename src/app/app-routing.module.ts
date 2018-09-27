import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { LandingPageComponent } from './user-login/landing-page/landing-page.component';
import { LoginPageComponent } from './user-login/login-page/login-page.component';
import { SignUpComponent } from './user-login/sign-up/sign-up.component';
import { DragDropUserComponent } from './user-login/drag-drop-user/drag-drop-user.component';
import { DragDropAgentComponent } from './user-login/drag-drop-agent/drag-drop-agent.component';

import { ConsoleUIComponent } from './console-ui/console-ui.component';
import { DashboardComponent } from './console-ui/dashboard/dashboard.component';
import { HomepageComponent } from './console-ui/homepage/homepage.component';
import { IndividualTicketComponent } from './console-ui/individual-ticket/individual-ticket.component';
import { NewTicketComponent } from './console-ui/new-ticket/new-ticket.component';
import { PageNotFoundComponent } from './console-ui/page-not-found/page-not-found.component';
import { TicketsComponent } from './console-ui/tickets/tickets.component';
import { GamificationComponent } from './console-ui/dashboard/gamification/gamification.component';
import { CSatScoreComponent } from './console-ui/dashboard/c-sat-score/c-sat-score.component';
import { TicketsPiechartComponent } from './console-ui/dashboard/tickets-piechart/tickets-piechart.component';
import { ResolutionTimeComponent } from './console-ui/dashboard/resolution-time/resolution-time.component';
import { RecentTicketsComponent } from './console-ui/recent-tickets/recent-tickets.component';

const routes: Routes = [
  { path: '', redirectTo: 'userlogin', pathMatch: 'full' },
  { path: 'userlogin',
    component: UserLoginComponent,
    children: [
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path : 'landing', component: LandingPageComponent },
      { path : 'signup', component: SignUpComponent },
      { path : 'login', component: LoginPageComponent },
      { path : 'addusers', component: DragDropUserComponent },
      { path : 'addagents', component: DragDropAgentComponent },
    ]
  },
  { path: 'console',
    component: ConsoleUIComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: RecentTicketsComponent },
      { path: 'counts', component: HomepageComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tickets/:index', component: TicketsComponent },
      { path: 'tickets/', redirectTo: 'tickets/all', pathMatch: 'full' },
      { path: 'tickets/view/:id', component: IndividualTicketComponent },
      { path: 'newticket', component: NewTicketComponent }
    ]},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  ConsoleUIComponent,
  DashboardComponent,
  HomepageComponent,
  IndividualTicketComponent,
  NewTicketComponent,
  PageNotFoundComponent,
  TicketsComponent,
  GamificationComponent,
  CSatScoreComponent,
  TicketsPiechartComponent,
  ResolutionTimeComponent,
  RecentTicketsComponent,

  UserLoginComponent,
  DragDropAgentComponent,
  DragDropUserComponent,
  LoginPageComponent,
  LandingPageComponent,
  SignUpComponent
];
