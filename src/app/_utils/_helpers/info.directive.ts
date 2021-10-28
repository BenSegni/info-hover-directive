import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[info]',
})
export class InfoDirective implements AfterViewInit {
  @Input() info: string;
  private infoText: string;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  public ngAfterViewInit(): void {
    this.createIconElement();
  }

  @HostListener('mouseenter') onHover(): void {
    this.setInfoText(this.info);
  }

  @HostListener('mouseleave') onLeave(): void {
    this.resetInfoText();
  }

  private createIconElement(): void {
    this.renderer.addClass(this.el.nativeElement, 'info-icon-wrapper');

    const iconElement: HTMLElement = this.renderer.createElement('icon');

    iconElement.classList.add('info-icon');

    this.renderer.appendChild(this.el.nativeElement, iconElement);
  }

  private resetInfoText(): void {
    const infoBox: HTMLElement = this.el.nativeElement.querySelector('span');

    this.renderer.removeChild(this.el.nativeElement, infoBox);

    return;
  }

  private setInfoText(text: string): void {
    this.infoText = text;

    this.generateInfoBox(this.infoText);
  }

  private generateInfoBox(text: string): HTMLElement {
    const infoBox: HTMLElement = this.renderer.createElement('span');
    const infoText: string = this.renderer.createText(text);

    infoBox.classList.add('info-box');

    this.renderer.appendChild(infoBox, infoText);

    this.renderer.appendChild(this.el.nativeElement, infoBox);

    return infoBox;
  }
}
