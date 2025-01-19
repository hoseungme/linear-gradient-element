import { RGB } from "./color";
import { interpolate, inverseInterpolate } from "./utils";

export class LinearGradient {
  public readonly angle: number;
  public readonly colorStops: [RGB, number][];

  constructor({ angle, colorStops }: { angle: number; colorStops: [RGB, number][] }) {
    this.angle = angle;
    this.colorStops = colorStops.toSorted((a, b) => a[1] - b[1]);
  }

  public interpolate(to: LinearGradient, progress: number) {
    return new LinearGradient({
      angle: interpolate(this.angle, to.angle, progress),
      colorStops: Array.from(
        new Set([...this.colorStops.map(([, point]) => point), ...to.colorStops.map(([, point]) => point)])
      ).map((point) => [this.color(point).interpolate(to.color(point), progress), point]),
    });
  }

  public color(point: number) {
    const nearestRightColorStopIndex = this.colorStops.findIndex((colorStop) => colorStop[1] >= point);
    if (nearestRightColorStopIndex < 0) {
      return this.colorStops[this.colorStops.length - 1][0];
    }

    const nearestRightColorStop = this.colorStops[nearestRightColorStopIndex];
    const nearestLeftColorStop = this.colorStops[nearestRightColorStopIndex - 1];
    if (nearestRightColorStop[1] === point || !nearestLeftColorStop) {
      return nearestRightColorStop[0];
    }

    return nearestLeftColorStop[0]
      .toOklab()
      .interpolate(
        nearestRightColorStop[0].toOklab(),
        inverseInterpolate(nearestLeftColorStop[1], nearestRightColorStop[1], point)
      )
      .toRGB();
  }

  public css() {
    const colorStops = this.colorStops
      .map((colorStop) => `${colorStop[0].css()} ${colorStop[1] * 100}%`)
      .flat()
      .join(",");
    return `linear-gradient(in oklab ${this.angle}deg,${colorStops})`;
  }
}
