import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'loader',
    imports: [MatProgressSpinnerModule],
    template: `
        <mat-spinner 
            style="margin-inline: auto;" 
            [diameter]="48"
        />
    `,
    styles: [`
        :host {
            display: block;
        }
        .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle, .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
            stroke: #07B0FB !important;
        }
    `],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loader { }