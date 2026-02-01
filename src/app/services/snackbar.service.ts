import { Inject, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Inject({ provideIn: 'root' })
export class SnackbarService {
	private readonly snackBar = inject(MatSnackBar)

	open(message: string) {
		this.snackBar.open(message)
	}

	dismiss() {
		this.snackBar.dismiss()
	}
}