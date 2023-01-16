import { NitroPayConfig } from "./Config"

test('NitroPay Demo Mode', () => {
  expect(NitroPayConfig?.demo).toBe(false)
})