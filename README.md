## Scrivito Picks

A visual style picker for Scrivito `enum` and `multienum` attributes.

![](/screenshots.png)
### Installation

```sh
npm install scrivito-picks
```

### Usage

```jsx
// HeadlineWidgetEditingConfig.js
import * as Scrivito from 'scrivito';
import * as ScrivitoPicks from 'scrivito-picks';

// Add a "My Custom Style" style picker tab to the headline widget:
Scrivito.provideEditingConfig('HeadlineWidget', {
  title: 'Headline',
  propertiesGroups: [
    {
      title: 'My Custom Style',
      component: ScrivitoPicks.createComponent([ /* attributes */ ]),
    },
  ],
});
```

* `ScrivitoPicks.createComponent` creates the editor component.
* The return value of `createComponent` is a value suitable for the `Scrivito.provideEditingConfig` call.
* Pass this value to `Scrivito.provideEditingConfig`, as a `component` in `propertiesGroups`.

### Parameters for createComponent

`attributes` - Attribute options `[{attribute: 'myEnum', values: ... }, ...]`. Can be a plain object for a single attribute. See options.

### Options

Option | Description
--- | ---
`attribute` | The attribute name.
`values` | An array describing the available items and their representation. See values properties.
`title` | The attribute title. If `false`, no title will be shown. Default: the sentence cased attribute name.
`previewClassName` | A callback returning the `className` of a value preview element.
`previewStyle` | A callback returning the `style` of a value preview element.
`previewText` | A callback returning the inner text (or component) of a value preview element.
`renderPreview` | A render callback for a value preview. If set, `preview*` options are ignored.
`thumbnail` | A callback returning the URL of the thumbnail image for a value.

For callbacks, see callback parameters.

#### Values properties

Property | Description
--- | ---
`value` | The attribute value.
`title` | The attribute title shown to the user. Default: the sentence cased value.
`previewClassName` | Override the `previewClassName` for this value.
`previewStyle` | Override the `previewStyle` for this value.
`previewText` | Override the `previewText` for this value.
`renderPreview` | Override the `renderPreview` callback for this value.
`thumbnail` | Override the `thumbnail` for this value.

#### Callback parameters

Parameter | Description
--- | ---
`value` | The attribute value of the item.
`page` | The `Scrivito.Obj` containing the edited attribute. `undefined` when editing a widget.
`widget` | The `Scrivito.Widget` containing the edited attribute. `undefined` when editing a page.
`content` | Convenience parameter for `(page \|\| widget)`.

Instead of a callback, you can also pass a string (or an object for the `previewStyle` property).

### Examples

#### Options for a single attribute
```jsx
// Create a picker for the `alignment` attribute.
// We offer three available values.
// Each value is represented by a Font Awesome icon.
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
// Configure custom titles, and a callback that saves us from having to specify icons individually:
component: ScrivitoPicks.createComponent({
  attribute: 'alignment',
  previewClassName: ({value}) => `fa fa-4x fa-align-${value}`,
  title: 'Horizontal alignment',
  values: [
    { value: 'left', title: 'Left aligned' },
    { value: 'center', title: 'Centered' },
    { value: 'right', title: 'Right aligned' },
  ],
})
```

```jsx
// Render custom previews, using JSX:
component: ScrivitoPicks.createComponent({
  attribute: 'alignment',
  values: [
    { value: 'left' },
    { value: 'center' },
    { value: 'right' },
  ],
  renderPreview: ({value}) => <i className={`fa fa-4x fa-align-${value}`} />,
})
```

#### Options for multiple attributes

```jsx
// Create a picker for two attributes, alignment and heading style:
component: ScrivitoPicks.createComponent([
  {
    attribute: 'alignment',
    values: [
      { value: 'left', previewClassName: 'fa fa-4x fa-align-left' },
      { value: 'center', previewClassName: 'fa fa-4x fa-align-center' },
      { value: 'right', previewClassName: 'fa fa-4x fa-align-right' },
    ],
  },
  {
    attribute: 'style',
    title: 'Heading style',
    values: [
      { value: 'h1', title: 'Level 1 heading', previewClassName: 'fa fa-4x fa-h1' },
      { value: 'h2', title: 'Level 2 heading', previewClassName: 'fa fa-3x fa-h2' },
      { value: 'h3', title: 'Level 3 heading', previewClassName: 'fa fa-2x fa-h3' },
    ],
  },
])
```
