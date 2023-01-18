import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head lang="en">
        <meta charSet="utf-8" />
        {/* Fix this one */}
        <link rel="icon" href="/favicon.ico" />

        <link rel="icon" type="image/png" sizes="32x32" href="/logo32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo16.png" />

        {/* Does this need to be here or can I set it somewehre else? */}
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <meta name="theme-color" content="#000000" />
        <meta name="description"
          content="Calculate bonuses from Pokemon Scarlet and Violet sandwich builds and get the best in-game bonuses you can get!" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@enigma_0z" />
        <meta name="twitter:title" content="Pokemon Scarlet & Violet Sandwich Calculator" />
        <meta name="twitter:description" content="Build the best Scarlet & Violet sandwich you can make" />
        <meta name="twitter:image" content="/twitter-img.png" />
        <link rel="apple-touch-icon" href="/logo192.png" />

        {/* manifest.json provides metadata used when your web app is installed on a
          user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/ */}

        <link rel="manifest" href="/manifest.json" />

        {/* <title>Sandwich Calculator</title> */}

        {/* Custom Scripts */}
        {/* Google tag (gtag.js) */}
        <Script strategy='afterInteractive' src="https://www.googletagmanager.com/gtag/js?id=G-WZ67KCRGPC"></Script>
        <Script strategy='afterInteractive' id='gtag.js setup'> {`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'G-WZ67KCRGPC');
        `} </Script>

        {/* Nitropay setup */}
        <Script strategy='afterInteractive' data-cfasync="false" id='nitroads setup'>{`
          window.nitroAds = window.nitroAds || { createAd: function () { return new Promise(e => { window.nitroAds.queue.push(["createAd", arguments, e]) }) }, addUserToken: function () { window.nitroAds.queue.push(["addUserToken", arguments]) }, queue: [] };
        `}</Script>
        <Script strategy='afterInteractive' data-cfasync="false" src="https://s.nitropay.com/ads-1347.js"></Script>

        {/* Github Single Page App setup */}
        <Script strategy='beforeInteractive' type="text/javascript" id='github spa'> {`
          (function (l) {
            if (l.search[1] === '/') {
              var decoded = l.search.slice(1).split('&').map(function (s) {
                return s.replace(/~and~/g, '&')
              }).join('?');
              window.history.replaceState(null, null,
                l.pathname.slice(0, -1) + decoded + l.hash
              );
            }
          }(window.location))
        `} </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
