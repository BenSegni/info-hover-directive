import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { ToolTipConfig } from '../info-directive/tooltip';

@Directive({
  selector: '[tooltip]',
})
export class InfoDirective implements AfterViewInit {
  @Input() tooltip: ToolTipConfig;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  public ngAfterViewInit(): void {
    this.createIconElement();
  }

  @HostListener('mouseenter') onHover(): void {
    this.generateInfoBox(this.tooltip.text);
  }

  @HostListener('mouseleave') onLeave(): void {
    setTimeout(() => {
      this.resetInfoText();
    }, 700);
  }

  /**
   * creates an icon graphic
   * @returns an icon graphic
   */
  private createIconElement(): void {
    if (!this.tooltip) return;

    this.renderer.addClass(this.el.nativeElement, 'info-icon-wrapper');

    const iconElement: HTMLElement = this.renderer.createElement('icon');

    iconElement.classList.add('info-icon');

    this.renderer.appendChild(this.el.nativeElement, iconElement);
  }

  /**
   * resetInfoText()
   * resets the tooltip when user closes or hovers off
   */

  private resetInfoText(): void {
    const infoBox: HTMLElement = this.el.nativeElement.querySelector('span');

    this.renderer.removeChild(this.el.nativeElement, infoBox);

    return;
  }

  /**
   * generateInfoBox()
   * @param text - string to pass into the tooltip box
   * @returns tool tip element which appears on hover
   */

  private generateInfoBox(text: string): HTMLElement {
    //create span for tool tip box and set styling
    const infoBox: HTMLElement = this.renderer.createElement('span');
    const infoText: string = this.renderer.createText(text);
    infoBox.classList.add('info-box');

    //set title for tool tip box
    const titleElement: HTMLElement = this.renderer.createElement('h4');
    const title: string = this.renderer.createText(
      `Tool Tip: ${this.tooltip.toolTipTitle}`
    );

    this.renderer.appendChild(titleElement, title);

    this.renderer.appendChild(infoBox, titleElement);

    //create supporting imagery
    if (this.tooltip.imageUrl) {
      const image: HTMLElement = this.renderer.createElement('img');
      image.setAttribute('src', this.tooltip.imageUrl);

      this.renderer.appendChild(infoBox, image);
    }

    this.renderer.appendChild(infoBox, infoText);

    //create hyperlink for tooltip more info
    const link: HTMLElement = this.renderer.createElement('a');

    if (this.tooltip.link && this.tooltip.linkText) {
      link.setAttribute('href', this.tooltip.link);
      link.setAttribute('target', '_blank');
      link.classList.add('tool-tip-link');
    }

    if (this.tooltip.link && this.tooltip.linkText) {
      const linkText: string = this.renderer.createText(this.tooltip.linkText);

      this.renderer.appendChild(link, linkText);
    }

    //create a help link title for the link to display after
    if (this.tooltip.link && this.tooltip.linkText) {
      const helpTextTitle: HTMLElement = this.renderer.createElement('p');
      helpTextTitle.classList.add('help-title');
      const helpText: string = this.renderer.createText('Help Link: ');
      this.renderer.appendChild(helpTextTitle, helpText);

      this.renderer.appendChild(helpTextTitle, link);

      this.renderer.appendChild(infoBox, helpTextTitle);
    }

    //create a breakpoint if there is no link added to tooltip
    if (
      (!this.tooltip.link && !this.tooltip.linkText) ||
      (this.tooltip.link && !this.tooltip.linkText) ||
      (!this.tooltip.link && this.tooltip.linkText)
    ) {
      const breakPoint: HTMLElement = this.renderer.createElement('span');
      breakPoint.classList.add('breakpoint');

      this.renderer.appendChild(infoBox, breakPoint);
    }

    //create button for closing tooltip
    const button: HTMLElement = this.renderer.createElement('button');
    const buttonText: string = this.renderer.createText('Close');
    this.renderer.appendChild(button, buttonText);

    button.setAttribute('click', 'closeTooltip()');

    this.renderer.appendChild(infoBox, button);

    this.renderer.appendChild(this.el.nativeElement, infoBox);

    infoBox.addEventListener('click', (event) => {
      if (!event) return;
      this.resetInfoText();
    });

    return infoBox;
  }
}
