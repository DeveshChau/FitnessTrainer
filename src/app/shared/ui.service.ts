import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UIService {
    isLoaderChanged: Subject<boolean> = new Subject();

    constructor(private snackBar: MatSnackBar) { }
    showSnackBar(message: string, action: string, duration: number) {
        this.snackBar.open(message, null, {
            duration
        });
    }
}
