import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-button',
    imports: [MatButtonModule],
    template: `
        <button (click)="click.emit($event)" matButton="filled">
            <ng-content />
        </button>
    `,
    styles: [`
        :host {
            display: block;
        }
        button {
            width: 100%;
            font-family: Roboto;
            font-weight: 500;
            font-size: 1rem;
            line-height: 1.5rem;
            letter-spacing: 0%;
            text-align: center;
            vertical-align: middle;
            text-transform: uppercase;
            height: 48px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
    readonly click = output<MouseEvent>()
}