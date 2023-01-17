import { subscribeAuthEvent } from "../../auth/AWSEventListener";
import { NitroPayConfig } from "./Config";
import { Signer } from "./Signer";

const signer =  new Signer(NitroPayConfig.sponsorToken)

subscribeAuthEvent('NitroPay Sign In', ['signIn', 'autoSignIn'], (user) => {
  const token = signer.sign({
    userId: user.attributes.email,
    siteId: '1347'
  })

  //@ts-ignore
  window["nitroSponsor"].init(
    {
      token: token,
      successUrl: "https://example.com/success", // ???
      cancelUrl: "https://example.com/cancel", // ???
      product: 102 // Basic subscription
    },

    function(res: any) {
      // success callback
      console.log('NitroPay subscription', res);
    }
  );
})

subscribeAuthEvent('NitroPay Sign Out', ['signOut'], () => {
  //@ts-ignore
  window["nitroSponsor"].init({})
})
