import { NitroPayConfig } from "./NitroPayConfig"

test('NitroPay Demo Mode', () => {
  expect(NitroPayConfig?.demo).toBe(false)
})