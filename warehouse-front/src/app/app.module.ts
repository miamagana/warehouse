import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './core/containers/app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [BrowserModule, CoreModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
