import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class Snackbar {
	private readonly snackBar = inject(MatSnackBar)

	open(message: string, actionLabel: string = 'Dismiss') {
		const ref = this.snackBar.open(message, actionLabel)
		ref.onAction().subscribe(() => ref.dismiss())
	}

	dismiss() {
		this.snackBar.dismiss()
	}
}