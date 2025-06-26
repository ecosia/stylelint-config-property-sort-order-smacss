import { describe, it, expect } from 'vitest';
import generate from './generate.js';

describe('Generate', () => {
  it('returns an array with two elements', () => {
    const result = generate();
    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);
  });

  it('returns proper structure with default options', () => {
    const result = generate();
    const [primaryOption, secondaryOptions] = result;

    expect(primaryOption).toBeInstanceOf(Array);
    expect(secondaryOptions).toEqual({
      unspecified: 'bottomAlphabetical',
      emptyLineBeforeUnspecified: 'always',
    });
  });

  it('applies default options to groups when no options provided', () => {
    const result = generate();
    const [primaryOption] = result;

    primaryOption.forEach(group => {
      expect(group).toHaveProperty('emptyLineBefore', 'always');
      expect(group).toHaveProperty('noEmptyLineBetween', true);
      expect(group).toHaveProperty('groupName');
      expect(group).toHaveProperty('properties');
      expect(group.properties).toBeInstanceOf(Array);
    });
  });

  it('accepts custom options and apply them to groups', () => {
    const customOptions = {
      emptyLineBefore: 'never',
      noEmptyLineBetween: false,
    };

    const result = generate(customOptions);
    const [primaryOption] = result;

    primaryOption.forEach(group => {
      expect(group).toHaveProperty('emptyLineBefore', 'never');
      expect(group).toHaveProperty('noEmptyLineBetween', false);
      expect(group).toHaveProperty('groupName');
      expect(group).toHaveProperty('properties');
    });
  });

  it('flattens nested group properties', () => {
    const result = generate();
    const [primaryOption] = result;

    primaryOption.forEach(group => {
      expect(group.properties).toBeInstanceOf(Array);
      group.properties.forEach(property => {
        expect(typeof property).toBe('string');
      });
    });
  });

  it('preserves groupName for each group', () => {
    const result = generate();
    const [primaryOption] = result;

    primaryOption.forEach(group => {
      expect(group.groupName).toBeTruthy();
      expect(typeof group.groupName).toBe('string');
    });
  });

  it('returns consistent results when called multiple times', () => {
    const result1 = generate();
    const result2 = generate();

    expect(result1).toEqual(result2);
  });

  it('preserves all CSS properties from the imported order', () => {
    const result = generate();
    const [primaryOption] = result;

    expect(primaryOption.length).toBeGreaterThan(0);

    primaryOption.forEach(group => {
      expect(group.properties.length).toBeGreaterThan(0);
    });
  });

  it('handles empty custom options object', () => {
    const result = generate({});
    const [primaryOption] = result;

    expect(primaryOption).toBeInstanceOf(Array);
    expect(primaryOption.length).toBeGreaterThan(0);
  });

  it('merges custom options with group structure', () => {
    const customOptions = {
      emptyLineBefore: 'threshold',
      customProp: 'test-value',
    };

    const result = generate(customOptions);
    const [primaryOption] = result;

    primaryOption.forEach(group => {
      expect(group).toHaveProperty('emptyLineBefore', 'threshold');
      expect(group).toHaveProperty('customProp', 'test-value');
      expect(group).toHaveProperty('groupName');
      expect(group).toHaveProperty('properties');
    });
  });
});
