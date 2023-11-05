import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase Components
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';

//import {VoiceFxModule}  from './main/voice-fx/voice-fx.module';
import { RecordingModule } from './modules/recording/recording.module';
import { RnboModule } from './modules/rnbo/rnbo.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Core Components
    
    BrowserModule,
    BrowserAnimationsModule,
    // Firebase
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    RnboModule,
    //VoiceFxModule
    RecordingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }