<div align="center">
  <h1>linear-gradient-element</h1>
  <p>Set linear-gradient CSS background of your element, with transition animation, interpolation</p>
  <video src="https://github.com/user-attachments/assets/4370b37d-32c0-4b12-8889-50f3633f9660">
</div>

## Install

```
$ npm install linear-gradient-element
```

## Usage

Simple usage in React:

```tsx
import { LinearGradientElement, LinearGradient, RGB } from "linear-gradient-element";
```

```tsx
const from = new LinearGradient({
  angle: 270,
  colorStops: [
    [new RGB([0, 219, 222], 1), 0],
    [new RGB([252, 0, 255], 1), 1],
  ],
});

const to = new LinearGradient({
  angle: 43,
  colorStops: [
    [new RGB([65, 88, 208], 1), 0],
    [new RGB([200, 80, 192], 1), 0.46],
    [new RGB([255, 204, 112], 1), 1],
  ],
});
```

### Transition

```tsx
function Transition() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    const element = new LinearGradientElement(target, from);
    element.transition(to, { duration: 2000 });
  }, []);

  return <div style={{ width: 500, height: 300, background: from.css() }} ref={ref} />;
}
```

https://github.com/user-attachments/assets/d4321306-2601-429a-9986-f9ba5664aa2f

### Transition With Easing

```tsx
function easeInOutQuart(x: number): number {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

function TransitionWithEasing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    const element = new LinearGradientElement(target, from);
    element.transition(to, { duration: 2000, easing: easeInOutQuart });
  }, []);

  return <div style={{ width: 500, height: 300, background: from.css() }} ref={ref} />;
}
```

https://github.com/user-attachments/assets/46afb840-6abc-4efc-858f-c6845973db18

### Interpolation

```tsx
function Interpolation() {
  const ref = useRef<HTMLDivElement>(null);
  const [element, setElement] = useState<LinearGradientElement | null>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) {
      return;
    }

    setElement(new LinearGradientElement(target, from));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => element?.interpolation(from, to, 0)}>0%</button>
        <button onClick={() => element?.interpolation(from, to, 0.25)}>25%</button>
        <button onClick={() => element?.interpolation(from, to, 0.5)}>50%</button>
        <button onClick={() => element?.interpolation(from, to, 0.75)}>75%</button>
        <button onClick={() => element?.interpolation(from, to, 1)}>100%</button>
      </div>
      <div style={{ width: 500, height: 300, background: from.css() }} ref={ref} />
    </div>
  );
}
```

https://github.com/user-attachments/assets/0862f614-d72f-4cff-9fef-6db108d686cf
