export interface DLightGlobalEventHandlers {
  /**
   * Fires when the user aborts the download.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/abort_event)
   */
  onAbort: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationcancel_event) */
  onAnimationCancel:
    | ((this: GlobalEventHandlers, ev: AnimationEvent) => any)
    | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationend_event) */
  onAnimationEnd:
    | ((this: GlobalEventHandlers, ev: AnimationEvent) => any)
    | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationiteration_event) */
  onAnimationIteration:
    | ((this: GlobalEventHandlers, ev: AnimationEvent) => any)
    | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationstart_event) */
  onAnimationStart:
    | ((this: GlobalEventHandlers, ev: AnimationEvent) => any)
    | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/auxclick_event) */
  onAuxClick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/beforeinput_event) */
  onBeforeInput: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null

  /**
   * Fires when the object loses the input focus.
   * @param ev The focus event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/blur_event)
   */
  onBlur: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/cancel_event) */
  onCancel: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Occurs when playback is possible, but would require further buffering.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplay_event)
   */
  onCanPlay: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/canplaythrough_event) */
  onCanPlayThrough: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Fires when the contents of the object or selection have changed.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event)
   */
  onChange: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Fires when the user clicks the left mouse button on the object
   * @param ev The mouse event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/click_event)
   */
  onClick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/close_event) */
  onClose: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Fires when the user clicks the right mouse button in the client area, opening the context menu.
   * @param ev The mouse event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/contextmenu_event)
   */
  onContextMenu: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/copy_event) */
  onCopy: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLTrackElement/cuechange_event) */
  onCueChange: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/cut_event) */
  onCut: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null

  /**
   * Fires when the user double-clicks the object.
   * @param ev The mouse event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/dblclick_event)
   */
  onDblClick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null

  /**
   * Fires on the source object continuously during a drag operation.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/drag_event)
   */
  onDrag: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null

  /**
   * Fires on the source object when the user releases the mouse at the close of a drag operation.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragend_event)
   */
  onDragEnd: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null

  /**
   * Fires on the target element when the user drags the object to a valid drop target.
   * @param ev The drag event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragenter_event)
   */
  onDragEnter: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null

  /**
   * Fires on the target object when the user moves the mouse out of a valid drop target during a drag operation.
   * @param ev The drag event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragleave_event)
   */
  onDragLeave: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null

  /**
   * Fires on the target element continuously while the user drags the object over a valid drop target.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragover_event)
   */
  onDragOver: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null

  /**
   * Fires on the source object when the user starts to drag a text selection or selected object.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/dragstart_event)
   */
  onDragStart: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/drop_event) */
  onDrop: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null

  /**
   * Occurs when the duration attribute is updated.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/durationchange_event)
   */
  onDurationChange: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Occurs when the media element is reset to its initial state.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/emptied_event)
   */
  onEmptied: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Occurs when the end of playback is reached.
   * @param ev The event
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ended_event)
   */
  onEnded: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Fires when an error occurs during object loading.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/error_event)
   */
  onError: OnErrorEventHandler

  /**
   * Fires when the object receives focus.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/focus_event)
   */
  onFocus: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/formdata_event) */
  onFormData: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/gotpointercapture_event) */
  onGotPointerCapture:
    | ((this: GlobalEventHandlers, ev: PointerEvent) => any)
    | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLElement/input_event) */
  onInput: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/invalid_event) */
  onInvalid: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Fires when the user presses a key.
   * @param ev The keyboard event
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keydown_event)
   */
  onKeyDown: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null

  /**
   * Fires when the user presses an alphanumeric key.
   * @param ev The event.
   * @deprecated
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keypress_event)
   */
  onKeyPress: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null

  /**
   * Fires when the user releases a key.
   * @param ev The keyboard event
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/keyup_event)
   */
  onKeyUp: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null

  /**
   * Fires immediately after the browser loads the object.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/SVGElement/load_event)
   */
  onLoad: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Occurs when media data is loaded at the current playback position.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadeddata_event)
   */
  onLoadedData: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Occurs when the duration and dimensions of the media have been determined.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadedmetadata_event)
   */
  onLoadedMetadata: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Occurs when Internet Explorer begins looking for media data.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/loadstart_event)
   */
  onLoadStart: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/lostpointercapture_event) */
  onLostPointerCapture:
    | ((this: GlobalEventHandlers, ev: PointerEvent) => any)
    | null

  /**
   * Fires when the user clicks the object with either mouse button.
   * @param ev The mouse event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mousedown_event)
   */
  onMouseDown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseenter_event) */
  onMouseEnter: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseleave_event) */
  onMouseLeave: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null

  /**
   * Fires when the user moves the mouse over the object.
   * @param ev The mouse event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mousemove_event)
   */
  onMouseMove: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null

  /**
   * Fires when the user moves the mouse pointer outside the boundaries of the object.
   * @param ev The mouse event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseout_event)
   */
  onMouseOut: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null

  /**
   * Fires when the user moves the mouse pointer into the object.
   * @param ev The mouse event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseover_event)
   */
  onMouseOver: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null

  /**
   * Fires when the user releases a mouse button while the mouse is over the object.
   * @param ev The mouse event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/mouseup_event)
   */
  onMouseUp: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/paste_event) */
  onPaste: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null

  /**
   * Occurs when playback is paused.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/pause_event)
   */
  onPause: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Occurs when the play method is requested.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/play_event)
   */
  onPlay: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Occurs when the audio or video has started playing.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/playing_event)
   */
  onPlaying: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointercancel_event) */
  onPointerCancel: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerdown_event) */
  onPointerDown: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerenter_event) */
  onPointerEnter: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerleave_event) */
  onPointerLeave: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointermove_event) */
  onPointerMove: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerout_event) */
  onPointerOut: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerover_event) */
  onPointerOver: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/pointerup_event) */
  onPointerUp: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null

  /**
   * Occurs to indicate progress while downloading media data.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/progress_event)
   */
  onProgress: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null

  /**
   * Occurs when the playback rate is increased or decreased.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/ratechange_event)
   */
  onRateChange: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Fires when the user resets a form.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/reset_event)
   */
  onReset: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement/resize_event) */
  onResize: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null

  /**
   * Fires when the user repositions the scroll box in the scroll bar on the object.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/scroll_event)
   */
  onScroll: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/scrollend_event) */
  onScrollEnd: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/securitypolicyviolation_event) */
  onSecurityPolicyViolation:
    | ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any)
    | null

  /**
   * Occurs when the seek operation ends.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeked_event)
   */
  onSeeked: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Occurs when the current playback position is moved.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/seeking_event)
   */
  onSeeking: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Fires when the current selection changes.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLInputElement/select_event)
   */
  onSelect: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Document/selectionchange_event) */
  onSelectionChange: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Node/selectstart_event) */
  onSelectStart: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLSlotElement/slotchange_event) */
  onSlotChange: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Occurs when the download has stopped.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/stalled_event)
   */
  onStalled: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLFormElement/submit_event) */
  onSubmit: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null

  /**
   * Occurs if the load operation has been intentionally halted.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/suspend_event)
   */
  onSuspend: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Occurs to indicate the current playback position.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/timeupdate_event)
   */
  onTimeUpdate: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLDetailsElement/toggle_event) */
  onToggle: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitioncancel_event) */
  onTransitionCancel:
    | ((this: GlobalEventHandlers, ev: TransitionEvent) => any)
    | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionend_event) */
  onTransitionEnd:
    | ((this: GlobalEventHandlers, ev: TransitionEvent) => any)
    | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionrun_event) */
  onTransitionRun:
    | ((this: GlobalEventHandlers, ev: TransitionEvent) => any)
    | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionstart_event) */
  onTransitionStart:
    | ((this: GlobalEventHandlers, ev: TransitionEvent) => any)
    | null

  /**
   * Occurs when the volume is changed, or playback is muted or unmuted.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/volumechange_event)
   */
  onVolumeChange: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * Occurs when playback stops because the next frame of a video resource is not available.
   * @param ev The event.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/HTMLMediaElement/waiting_event)
   */
  onWaiting: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * @deprecated This is a legacy alias of `onAnimationEnd`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationend_event)
   */
  onWebkitAnimationEnd: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * @deprecated This is a legacy alias of `onAnimationIteration`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationiteration_event)
   */
  onWebkitAnimationIteration:
    | ((this: GlobalEventHandlers, ev: Event) => any)
    | null

  /**
   * @deprecated This is a legacy alias of `onAnimationStart`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/animationstart_event)
   */
  onWebkitAnimationStart: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /**
   * @deprecated This is a legacy alias of `onTransitionEnd`.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/transitionend_event)
   */
  onWebkitTransitionEnd: ((this: GlobalEventHandlers, ev: Event) => any) | null

  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Element/wheel_event) */
  onWheel: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null
}
