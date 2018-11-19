import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatSnackBarModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatSnackBarModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatSnackBarModule
    ],
})

export class MatModule {}
