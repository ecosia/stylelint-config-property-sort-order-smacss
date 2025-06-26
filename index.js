import generate from './generate.js';

const sortOrder = generate();

export default {
  plugins: ['stylelint-order'],
  rules: {
    'declaration-empty-line-before': null,
    'order/order': [
      [
        'dollar-variables',
        'declarations',
      ],
      {
        unspecified: 'ignore',
      },
    ],
    'order/properties-order': sortOrder,
  },
};
