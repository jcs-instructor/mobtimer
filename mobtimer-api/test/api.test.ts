import { getUuid } from '../src/mobTimerRequests';

test("Id test", () => {
  expect(getUuid().length).toBeGreaterThan(18);
});
