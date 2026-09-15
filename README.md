# Statistikkens alfabet

En interaktiv, selvstendig nettside om statistikk for PSY300. Tre deler:
grunnbegrepene, tegnene med en sandkasse du kan dra i, og en leseordbok for
vitenskapelige artikler.

Alt ligger i `public/index.html` — ingen byggesteg, ingen avhengigheter i
sida selv, ingen serverkode. Sandkassen genererer sitt eget datasett i
nettleseren.

## Filer

| Fil | Hva den gjør |
| --- | --- |
| `public/index.html` | Hele nettsiden: markup, stil og JavaScript i én fil |
| `public/404.html` | Feilside for ukjente adresser |
| `public/_headers` | Sikkerhets- og cache-headere |
| `public/_redirects` | Videresender den gamle filadressen til `/` |
| `public/favicon.svg` | Ikon |
| `public/robots.txt` | Åpner siden for søkemotorer |
| `wrangler.jsonc` | Cloudflare-oppsettet: hvilken mappe som skal serveres |
| `package.json` | Låser hvilken wrangler-versjon som brukes |

Alt som skal ut på nettet ligger i `public/`. Det er med vilje: da havner
ikke README og konfigurasjonsfiler ut på et offentlig nettsted.

## Kjør lokalt

```sh
npm install
npm run dev
```

Det starter den samme runtimen som Cloudflare bruker, så `_headers`,
`_redirects` og 404-siden oppfører seg akkurat som i produksjon.

Skal du bare lese HTML-en, kan du åpne `public/index.html` rett i
nettleseren — men da gjelder ikke `_headers` og `_redirects`.

## Deploy

Siden kjører på **Cloudflare Workers** med static assets. Prosjektet er
koblet til dette Git-repoet, så hver push til produksjonsgrenen bygger og
deployer automatisk. Push til andre grener laster opp en forhåndsvisning i
stedet.

Cloudflare kjører `npx wrangler deploy`, som leser `wrangler.jsonc` og
laster opp innholdet i `public/`. Det finnes ingen byggekommando, fordi det
ikke er noe å bygge.

Vil du sjekke at oppsettet er gyldig før du pusher:

```sh
npm run check
```

Og deploye manuelt, utenom Git:

```sh
npm run deploy
```

## Notater

- Skriftene lastes fra Google Fonts. Uten nett faller siden tilbake på
  Georgia og en systemmono, og alt fungerer fortsatt.
- Lys og mørk drakt følger `prefers-color-scheme` automatisk.
- `Content-Security-Policy` i `public/_headers` tillater `'unsafe-inline'`
  for stil og skript, fordi alt ligger inline i `index.html`. Flyttes CSS og
  JS ut i egne filer, kan den strammes inn.
- `_headers` og `_redirects` må ligge inne i `public/`. Cloudflare leser dem
  som konfigurasjon og serverer dem aldri som filer.
