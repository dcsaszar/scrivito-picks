## Scrivito Picks

A visual style picker for Scrivito `boolean`, `enum`, and `multienum` attributes.

![](/screenshots.png)

### Installation

```sh
npm install scrivito-picks
```

### Usage

`ScrivitoPicks.createComponent` registers an editor component and returns a component name. Use this for Scrivito SDK < 1.27.0:

```jsx
// HeadlineWidgetEditingConfig.js
import * as Scrivito from "scrivito";
import * as ScrivitoPicks from "scrivito-picks";

// Add a "My custom style" style picker tab to the headline widget:
Scrivito.provideEditingConfig("HeadlineWidget", {
  title: "Headline",
  propertiesGroups: [
    {
      title: "My custom style",
      component: ScrivitoPicks.createComponent([
        /* my custom attributes */
      ]),
    },
  ],
});
```

With Scrivito SDK ≥ 1.27.0, `ScrivitoPicks.component` can be used as an alternative. It returns a component. The properties group `key` must be set:

```jsx
import * as Scrivito from "scrivito";
import * as ScrivitoPicks from "scrivito-picks";

Scrivito.provideEditingConfig("HeadlineWidget", {
  propertiesGroups: [
    {
      title: "My custom style",
      key: "my-custom-style",
      component: ScrivitoPicks.component([
        /* ... */
      ]),
    },
  ],
});
```

#### Arguments

Both `createComponent` and `component` take a single argument.

`attributes` - An array of attribute options `[{attribute: 'myEnum', values: ... }, ...]`. For a single attribute, a plain attribute options object can be passed instead of a one-element array.

#### Attribute options

An object describing how an attribute is presented.

| Option             | Description                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `attribute`        | The attribute name.                                                                                  |
| `values`           | An array describing the available items and their representation. See value properties.              |
| `title`            | The attribute title. If `false`, no title will be shown. Default: the sentence cased attribute name. |
| `previewClassName` | A callback returning the `className` of a value preview element.                                     |
| `previewStyle`     | A callback returning the `style` of a value preview element.                                         |
| `previewText`      | A callback returning the inner text (or component) of a value preview element.                       |
| `renderPreview`    | A render callback for a value preview. If set, `preview*` options are ignored.                       |
| `thumbnail`        | A callback returning the URL of the thumbnail image for a value.                                     |

If an option has a static value, you can use a string (or an object for the `previewStyle` property) instead of a callback.

#### Value properties

An object that describes an attribute value. Individual attribute options can be overridden per value.

| Property           | Description                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| `value`            | The attribute value.                                                      |
| `title`            | The attribute title shown to the user. Default: the sentence cased value. |
| `previewClassName` | Override the `previewClassName` for this value.                           |
| `previewStyle`     | Override the `previewStyle` for this value.                               |
| `previewText`      | Override the `previewText` for this value.                                |
| `renderPreview`    | Override the `renderPreview` callback for this value.                     |
| `thumbnail`        | Override the `thumbnail` for this value.                                  |

#### Callback parameters

Many options can be configured as a callback. The callback receives an object with the following parameters:

| Parameter | Description                                                                             |
| --------- | --------------------------------------------------------------------------------------- |
| `value`   | The attribute value of the item.                                                        |
| `page`    | The `Scrivito.Obj` containing the edited attribute. `undefined` when editing a widget.  |
| `widget`  | The `Scrivito.Widget` containing the edited attribute. `undefined` when editing a page. |
| `content` | Convenience parameter for `(page \|\| widget)`.                                         |

### Examples

#### A single attribute

```jsx
// Create a picker for the `alignment` enum attribute.
// There are three options, each option is represented by a Font Awesome icon.
component: ScrivitoPicks.createComponent({
  attribute: 'alignment',
  values: [
    { value: 'left', previewClassName: 'fa fa-4x fa-align-left' },
    { value: 'center', previewClassName: 'fa fa-4x fa-align-center' },
    { value: 'right', previewClassName: 'fa fa-4x fa-align-right' },
  ],
}),
```

```jsx
// Same as the first example, but with custom options titles.
// The Font Awesome icon is computed by a callback.
component: ScrivitoPicks.createComponent({
  attribute: "alignment",
  previewClassName: ({ value }) => `fa fa-4x fa-align-${value}`,
  title: "Horizontal alignment",
  values: [
    { value: "left", title: "Left aligned" },
    { value: "center", title: "Centered" },
    { value: "right", title: "Right aligned" },
  ],
});
```

```jsx
// Render custom preview components:
component: ScrivitoPicks.createComponent({
  attribute: "alignment",
  values: [{ value: "left" }, { value: "center" }, { value: "right" }],
  renderPreview: ({ value }) => <i className={`fa fa-4x fa-align-${value}`} />,
});
```

#### Multiple attributes

```jsx
// Create a picker for two attributes, `alignment` and `style`:
component: ScrivitoPicks.createComponent([
  {
    attribute: "alignment",
    values: [
      { value: "left", previewClassName: "fa fa-4x fa-align-left" },
      { value: "center", previewClassName: "fa fa-4x fa-align-center" },
      { value: "right", previewClassName: "fa fa-4x fa-align-right" },
    ],
  },
  {
    attribute: "style",
    title: "Heading style",
    values: [
      {
        value: "h1",
        title: "Level 1 heading",
        previewClassName: "fa fa-4x fa-h1",
      },
      {
        value: "h2",
        title: "Level 2 heading",
        previewClassName: "fa fa-3x fa-h2",
      },
      {
        value: "h3",
        title: "Level 3 heading",
        previewClassName: "fa fa-2x fa-h3",
      },
    ],
  },
]);
```
