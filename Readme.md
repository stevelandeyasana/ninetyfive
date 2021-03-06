# ninetyfive: React.js components for a faithful Windows 95 aesthetic

GitHub issues are disabled, but pull requests are enthusiastically accepted. :-)

[Live demo](http://steveasleep.com/ninetyfive/)

[Cooler live demo](http://steveasleep.com/keplverse/) - browse imaginary star systems using your "telescope software"

[![Screenshot of ninetyfive in action](/screenshot.png?raw=true "Screenshot of ninetyfive in action")](http://steveasleep.com/ninetyfive/)



# Usage

`npm install` / `yarn add` the `ninetyfive` package.

Then you can do this:

```js
import { StaticWindow } from 'ninetyfive';

ReactDOM.render(
  <StaticWindow title="Hello World">Window contents</StaticWindow>,
  document.getElementById('root'));
```

# Help wanted

Low hanging fruit that you can help fix:

* Lots of inconsistencies between which components take class names and styles
* Many missing controls
* Potential mismatches between React component names and original names

Scroll to the end of this document for contributor guidelines.

# References for contributors

* [In-browser Windows 95 emulator](https://win95.ajf.me/win95.html)
* [The Windows Interface Guidelines](https://www.ics.uci.edu/~kobsa/courses/ICS104/course-notes/Microsoft_WindowsGuidelines.pdf)

# API

## Containers

### Desktop

Simple plain blue background with default desktop color

**props**
  - `children`: `React.Node`

**DOM**

```
div.W95__Desktop
  {children}
```

### StaticWindow

Fixed-position element (doesn't scroll with page!) with title bar, window decoration, and contents.

`titleExtra` exists so you can pass `title` as a simple string if you don't need extra window decorations.

**props**
  - `title`: `string`
  - `titleExtra`: `React.Node` (Probably one or more `<TinyButton />` elements; need keys!)
  - `margin`: `Number|null` (Margin between outside of window and its container)
  - `style`: `Object|null` (CSS styles for outermost div)
  - `windowStyle`: `Object|null` (CSS styles for innermost div)
  - `children`: `React.Node`

**DOM**

```
div.W95__Window.m-static style={style}
  div.W95__WindowBG
  div.W95__WindowTitle
    {title}
    {titleExtra}
  div.W95__WindowContents style={windowStyle || {}}
    {children}
```

### MovableWindow

Draggable window element. You must provide size via the `style` prop. Built-in close button.

Use `windowStyle` to set size. The window is initially centered by flexbox, so you don't need to necessarily make it a constant size.

**props**
  - `title`: `string`
  - `canClose`: `bool` (If true, show close button)
  - `isOpen`: `bool` (If false, don't render)
  - `onClose`: `function(): void` (Called when X button clicked)
  - `windowStyle`: `Object|null` (CSS styles for window div)
  - `children`: `React.Node`

**DOM**

```
div.W95__MovableWindowContainer
  div.W95__MovableWindowContainer__Centerer  // transform applied here
    div.W95__Window m-movable style={windowStyle}>
      div.W95__WindowBG
      div.W95__WindowTitle
        {title}
        TinyButton
      div.W95__WindowContents
        {children}
```

## Visual groupings

### Group

Draws a thin line around its content and adds a title in the upper left.

**props**
  - `title`: `string`
  - `className`: `string`
  - `children`: `React.Node`

**DOM**

```
div.W95__Group.{className || ''}
  div.W95__Group__BG
  div.W95__Group__Title
    {title}
  div.W95__Group__Contents
    {children}
```

### ScrollingText

White box with `overflow: auto`. There is probably a more accurate name for this component.

You need to set a height yourself or use `className="m-fill-container"`.

**props**
  - `style`: `Object|null`
  - `className`: `string|null`
  - `children`: `React.Node`

**DOM**

```
div.W95__ScrollingText.{className || ''} style={style}
  div.W95__ControlBG
  div.W95__ScrollingText__Content
    {children}
```

### Tabs

Tabs define multiple logical sections of information within the same group. One tab is selected at a time; the others are hidden.

Tabs are composed from two components: `Tabs` for the parent wrapping group and `Tab` for each selectable section of child content.

**`Tabs` props**
  - `selected`: `string|null` (The label of the child tab to select)
  - `className`: `string|null`
  - `children`: `ninetyfive.Tab`

**`Tab` props**
  - `label`: `string` (The clickable label identifying the tab)
  - `className`: `string|null`
  - `children`: `React.Node`

**DOM**

```
div.W95__Tabs.{className || ''}
  ul.W95__Tabs__Labels
    li.W95__Tabs__Label
      button.W95__Tabs__Button
  div.W95__Tabs__Content
    div.W95__Tab.{className || ''}
      {children}
```

## Controls

Unimplemented:
* Radio buttons
* Dropdown
* Stepper
* Date picker
* Menu bar

### Button

Simple shorthand for `<button>` with some inner chrome

**props** are simply everything from native `<button>` element. children are moved to an inner `<span>` for styling.

**DOM**

```
button.W95__Button {...props}
  div.W95__ButtonBG
  div.W95__Button__FocusBG
  span.W95__Button__Text
    {props.children}
```

### Checkbox

**props**
  - `checked`: `bool`
  - `label`: `React.Node`
  - `onChange`: `function(): void`

**DOM**

```
div.W95__Checkbox
  div.W95__Checkbox__Box
    div.W95__ControlBG
      <svg />
    input[type=checkbox]
  label
    {label}
```

### List

**props**
  - `items`: `string[]`
  - `selectedItemIndex`: `int`
  - `onSelect`: `function(int): void`

**DOM**

```
div.W95__List
  div.W95__ControlBG
  div.W95__List__Contents
    div.W95__List__ListItem[.m-selected]
      {item}
```

### TextInput

**props**
  - `value`: `string`
  - `onChange`: `function(Event): void`

**DOM**

```
div.W95__TextInput
  div.W95__ControlBG
  input[type=text]
```

### TinyButton

Window decoration button

**props**
  - `style`: `Object|null`
  - `className`: `string|null`
  - `onClick`: `function(Event): void`
  - `children`: `React.Node`

**DOM**

```
div.W95__TinyButton.{className || ''} style={style}
  div.W95__ButtonBG
  {children}
```

## Utilities

There is a CSS class `W95__HorzFlex` that applies a simple horizontal flexbox layout, which makes it easy to put `Group`s next to each other.

# Visual design guidelines

* All controls are scaled 2x. Pixels got a lot smaller during the last 14 years!
* All assets are SVGs.
* No copyrighted assets.
* Fonts are hard, don't worry too much about them.

# Code guidelines

* All classes must be prefixed with `W95__` or `m-`.
* All React component top-level elements must have a CSS class name of the form `W95__ReactComponentName`.
* For other elements inside a React component, use the naming scheme `W95__ReactComponentName__SemanticSubcomponentName`.
  * The exceptions to this rule are classes that may be used in more than one component, like `W95__WindowTitle`.
* If a class is used to modify the appearance of an element, rather than providing its base styles, it must use the form `m-foo-bar`. For example, you could end up with `W95__List__ListItem m-selected`.
* Colors must be defined in CSS variables in `general.scss`.
* Do not nest CSS rules unless the nesting is functionally necessary.
* Roughly one SCSS file per component, with an identical name and `.scss` suffix.
* Do not break accessibility by using `<div>`s for everything.
