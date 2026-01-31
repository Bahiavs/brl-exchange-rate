import { Component, ViewEncapsulation, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-input',
    imports: [MatInputModule, ReactiveFormsModule],
    template: `
        <mat-form-field>
            <mat-label>{{label()}}</mat-label>
            <input matInput [formControl]="formCtrl()">
        </mat-form-field>
    `,
    styles: [`
        .mat-mdc-form-field-subscript-wrapper, .mat-mdc-form-field-bottom-align::before {
            height: 0;
        }
    `],
    encapsulation: ViewEncapsulation.None,
})
export class Input {
    readonly formCtrl = input.required<FormControl<string | null>>()
    readonly label = input<string>('')
}