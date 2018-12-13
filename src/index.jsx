import * as React from "react";
import * as Scrivito from "scrivito";
import { autoLabel, callOrReturn } from "futil-js";
import STYLE from "./style.js";

export { createScrivitoPicksComponent as createComponent };

function createScrivitoPicksComponent(attributes) {
  const name = `ScrivitoPicks${++id}`;
  Scrivito.registerComponent(name, props => (
    <Picks attributes={attributes} {...props} />
  ));
  return name;
}

function Picks({ attributes, ...props }) {
  return (
    <>
      <style children={STYLE} />
      {Array.isArray(attributes) ? (
        <AttributesArray attributes={attributes} {...props} />
      ) : (
        <Attribute options={attribute} {...props} />
      )}
    </>
  );
}

function AttributesArray({ attributes, ...props }) {
  return attributes.map((a, i) => <Attribute key={i} options={a} {...props} />);
}

function Attribute({ options, ...props }) {
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
          options.values.map(properties => (
            <Item
              key={properties.value}
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
  ({ attribute, obj, options, properties, value, widget, ...props }) => {
    const page = obj;
    const content = page || widget;
    const currentValue = content.get(attribute);
    const isMulti = Array.isArray(currentValue);
    const isActive = isMulti
      ? currentValue.indexOf(value) !== -1
      : value === currentValue;
    const callbackArgs = { content, page, value, widget };
    const className = callOrReturn(
      properties.previewClassName || options.previewClassName || value,
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
    const toggleValue = isMulti
      ? isActive
        ? currentValue.filter(v => v !== value)
        : [...currentValue, value]
      : isActive
      ? null
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
          {isMulti && <div className="spcks-select" />}
        </div>
      </li>
    );
  }
);

function sentenceCase(text) {
  return autoLabel(text).replace(/ \w(?![A-Z])/g, t => t.toLowerCase());
}

let id = 0;
