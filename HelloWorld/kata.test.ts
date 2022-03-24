import { mobUrl } from './kata'

test('Create a mob url', () => {
  expect(mobUrl('arrested-egg')).toBe('https://mobti.me/arrested-egg');
});
