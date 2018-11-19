import { TestBed, inject } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
    let service: NotificationsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NotificationsService],
            imports: [MatSnackBarModule,
                BrowserAnimationsModule
            ]
        });

        service = TestBed.get(NotificationsService);
    });

    afterEach(() => {
        service = null;
    });

    it('should be created', inject([NotificationsService], () => {
        expect(service).toBeTruthy();
    }));

    it('should open an error by calling the notify function with 2 params', () => {
        spyOn(service, 'notify');
        service.notify('There was an error', 'DISMISS');

        expect(service.notify).toHaveBeenCalled();
        expect(service.notify).toHaveBeenCalledWith('There was an error', 'DISMISS');
    });

    it('should still open an error by calling the notify function with 1 param', () => {
        spyOn(service, 'notify');
        service.notify('There was an error', '');

        expect(service.notify).toHaveBeenCalled();
        expect(service.notify).toHaveBeenCalledWith('There was an error', '');
    });
});
