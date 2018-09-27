import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AceEditorModule } from 'ng2-ace-editor';
import { DxPieChartModule } from 'devextreme-angular';
import { DxChartModule, DxSelectBoxModule } from 'devextreme-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoutingComponents } from './app-routing.module';
import { MaterialModule } from './material';
import { TicketsService } from './tickets.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopUpComponent } from './console-ui/pop-up/pop-up.component';
import { Ng2Webstorage } from 'ngx-webstorage';
import { RequestInterceptor } from './auth.interceptor';
import { SafePipe, IndividualTicketComponent } from './console-ui/individual-ticket/individual-ticket.component';
import { LandingPageComponent } from './user-login/landing-page/landing-page.component';
import { NotificationComponent } from './console-ui/notification/notification.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    PopUpComponent,
    SafePipe,
    IndividualTicketComponent,
    LandingPageComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    // ToastrModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatSidenavModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatDialogModule,
    DxPieChartModule,
    DxChartModule,
    DxSelectBoxModule,
    Ng2Webstorage,
    MatButtonModule,
    MatAutocompleteModule,
    AceEditorModule
  ],
  entryComponents: [
    PopUpComponent,
    NotificationComponent
  ],
  providers: [
    TicketsService,
    SafePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
