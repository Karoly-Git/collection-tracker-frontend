# React + TypeScript Event Types

## Common event types you'll use a lot

| Element | Event Type |
|--------|------------|
| `input onChange` | `React.ChangeEvent<HTMLInputElement>` |
| `textarea onChange` | `React.ChangeEvent<HTMLTextAreaElement>` |
| `button onClick` | `React.MouseEvent<HTMLButtonElement>` |
| `form onSubmit` | `React.FormEvent<HTMLFormElement>` |

---

# Implementation Examples

## Input `onChange`

Use when handling text inputs.

```tsx
import { useState } from "react";

export default function Example() {
    const [value, setValue] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
    };

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
        />
    );
}
```

---

## Textarea `onChange`

```tsx
import { useState } from "react";

export default function Example() {
    const [text, setText] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setText(e.target.value);
    };

    return (
        <textarea
            value={text}
            onChange={handleChange}
        />
    );
}
```

---

## Button `onClick`

```tsx
export default function Example() {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        console.log("Button clicked");
    };

    return (
        <button onClick={handleClick}>
            Click me
        </button>
    );
}
```

---

## Form `onSubmit`

```tsx
import { useState } from "react";

export default function Example() {
    const [value, setValue] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log("Submitted value:", value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(e.target.value)
                }
            />

            <button type="submit">
                Submit
            </button>
        </form>
    );
}
```

---

# Quick Tip

If you're unsure about the event type in React + TypeScript:

1. Write the handler inline.
2. Hover the event in your editor.
3. TypeScript will show the correct type.

Example:

```tsx
<input onChange={(e) => console.log(e)} />
```

Hover `e` in VSCode to see the correct type.