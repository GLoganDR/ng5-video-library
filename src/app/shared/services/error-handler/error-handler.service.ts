import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

    constructor(private injector: Injector) {
    }

    handleError(error: Error | HttpErrorResponse) {

        const notificationsService = this.injector.get(NotificationsService);

        if (error instanceof HttpErrorResponse) {

            if (!navigator.onLine) {
                return notificationsService.notify('No Internet Connection', 'DISMISS');
            } else {
                return notificationsService.notify(`${error.status} - ${error.message}`, 'DISMISS');
            }
        }

        console.error('Error: ', error);
    }
}
