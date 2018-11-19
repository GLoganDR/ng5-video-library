import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class NotificationsService {

    constructor(private snackBar: MatSnackBar,
                private zone: NgZone) {}

    notify(message: string, action: string) {

        const config = new MatSnackBarConfig();

        config.verticalPosition =  'bottom';
        config.horizontalPosition = 'center';
        config.duration = 100000;
        config.panelClass = 'snackbar-warn';

        this.zone.run(() => this.snackBar.open(message, action, config));
    }
}
