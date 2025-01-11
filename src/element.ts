import { LinearGradient } from "./linearGradient";
import { clamp } from "./utils";

interface TransitionFrameContext {
  prevTimestamp?: number;
  from: LinearGradient;
  to: LinearGradient;
  duration: number;
  easing?: (x: number) => number;
  progress: number;
}

type TransitionOptions = Pick<TransitionFrameContext, "duration" | "easing">;

export class LinearGradientElement {
  private readonly element: HTMLElement;
  private current: LinearGradient;
  private frameId: number | null = null;

  constructor(target: HTMLElement, background: LinearGradient) {
    this.element = target;
    this.current = background;
    this.set(background);
  }

  public set(to: LinearGradient) {
    this.cancelFrame();
    this.current = to;
    this.element.style.background = to.css();
  }

  public interpolation(from: LinearGradient, to: LinearGradient, progress: number) {
    this.cancelFrame();
    this.set(from.interpolate(to, progress));
  }

  public transition(to: LinearGradient, options: TransitionOptions) {
    this.cancelFrame();
    this.requestFrame({
      from: this.current,
      to,
      duration: options.duration,
      easing: options.easing,
      progress: 0,
    });
  }

  private requestFrame(context: TransitionFrameContext) {
    this.frameId = requestAnimationFrame((timestamp) => {
      context.progress = clamp(
        context.progress + (context.prevTimestamp ? timestamp - context.prevTimestamp : 0) / context.duration,
        0,
        1
      );

      this.current = context.from.interpolate(context.to, context.easing?.(context.progress) ?? context.progress);
      this.element.style.background = this.current.css();

      if (context.progress < 1) {
        context.prevTimestamp = timestamp;
        this.requestFrame(context);
      }
    });
  }

  private cancelFrame() {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
    }
  }
}
