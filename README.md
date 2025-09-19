# 🎨 string-to-color-gradient

A lightweight npm library to convert any string into consistent **hex colors** and **CSS gradients** — perfect for avatars, tags, themes, blog cards, and visual identifiers.

Turn names, emails, or any string into beautiful, deterministic color values that stay the same every time.

## ✨ Features

- 🔁 **Deterministic output** – same input always gives the same result
- 💡 **Color Brightness control** – choose from `light`, `normal`, or `dark` styles
- 🎨 **Hex colors** or full **CSS gradients**
- 🔒 **Hash-based uniqueness** using `MD5`, `SHA-1`, or `SHA-256`
- 📦 **Tiny footprint** – zero config, ready to use
- ⚡ **Fast and dependency-light** – built for performance

## 📦 Installation

```bash
npm install string-to-color-gradient
```

or with Yarn:

```bash
yarn add string-to-color-gradient
```

## 🚀 Quick Start

```ts
import {
  stringToColor,
  stringToGradient,
  stringToCssGradient,
} from 'string-to-color-gradient';

const color = stringToColor('hello world');
// => "#d87c3a"

const [start, end] = stringToGradient('hello world');
// => ["#d87c3a", "#4e92bf"]

const cssGradient = stringToCssGradient('hello world');
// => "linear-gradient(123deg, #d87c3a, #4e92bf)"
```

## ⚙️ Options

Customize the output using the optional `GradientOptions` object.

```ts
interface GradientOptions {
  brightness?: 'dark' | 'normal' | 'light'; // default: 'normal'
  angle?: 'auto' | number; // default: 'auto'
}
```

### 💡 Brightness

| Value    | Description          | Visual Style     |
| -------- | -------------------- | ---------------- |
| `light`  | Softer, pastel tones | 🌤️ Light & airy  |
| `normal` | Balanced default     | ☁️ Neutral tones |
| `dark`   | Rich and saturated   | 🌑 Deep contrast |

### 📐 Angle

- `'auto'` – angle is generated from the string hash (default)
- `number` – specify a custom angle in degrees (e.g., `45`, `120`)

---

## 🧩 API Reference

### `stringToColor(str: string, brightness?: Brightness): string`

🔹 Converts a string to a **single hex color**.

```ts
stringToColor('Hello World', 'light');
// => "#c4a2e1"
```

### `stringToGradient(str: string, options?: GradientOptions): [string, string]`

🔹 Returns a **tuple of two hex colors** to create gradients.

```ts
stringToGradient('Hello World', { brightness: 'dark' });
// => ["#7a2b7c", "#2c8d4d"]
```

---

### `stringToCssGradient(str: string, options?: GradientOptions): string`

🔹 Returns a complete **CSS `linear-gradient(...)` string**.

```ts
stringToCssGradient('Hello World', { angle: 45 });
// => "linear-gradient(45deg, #a1b2c3, #d4e5f6)"
```

## 🛠 Use Cases

Make your UI more vibrant, consistent, and automatic — no color picking required:

- 👤 **Avatar backgrounds** – assign users a unique, consistent color
- 🏷️ **Tag & label colors** – color-code categories, topics, or tags
- 💬 **Chat bubbles** – visually distinguish different senders
- 📊 **Data visualizations** – generate consistent palette from labels or IDs
- 🖼️ **Theming UI elements** – change styling based on user/project/content
- 🧾 **Color-coded identifiers** – visually distinguish IDs, usernames, emails
- 📰 **Blog post or card backgrounds** – create dynamic, unique color cards for each post
- 🗂️ **Kanban boards or dashboards** – assign colors to tasks or projects by title
- 🎟️ **Event/ticketing systems** – auto-assign color badges per attendee or ticket

## 🤝 Contributing

Contributions are welcome!
Feel free to open issues, suggest features, or submit pull requests.

## 📄 License

MIT License © [Prajwal Dhungana]
