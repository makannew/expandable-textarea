# expandable-textarea




> ReactJS component provides expandable textarea

[![NPM](https://img.shields.io/npm/v/expandable-textarea.svg)](https://www.npmjs.com/package/expandable-textarea) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Provided textarea will expand or shrink against its content. Also configurable to work as an Input field, limit its total line numbers and more options.

## Install

```bash
npm install --save expandable-textarea
```
## Table of content
- [Concept](https://github.com/makannew/Composer/blob/master/README.md#concept)


## Simple expand and shrink example [Demo and Code](https://makannew.github.io/expandable-textarea/#/)
```jsx
import ExpandableTextarea from 'expandable-textarea'
```
```jsx
  <ExpandableTextarea
    ref={textareaRef}
    placeholder='Type here'
    initialValue={serverState}
    submitValue={handleSubmit}
    totalLines={5}
    name='expandShrink'
    minRows={1}
    maxRows={5}
  />
```
If `totalLines` not specified content lenght will be unlimited.

- Fixed size like input field [Demo and Code](https://makannew.github.io/expandable-textarea/#/input-like-field)
```jsx
  <ExpandableTextarea
    className={'fixed-height'}
    rows={1}
    totalLines={1}
  />
```
```css
.fixed-height > textarea {
  height: 2rem;
}
```
- Bring to focus by clicking on icon [Demo and Code](https://makannew.github.io/expandable-textarea/#/focus-by-icon)
```jsx
import AddressIcon from '../address-icon/address-icon'
```
```jsx
  <ExpandableTextarea
    beforeElement={<AddressIcon />}
    afterElement={<AddressIcon />}
  />
```

- Credit card number formating [Demo and Code](https://makannew.github.io/expandable-textarea/#/credit-card-format)
```jsx
import ExpandableTextarea, { maskFormating } from 'expandable-textarea'
```
```jsx
 const creditCardFormat = maskFormating({
    maskString: '!!!!-!!!!-!!!!-!!!!',
    replaceChar: '!',
    validChar: /d/g,
    preVisibleMask: true,
    rightToLeft: false
  })
```
```jsx
      <ExpandableTextarea
        formatFunction={creditCardFormat}
      />
```

## License

MIT © [makannew](https://github.com/makannew)
