import { sanitize, deepClone,lambert93toWGPS, deepCompare } from '../src/tools/utils.js';

/**
 * sanitize
 */
test('sanitize : Verify ""', () => {
  const result = sanitize('');
  expect(result).toEqual('');
});

/**
 * lambert93toWGPS
 */
test('lambert93toWGPS : Verify ""', () => {
  const result = lambert93toWGPS(960467.919, 6459404.189);
  expect(result).toEqual([6.317365754647306, 45.184698460463636]);
});
test('lambert93toWGPS : Verify ""', () => {
  const result = lambert93toWGPS(961055.157, 6468811.914);
  expect(result).toEqual([6.329885894853984, 45.269110416825335]);
});

/**
 * deepClone
 */
test('deepClone : Verify null', () => {
  const result = deepClone(null);
  expect(result).toEqual(null);
});
test('deepClone : Verify string', () => {
  const result = deepClone('45');
  expect(result).toEqual('45');
});
test('deepClone : Verify simple object', () => {
  const result = deepClone({id: '45'});
  expect(result).toEqual({id: '45'});
});
test('deepClone : Verify simple array', () => {
  const result = deepClone(['45', '55']);
  expect(result).toEqual(['45', '55']);
});
test('deepClone : Verify object with date', () => {
  let nDate = new Date();
  const result = deepClone({'test': '55', 'date': nDate});
  expect(result).toEqual({'test': '55', 'date': nDate});
});

/**
 * deepCompare
 */
test('deepCompare : Verify null', () => {
  const result = deepCompare(null, null, null);
  expect(result).toEqual(null);
});
test('deepCompare : Verify two empty objets', () => {
  const result = deepCompare({}, {}, {});
  expect(result).toEqual({});
});
test('deepCompare : Verify two empty objets', () => {
  const result = deepCompare({test: 45}, {toto: 56}, {});
  expect(result).toEqual({test: 45, toto: 56});
});