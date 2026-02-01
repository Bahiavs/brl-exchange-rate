import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-button',
    imports: [MatButtonModule],
    template: `
        <button (click)="handleClick($event)" [disabled]="disabled()" matButton="filled">
            <ng-content />
        </button>
    `,
    host: {
        '[class.is-disabled]': 'disabled()',
        '[attr.aria-disabled]': 'disabled()',
    },
    styles: [`
        :host {
            display: block;
        }
        :host(.is-disabled) {
            pointer-events: none;
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
    readonly disabled = input<boolean>(false)
    readonly clicked = output<MouseEvent>({ alias: 'click' })

    protected handleClick(event: MouseEvent) {
        if (this.disabled()) {
            event.preventDefault()
            event.stopPropagation()
            return
        }
        this.clicked.emit(event)
    }
}