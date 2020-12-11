import { MatSnackBar } from '@angular/material/snack-bar'

export class Utils {

    constructor(private snackBar: MatSnackBar){}

     showMessageError(msg: string): void {
        this.snackBar.open(msg, '', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['warning-snack'],
        })
    }

    showMessageSucess(msg: string): void {
        this.snackBar.open(msg, '', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snack-bar'],
        })
    }


}
