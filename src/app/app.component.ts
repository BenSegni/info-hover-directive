import { Component, OnInit } from '@angular/core';
import { ToolTipConfig } from './_utils/_helpers/info-directive/tooltip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public toolTipOne: ToolTipConfig;
  public toolTipTwo: ToolTipConfig;
  public toolTipThree: ToolTipConfig;

  public ngOnInit(): void {
    this.assignToolTips();
  }

  private assignToolTips(): void {
    this.toolTipOne = {
      toolTipTitle: 'This List',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
      link: 'https://bensegni.github.io',
      linkText: 'Access Help',
    };

    this.toolTipTwo = {
      toolTipTitle: 'This Form',
      imageUrl: 'https://download.logo.wine/logo/BBC/BBC-Logo.wine.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      link: 'https://bbc.com',
      linkText: 'Visit BBC Website',
    };

    this.toolTipThree = {
      toolTipTitle: 'This Paragraph',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };
  }
}
