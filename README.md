# expandable-textarea




> ReactJS component provides expandable textarea

[![NPM](https://img.shields.io/npm/v/expandable-textarea.svg)](https://www.npmjs.com/package/expandable-textarea) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Textarea will expand or shrink against its content. Also configurable to work as an Input field, limiting its total line numbers, formating and more options.

## Install

```bash
npm install --save expandable-textarea
```


## How to use
- [Expand and shrink](https://github.com/makannew/expandable-textarea/blob/master/README.md#expand-and-shrink)
- [Like Input](https://github.com/makannew/expandable-textarea/blob/master/README.md#fixed-size-like-input-field)
- [Bring to focus by clicking on icon](https://github.com/makannew/expandable-textarea/blob/master/README.md#bring-to-focus-by-clicking-on-icon)
- [Credit card number formating](https://github.com/makannew/expandable-textarea/blob/master/README.md#credit-card-number-formating)
- [Password format](https://github.com/makannew/expandable-textarea/blob/master/README.md#password-format)
- [Phone format](https://github.com/makannew/expandable-textarea/blob/master/README.md#phone-format)
- [Custom format](https://github.com/makannew/expandable-textarea/blob/master/README.md#custom-format)


## Props
- `beforeElement`\
  React element like an Icon or label. Click on them brings textarea to focus.
- `afterElement`
- `className`\
  To style wrapper `div` of the original `textarea` 
- `submitValue`\
  Is a function. Called when `onBlure` happens and textarea value changed from `initialValue`\
  Passed object = `{[name]: newValue, differFromInitial, name, unformatedValue, value}`
- `name`\
  Unique name will be key name in submiting object.\
  Must be set for submiting new values.
- `initialValue = ''`
- `totalLines`\
  Unlimited lenght if not specified.
- `minRows`\
  Sets minimum shrink like count
- `maxRows`\
  Sets maximum expand line count
- `rows`\
  Fixed line count if specified
- `formatFunction`\
  Can be set to built-in or custom formating functions
- `resizeDebouncingDelay = 300`
- `fitInField = false`\
  Works with one line input like fields. It limits lenght to textarea view.
- `...rest`\
Additional standard textarea attributes like: disabled, wrap,...


## Expand and shrink 

[Demo and Code](https://makannew.github.io/expandable-textarea/#/)
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
Note: If `totalLines` not specified lenght will be unlimited.

## Fixed size like input field 

[Demo and Code](https://makannew.github.io/expandable-textarea/#/input-like-field)
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
## Bring to focus by clicking on icon 

[Demo and Code](https://makannew.github.io/expandable-textarea/#/focus-by-icon)
```jsx
import AddressIcon from '../address-icon/address-icon'
```
```jsx
  <ExpandableTextarea
    beforeElement={<AddressIcon />}
    afterElement={<AddressIcon />}
  />
```

## Credit card number formating 

[Demo and Code](https://makannew.github.io/expandable-textarea/#/credit-card-format)
```jsx
import { maskFormating } from 'expandable-textarea'
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
- `maskString`\
  is string contains `replaceChar` and any other character excep `validChar`.\
  _(Default = `'!!!!-!!!!-!!!!-!!!!'`)_
  
- `replaceChar`\
  is single character that means user can type here\
  _(Default = `'!'`)_
- `validChar`\
  is regEx means which character allowed, must not contain any character of `maskString` or `replaceChar`\
  _(Default = `/\d/g` means 0 to 9)_
- `preVisibleMask`\
  means always show the format even it is empty. \
  _(Default = `true`)_
- `rightToLeft` If `true` means masking starts from right. \
  _(Default = `false`)_

## Password format

[Demo and Code](https://makannew.github.io/expandable-textarea/#/password-format)
```jsx
import { passwordFormating } from 'expandable-textarea'
```
```jsx
const passwordFormat = passwordFormating(/[^-]/, '-')
```
First argument is allowd characters which here `/[^-]/` means everything except `-` masking character.\
Second argument is password masking character. (Default = `'*'`)
```jsx
  <ExpandableTextarea
    formatFunction={passwordFormat}
  />
```

## Phone format

[Demo and Code](https://makannew.github.io/expandable-textarea/#/phone-format)
```jsx
import { maskFormating } from 'expandable-textarea'
```
```jsx
  const phoneFormat = maskFormating({
    maskString: '(!!) !!!! !!!!',
    replaceChar: '!',
    validChar: /d/g,
    preVisibleMask: false,
    rightToLeft: false
  })
```
```jsx
  <ExpandableTextarea
    formatFunction={phoneFormat}
  />
```

## Custom format

It wraps any number inside parentheses. Just to show how it works.
[Demo and Code](https://makannew.github.io/expandable-textarea/#/custom-format)
```jsx
import { maskFormating } from 'expandable-textarea'
```
```jsx
  const customFormat = (changeData) => {
    const { newValue, valid } = changeData
    if (!valid) return { ...changeData }
    const newUnformatedValue = (newValue.match(/d/g) || ['']).join('')
    const maskString = '(' + ''.padEnd(newUnformatedValue.length, '!') + ')'
    const newChangeData = maskFormating({
      maskString,
      validChar: /d/g
    })(changeData)
    return { ...newChangeData, unformatedValue: newUnformatedValue }
  }
```
```jsx
      <ExpandableTextarea
        formatFunction={customFormat}
      />
```
`changeData` is an object prepared by `ExpandableTextarea` contains usefull information for applying formating logic.
```jsx
    {
      iniValue,
      iniLineCount,
      iniSelectionStart,
      iniSelectionEnd,
      iniScrollTop,
      iniScrollLeft,
      pressedKey,
      newValue,
      newLineCount,
      excessIsShrinking,
      increasing,
      newSelectionStart,
      newSelectionEnd,
      newScrollTop,
      newScrollLeft,
      unformatedValue,
      valid
    }
```
- `valid===true` means `newValue` is a valid change from `ExpandableTextarea` point of view.
- `unformatedValue` must set to the unformated value after formating logic.
- `newValue` must set to the formated value after formating logic 

## License

MIT © [makannew](https://github.com/makannew)
