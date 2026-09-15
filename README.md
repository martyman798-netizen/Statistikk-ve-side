# Statistikkens alfabet

En interaktiv, selvstendig nettside om statistikk for PSY300. Tre deler:
grunnbegrepene, tegnene med en sandkasse du kan dra i, og en leseordbok for
vitenskapelige artikler.

Alt ligger i `index.html` — ingen byggesteg, ingen avhengigheter, ingen
serverkode. Sandkassen genererer sitt eget datasett i nettleseren.

## Filer

| Fil | Hva den gjør |
| --- | --- |
| `index.html` | Hele nettsiden: markup, stil og JavaScript i én fil |
| `404.html` | Feilside for ukjente adresser |
| `_headers` | Sikkerhets- og cache-headere for Cloudflare Pages |
| `_redirects` | Videresender den gamle filadressen til `/` |
| `favicon.svg` | Ikon |
| `robots.txt` | Åpner siden for søkemotorer |

## Kjør lokalt

Åpne `index.html` direkte i nettleseren, eller start en enkel server:

```sh
python3 -m http.server 8000
```

Siden ligger da på <http://localhost:8000>. En server er å foretrekke hvis du
vil teste `_headers` og `_redirects` — de gjelder bare når Cloudflare serverer
filene.

## Deploy til Cloudflare Pages

Siden er statisk, så det trengs ingen byggekommando.

### Via Git (anbefalt)

1. Gå til Cloudflare-dashbordet → **Workers & Pages** → **Create** → **Pages**
   → **Connect to Git**.
2. Velg dette repoet.
3. Sett opp bygget slik:
   - **Framework preset:** `None`
   - **Build command:** *(tom)*
   - **Build output directory:** `/`
4. **Save and Deploy.**

Hver push til produksjonsgrenen gir en ny deploy; andre grener får sin egen
forhåndsvisnings-URL.

### Via Wrangler

```sh
npx wrangler pages deploy . --project-name=statistikkens-alfabet
```

## Notater

- Skriftene lastes fra Google Fonts. Uten nett faller siden tilbake på
  Georgia og en systemmono, og alt fungerer fortsatt.
- Lys og mørk drakt følger `prefers-color-scheme` automatisk.
- `Content-Security-Policy` i `_headers` tillater `'unsafe-inline'` for stil og
  skript, fordi alt ligger inline i `index.html`. Flyttes CSS og JS ut i egne
  filer, kan den strammes inn.
