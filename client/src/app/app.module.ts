import { HttpClientModule }    from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { VotacaoService } from './services/votacao/votacao.service'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { VotingComponent } from './components/voting/voting.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ResultDisplayComponent } from './components/result-display/result-display.component';
import { VotesDisplayComponent } from './components/votes-display/votes-display.component';

@NgModule({
  declarations: [
    AppComponent,
    VotingComponent,
    FooterComponent,
    ResultDisplayComponent,
    HeaderComponent,
    VotesDisplayComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [VotacaoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
