import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { MatModule } from './shared/modules/material/mat.module';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { VideoComponent } from './video/video.component';

import { TruncatePipe } from './shared/pipes/truncate/truncate.pipe';

import { ServerErrorsInterceptor } from './shared/interceptors/server-errors.interceptor';

import { ErrorHandlerService } from './shared/services/error-handler/error-handler.service';
import { NotificationsService } from './shared/services/notifications/notifications.service';
import { VideoService } from './video/services/video.service';

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        VideoComponent,

        TruncatePipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServerErrorsInterceptor,
            multi: true
        },
        {
            provide: ErrorHandler,
            useClass: ErrorHandlerService
        },
        NotificationsService,
        VideoService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
