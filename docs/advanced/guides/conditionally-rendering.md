---
id: conditionally_rendering
title: Conditionally Rendering Components
---

Use [type guards](https://basarat.gitbooks.io/typescript/docs/types/typeGuard.html#user-defined-type-guards)!

```tsx
// Button props
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

// Anchor props
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

// Input/output options
type Overload = {
  (props: ButtonProps): JSX.Element;
  (props: AnchorProps): JSX.Element;
};

// Guard to check if href exists in props
const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps =>
  "href" in props;

// Component
const Button: Overload = (props: ButtonProps | AnchorProps) => {
  // anchor render
  if (hasHref(props)) return <a {...props} />;
  // button render
  return <button {...props} />;
};

// Usage
function App() {
  return (
    <>
      {/* 😎 All good */}
      <Button target="_blank" href="https://www.google.com">
        Test
      </Button>
      {/* 😭 Error, `disabled` doesnt exist on anchor element */}
      <Button disabled href="x">
        Test
      </Button>
    </>
  );
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoAekrgCEBXGGCAOzjBzAGcKYBPMEjqNmLAAqcucALyJiMAHQMmrABIAVALIAZAIJMowAEaMkXADwady0QFEANkhBIWMAHxwAZHADeFOHAAFkSYAPwAXHD0LAAmSJjALEgxANwUAL5p5BTUcLosaIHQ7JK8AkL5hdASENwycuiKlUVQVnoGxqYWbc3QDk4u7l6+-kEhEXBcMIYsAOZZmRQ5NACSLGCMlBCMG-C1MMCsPOT8gnAA8gBuSFD2ECgx9X7kAQAUHLVckTasNdwAlJEAFIAZQAGgp+s5XFk3h9uJFelA-lxAXBQRCoYMFlllnAAOL0FBQR7MOCFJBoADWcGAmDG8TgSAAHsAplJEiVPhQ0Ed4IEUFxVCF6u9JN8RL9JHAAD55AotFFo+EcqRIlEyNyjABEwXi2tpbBVuKoNAAwrhIElXDy+cIVCxIlcbncHqKVRKHRq5erJP9NSMXnBcigFcUiLEbqM6XBXgKhSExZ9-v6iDB6FA2OYUL4FHmVelg25YcGaCYHXAI3EoKM0xms+XRLn85JC5RixkTbkAKpcFCzJAUTDRDCHNi6MBgV7+54BOuZ2OjALmLVBgIBHyUABUcEAvBuAOD28vZ7HBZhAII8t5R0kv1+YfmwYMSBzBpNqAPpGeyhqkGvWYN9AiYBFqAAd3AhQzwgWZHAUXkQG1Vd12QuB1DMGBb2XSgHyQlDNx3XdAFo9uBbCgHAoAAGjgAADGI2RQL9kmouAYggMxXCZVkpjgVg4FDKooCZRxoXgK8bzXO8HxY+jGMef832ZRDMPXNCpmU8xsMlFhcKw3D-gWIA)
