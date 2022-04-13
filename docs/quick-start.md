# Quick Start

## Installation

In your current React app:

{% tabs %}
{% tab title="NPM" %}
```
npm install --save honorable
```
{% endtab %}

{% tab title="Yarn" %}
```
yarn honorable
```
{% endtab %}
{% endtabs %}

## Usage

In your main `App` file:

```jsx
import { ThemeProvider, CssBaseline } from 'honorable'

// Define a theme, see the theming section
const theme = {
  mode: 'light',
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your application lives here */}
    </ThemeProvider>
  )
}
```

{% hint style="info" %}
**Good to know:** Using ThemeProvider or CssBaseline is totally optional: most honorable components can work without it.
{% endhint %}

## Import and style components

Any valid HTML component can be imported, capitalised:

```jsx
import { Div, P, A, Button, Input } from 'honorable'
```

They can then be added CSS properties, directly to them

```jsx
<A
  marginLeft="2rem"
  textDecoration="underline"
  href="https://honorable.design"
/>
```

## Customize your theme

Give a look and feel to your application by editing your theme.

```jsx
const theme = {
  mode: 'light',
  colors: {
    primary: '#0070f3', 
  },
  // ...
}
```

For more info, see:

{% content-ref url="theming.md" %}
[theming.md](theming.md)
{% endcontent-ref %}

## Learn about the `xflex` and `mp` props

They compose the opinionated part of honorable, and are super useful to build application even faster.

`xflex` allow for super quick flexbox layouts.

`mp` props set margins and paddings.

```jsx
<Div 
  xflex="x5"  // All centered
  mt={1}      // margin-top: 1rem
  p={2}       // padding: 2rem
/>
```

For more info, see:

{% content-ref url="xflex-property.md" %}
[xflex-property.md](xflex-property.md)
{% endcontent-ref %}

{% content-ref url="mp-properties.md" %}
[mp-properties.md](mp-properties.md)
{% endcontent-ref %}