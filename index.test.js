import { describe, it, expect, vi } from 'vitest';
import config from './index.js';

vi.mock('./generate.js', () => ({
  default: vi.fn(() => [
    [
      {
        groupName: 'layout',
        emptyLineBefore: 'always',
        noEmptyLineBetween: true,
        properties: ['display', 'position', 'top', 'right', 'bottom', 'left']
      },
      {
        groupName: 'box-model',
        emptyLineBefore: 'always',
        noEmptyLineBetween: true,
        properties: ['width', 'height', 'margin', 'padding']
      }
    ],
    {
      unspecified: 'bottomAlphabetical',
      emptyLineBeforeUnspecified: 'always',
    }
  ])
}));

describe('Config', () => {
  it('exports a valid stylelint configuration object', () => {
    expect(config).toBeInstanceOf(Object);
    expect(config).toHaveProperty('plugins');
    expect(config).toHaveProperty('rules');
  });

  it('includes stylelint-order plugin', () => {
    expect(config.plugins).toEqual(['stylelint-order']);
  });

  it('has proper rule configuration structure', () => {
    const { rules } = config;

    expect(rules).toHaveProperty('declaration-empty-line-before');
    expect(rules).toHaveProperty('order/order');
    expect(rules).toHaveProperty('order/properties-order');
  });

  it('disables declaration-empty-line-before rule', () => {
    expect(config.rules['declaration-empty-line-before']).toBe(null);
  });

  it('configures order/order rule correctly', () => {
    const orderRule = config.rules['order/order'];

    expect(orderRule).toBeInstanceOf(Array);
    expect(orderRule).toHaveLength(2);

    const [orderConfig, orderOptions] = orderRule;
    expect(orderConfig).toEqual(['dollar-variables', 'declarations']);
    expect(orderOptions).toEqual({ unspecified: 'ignore' });
  });

  it('configures order/properties-order rule with generated sort order', () => {
    const propertiesOrderRule = config.rules['order/properties-order'];

    expect(propertiesOrderRule).toBeInstanceOf(Array);
    expect(propertiesOrderRule).toHaveLength(2);

    const [primaryOption, secondaryOptions] = propertiesOrderRule;
    expect(primaryOption).toBeInstanceOf(Array);
    expect(secondaryOptions).toEqual({
      unspecified: 'bottomAlphabetical',
      emptyLineBeforeUnspecified: 'always',
    });
  });

  it('has all required properties for a stylelint config', () => {
    const requiredProperties = ['plugins', 'rules'];

    requiredProperties.forEach(prop => {
      expect(config).toHaveProperty(prop);
    });
  });

  it('exports an object that can be used as stylelint extends config', () => {
    expect(typeof config).toBe('object');
    expect(config.plugins).toBeInstanceOf(Array);
    expect(config.rules).toBeInstanceOf(Object);

    Object.entries(config.rules).forEach(([ruleName, ruleConfig]) => {
      expect(typeof ruleName).toBe('string');
      expect(ruleConfig === null || typeof ruleConfig === 'object' || Array.isArray(ruleConfig)).toBe(true);
    });
  });

  it('does not have any undefined or invalid rule configurations', () => {
    Object.values(config.rules).forEach(ruleConfig => {
      expect(ruleConfig).not.toBe(undefined);
    });
  });

  it('maintains consistent plugin and rule naming', () => {
    expect(config.plugins).toContain('stylelint-order');

    const orderRules = Object.keys(config.rules).filter(rule => rule.startsWith('order/'));
    expect(orderRules.length).toBeGreaterThan(0);

    orderRules.forEach(rule => {
      expect(rule).toMatch(/^order\/[a-z-]+$/);
    });
  });
});
