# @ecosia/stylelint-config-property-sort-order-smacss

[Stylelint](https://github.com/stylelint/stylelint) config for Property Sort Ordering based on the [SMACSS](http://smacss.com) methodology.

## Related Packages

- [stylelint-config-property-sort-order-smacss](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss/)

## Usage

The following patterns are considered violations:

```css
a {
  color: red;
  top: 0;
}
```

```css
a {
  top: 0;
  color: black;
  position: absolute;
  display: block;
}
```

The following patterns are _not_ considered violations:

```css
a {
  top: 0;
  color: red;
}
```

```css
a {
  display: block;
  position: absolute;
  top: 0;
  color: black;
}
```

Refer to [css-property-sort-order-smacss](https://github.com/cahamilton/css-property-sort-order-smacss/blob/v2.2.0/index.js) for the comprehensive list of property orders.

For more information on configuring Stylelint, check out the [configuration](https://github.com/stylelint/stylelint/blob/16.0.0/docs/user-guide/configure.md) guide.

## Advanced

**This is currently only possible with an exported JavaScript configuration.**

The basic usage outlined above, will enforce that properties are **strictly** sorted within their groups (box, border, background etc). Given this configuration makes use of [stylelint-order](https://github.com/hudochenkov/stylelint-order/tree/6.0.4) under the hood, there's a couple extra bits of functionality that can be configured. This will require manually generating the configuration - but passing in extra options as seen fit. These will be applied to **each** property group.

### Options

Refer to the [properties-order](https://github.com/hudochenkov/stylelint-order/blob/6.0.4/rules/properties-order/README.md#options) documentation for a list of available options.

All options except `properties` and `groupName` can be modified.

### Examples

#### Flexible Ordering

This will allow properties within the same group to be in any order.

Given:

```js
// stylelint.config.js

const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate');

module.exports = {
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': [
      sortOrderSmacss()
    ],
  },
};
```

The following patterns are considered violations:

```css
a {
  top: 0;
  position: absolute;
  display: block;
  color: black;
}
```

Given:

```js
// stylelint.config.js

const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate');

module.exports = {
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': [
      sortOrderSmacss({ order: 'flexible' })
    ],
  },
};
```

The following patterns are _not_ considered violations:

```css
a {
  top: 0;
  position: absolute;
  display: block;
  color: black;
}
```

#### Empty Line After Property Group

This will allow an empty line after each property group:

Given:

```js
// stylelint.config.js

const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate');

module.exports = {
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': [
      sortOrderSmacss({ emptyLineBefore: 'never' })
    ],
  },
};
```

The following patterns are considered violations:

```css
a {
  display: block;
  position: absolute;
  top: 0;

  color: black;
}
```

Given:

```js
// stylelint.config.js

const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate');

module.exports = {
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-order': [
      sortOrderSmacss({ emptyLineBefore: 'always' })
    ],
  },
};
```

The following patterns are _not_ considered violations:

```css
a {
  display: block;
  position: absolute;
  top: 0;

  color: black;
}
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License

See [LICENSE.md](./LICENSE.md) for license information.
