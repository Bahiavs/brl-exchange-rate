import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';
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
        :host {
            display: block;
        }
        mat-form-field {
            --mat-form-field-filled-container-color: #F4F4F4;
            --mat-form-field-filled-active-indicator-color: #D9D9D9;
            width: 100%;
        }
        mat-form-field .mat-mdc-form-field-subscript-wrapper, .mat-mdc-form-field-bottom-align::before {
            height: 0;
        }
    `],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Input {
    readonly formCtrl = input.required<FormControl<string | null>>()
    readonly label = input<string>('')
}