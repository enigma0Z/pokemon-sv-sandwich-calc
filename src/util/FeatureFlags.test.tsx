import FeatureFlags from "./FeatureFlags";

test('Login Feature', () => {
  expect(FeatureFlags.login).toBe(false)
})