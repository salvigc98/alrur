import { AfterContentInit, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from "@angular/forms";
import { AngularEditorConfig } from "./config";
import { AngularEditorToolbarComponent } from "./angular-editor-toolbar.component";
import { AngularEditorService } from "./angular-editor.service";
export declare class AngularEditorComponent implements OnInit, ControlValueAccessor, AfterContentInit {
    private _renderer;
    private editorService;
    private _document;
    private onChange;
    private onTouched;
    placeholder: boolean;
    modeVisual: boolean;
    showPlaceholder: boolean;
    id: string;
    config: AngularEditorConfig;
    html: any;
    textArea: any;
    editorWrapper: any;
    editorToolbar: AngularEditorToolbarComponent;
    viewMode: EventEmitter<boolean>;
    /** emits `blur` event when focused out from the textarea */
    blur: EventEmitter<string>;
    /** emits `focus` event when focused in to the textarea */
    focus: EventEmitter<string>;
    constructor(_renderer: Renderer2, editorService: AngularEditorService, _document: any);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    /**
     * Executed command from editor header buttons
     * @param command string from triggerCommand
     */
    executeCommand(command: string): void;
    /**
     * focus event
     */
    onTextAreaFocus(): void;
    /**
     * blur event
     */
    onTextAreaBlur(event: FocusEvent): void;
    /**
     *  focus the text area when the editor is focussed
     */
    onEditorFocus(): void;
    /**
     * Executed from the contenteditable section while the input property changes
     * @param html html string from contenteditable
     */
    onContentChange(html: string): void;
    /**
     * Set the function to be called
     * when the control receives a change event.
     *
     * @param fn a function
     */
    registerOnChange(fn: any): void;
    /**
     * Set the function to be called
     * when the control receives a touch event.
     *
     * @param fn a function
     */
    registerOnTouched(fn: any): void;
    /**
     * Write a new value to the element.
     *
     * @param value value to be executed when there is a change in contenteditable
     */
    writeValue(value: any): void;
    /**
     * refresh view/HTML of the editor
     *
     * @param value html string from the editor
     */
    refreshView(value: string): void;
    /**
     * toggles placeholder based on input string
     *
     * @param value A HTML string from the editor
     */
    togglePlaceholder(value: boolean): void;
    /**
     * Implements disabled state for this element
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * toggles editor mode based on bToSource bool
     *
     * @param bToSource A boolean value from the editor
     */
    toggleEditorMode(bToSource: boolean): void;
    /**
     * toggles editor buttons when cursor moved or positioning
     *
     * Send a node array from the contentEditable of the editor
     */
    exec(): void;
}
