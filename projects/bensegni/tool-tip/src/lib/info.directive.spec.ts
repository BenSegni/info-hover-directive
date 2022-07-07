import { ElementRef, Renderer2, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoDirective } from './info.directive';
import { TestComponent } from './_testing/test-component';

describe('InfoDirective', () => {
  let el: ElementRef;
  let rend: Renderer2;
  let directive: InfoDirective;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      providers: [Renderer2],
    });
    directive = new InfoDirective(el, rend);
    fixture = TestBed.createComponent(TestComponent);
    directive['renderer'] = fixture.componentRef.injector.get<Renderer2>(
      Renderer2 as Type<Renderer2>
    );
    directive['el'] = fixture.componentRef.injector.get<ElementRef>(
      ElementRef as Type<ElementRef>
    );
  });

  describe('Testing ngAfterViewInit()', () => {
    beforeEach(() => {
      directive.tooltip = {
        toolTipTitle: 'Test',
        text: 'test text',
      };
    });
    it('should create a tool tip element', () => {
      const spyCreate = spyOn<any>(
        directive,
        'createIconElement'
      ).and.callThrough();
      directive.ngAfterViewInit();
      expect(spyCreate).toHaveBeenCalled();
    });
  });

  describe('Testing generateInfoBox()', () => {
    beforeEach(() => {
      directive.tooltip = {
        toolTipTitle: 'Test',
        text: 'test text',
        imageUrl: 'testurl',
        link: 'link',
        linkText: 'link text',
      };
    });

    it('should create an HTML Element', () => {
      directive['generateInfoBox']('text');
      expect(directive['generateInfoBox']).toBeTruthy();
    });
  });

  describe('Testing resetInfoText()', () => {
    it('should call removeChild()', () => {
      const spyRemove = spyOn<any>(directive['renderer'], 'removeChild');
      directive['resetInfoText']();
      expect(spyRemove).toHaveBeenCalled();
    });
  });
});
