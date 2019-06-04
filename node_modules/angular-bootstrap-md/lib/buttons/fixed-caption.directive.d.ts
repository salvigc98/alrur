import { AfterViewInit, ElementRef, OnInit, Renderer2 } from '@angular/core';
export declare class FixedButtonCaptionDirective implements OnInit, AfterViewInit {
    private renderer;
    private el;
    caption: string;
    collapseButtonActivator: any;
    private paragraphEl;
    constructor(renderer: Renderer2, el: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    createCaptionElement(): void;
}
