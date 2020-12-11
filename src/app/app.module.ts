import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayService } from './services/overlay.service';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout/layout.module';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import  localePt  from '@angular/common/locales/pt'; 
import { registerLocaleData} from '@angular/common';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
  BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    OverlayModule,
    LayoutModule
  ],
  providers: [OverlayService , 
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
