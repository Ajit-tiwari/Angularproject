import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterbuttonComponent } from './component/counterbutton/counterbutton.component';
import { CounterdisplayComponent } from './component/counterdisplay/counterdisplay.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './shared/store/counter.reducer';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './Material.Module';
import { CustomcounterComponent } from './component/customcounter/customcounter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { blogReducer } from './shared/store/Blog/Blog.reducer';
import { BlogComponent } from './component/blog/blog.component';
import { AppState } from './shared/store/Global/App.state';
import { AddblogComponent } from './component/addblog/addblog.component';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { BlogEffects } from './shared/store/Blog/Blog.effects';
import { MenuheaderComponent } from './component/menuheader/menuheader.component';
import { AppEffects } from './shared/store/Global/App.effects';
import { LoadingspinnerComponent } from './component/loadingspinner/loadingspinner.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CounterComponent } from './component/counter/counter.component';
import { Customserializer } from './shared/store/Router/CustomSerializer';

@NgModule({
  declarations: [
    AppComponent,
    CounterbuttonComponent,
    CounterdisplayComponent,
    CustomcounterComponent,
    BlogComponent,
    AddblogComponent,
    MenuheaderComponent,
    LoadingspinnerComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(AppState),
    FormsModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([BlogEffects,AppEffects]),
    HttpClientModule,
    StoreRouterConnectingModule.forRoot(
      {
        serializer: Customserializer
      }
    )
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
