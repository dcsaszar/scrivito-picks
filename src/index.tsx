import * as React from "react";
import * as Scrivito from "scrivito";
import { isFunction, startCase } from "lodash-es";
import { STYLE } from "./style";

interface AttributeOptions {
  attribute: string;
  previewClassName?: CallbackOr<string>;
  previewStyle?: CallbackOr<React.CSSProperties>;
  previewText?: CallbackOr<JSX.Element>;
  renderPreview?: JSX.Element;
  thumbnail?: CallbackOr<string>;
  title?: string | false;
  values: ValueProperties[];
}

interface ValueProperties {
  previewClassName?: CallbackOr<string>;
  previewStyle?: CallbackOr<React.CSSProperties>;
  previewText?: CallbackOr<JSX.Element>;
  renderPreview?: JSX.Element;
  thumbnail?: CallbackOr<string>;
  title?: string;
  value: Value;
}

type CallbackOr<T> = T | Callback<T>;
type Callback<T> = (a: CallbackParameters) => T;

interface CallbackParameters {
  content?: Scrivito.Obj | Scrivito.Widget;
  page?: Scrivito.Obj;
  value: Value;
  widget?: Scrivito.Widget;
}

type Value = string | boolean | null;
type CurrentValue = string | string[] | boolean | null;

/**
 * Helper for registering a Scrivito Picks component as a Scrivito Extension.
 * @returns An auto-generated properties group component name
 * @see https://www.scrivito.com/js-sdk/provideEditingConfig#referencing-a-component-by-its-name
 */
export function createComponent(
  attributes: AttributeOptions | AttributeOptions[]
) {
  const name = `ScrivitoPicks${++id}`;
  Scrivito.registerComponent(name, component(attributes));
  return name;
}

/**
 * Get a Scrivito Picks component.
 * @returns A properties group component
 * @requires `propertiesGroups.key`
 * @requires Scrivito SDK 1.27.0
 * @see https://www.scrivito.com/js-sdk/provideEditingConfig#providing-the-component-directly
 */
export function component(attributes: AttributeOptions | AttributeOptions[]) {
  return (props) => <Picks attributes={attributes} {...props} />;
}

const Picks = Scrivito.connect(
  ({
    attributes,
    ...props
  }: {
    attributes: AttributeOptions | AttributeOptions[];
    obj?: Scrivito.Obj;
    widget?: Scrivito.Widget;
  }) => {
    const theme = Scrivito.uiContext ? Scrivito.uiContext()?.theme : "light";

    return !theme ? null : (
      <>
        <style>{STYLE[theme]}</style>
        {Array.isArray(attributes) ? (
          attributes.map((a, i) => <Attribute key={i} options={a} {...props} />)
        ) : (
          <Attribute options={attributes} {...props} />
        )}
      </>
    );
  }
);

function Attribute({ options, ...props }: { options: AttributeOptions }) {
  const attribute = options.attribute;
  return (
    <div className="spcks-section">
      {options.title !== false && (
        <div
          className="spcks-label"
          children={options.title || sentenceCase(attribute)}
        />
      )}
      <ul className="spcks-ul">
        {options.values &&
          options.values.map((properties) => (
            <Item
              key={String(properties.value)}
              value={properties.value}
              attribute={attribute}
              options={options}
              properties={properties}
              {...props}
            />
          ))}
      </ul>
    </div>
  );
}

const Item = Scrivito.connect(
  ({
    attribute,
    obj,
    options,
    properties,
    value,
    widget,
  }: {
    attribute: string;
    obj?: Scrivito.Obj;
    options: AttributeOptions;
    properties: ValueProperties;
    value: Value;
    widget?: Scrivito.Widget;
  }) => {
    const page = obj;
    const content = (page || widget)!;
    const currentValue = content.get(attribute) as CurrentValue;
    const isActive = Array.isArray(currentValue)
      ? currentValue.indexOf(value as string) !== -1
      : value === currentValue;
    const callbackArgs = { content, page, value, widget };
    const className = callOrReturn(
      properties.previewClassName || options.previewClassName || String(value),
      callbackArgs
    );
    const innerText = callOrReturn(
      properties.previewText || options.previewText,
      callbackArgs
    );
    const style = callOrReturn(
      properties.previewStyle || options.previewStyle,
      callbackArgs
    );
    const thumbnail = callOrReturn(
      properties.thumbnail || options.thumbnail,
      callbackArgs
    );
    const preview = callOrReturn(
      properties.renderPreview || options.renderPreview || (
        <div className={className} children={innerText} style={style} />
      ),
      callbackArgs
    );
    const liClassName = isActive ? "spcks-active" : undefined;
    const toggleValue = Array.isArray(currentValue)
      ? isActive
        ? (currentValue as string[]).filter((v) => v !== value)
        : [...currentValue, value as string]
      : isActive
      ? value === false || null
      : value;

    return (
      <li
        onClick={() => content.update({ [attribute]: toggleValue })}
        className={liClassName}
      >
        <div
          className="spcks-preview"
          style={
            thumbnail
              ? { backgroundImage: `url(${JSON.stringify(thumbnail)})` }
              : undefined
          }
        >
          {preview}
        </div>
        <div className="spcks-meta">
          <div className="spcks-name">
            {properties.title || sentenceCase(value)}
          </div>
          {Array.isArray(currentValue) && <div className="spcks-select" />}
        </div>
      </li>
    );
  }
);

function sentenceCase(text) {
  return startCase(text).replace(/ \w(?![A-Z])/g, (t) => t.toLowerCase());
}

function callOrReturn<T>(fnOrValue: Callback<T> | T, args: CallbackParameters) {
  return isFunction(fnOrValue)
    ? (fnOrValue as Callback<T>)(args)
    : (fnOrValue as T);
}

let id = 0;
