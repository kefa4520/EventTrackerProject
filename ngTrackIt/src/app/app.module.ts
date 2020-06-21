import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CycleListComponent } from './components/cycle-list/cycle-list.component';
import { CycleService } from './services/cycle.service';
import { HttpClientModule } from '@angular/common/http';
import { FlowTypePipe } from './pipes/flow-type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CycleListComponent,
    FlowTypePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CycleService,
    FlowTypePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
