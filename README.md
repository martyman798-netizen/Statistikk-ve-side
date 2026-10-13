# Statistikkens alfabet

En interaktiv, selvstendig nettside om statistikk for PSY300. Fire deler:
grunnbegrepene, tegnene med en sandkasse du kan dra i, en leseordbok for
vitenskapelige artikler, og til slutt resonnementet som binder det sammen til
en studie — modellen hypotesene kommer fra, hvilken analyse som svarer på
hvilken hypotese, og hvordan svaret rapporteres.

Alt ligger i `public/index.html` — ingen byggesteg, ingen avhengigheter i
sida selv, ingen serverkode. Sandkassen genererer sitt eget datasett i
nettleseren.

## Emnet siden skal dekke

PSY300 Statistisk analyse, Kristiania, høst 2026 (10 sp, 5. semester).
Emnebeskrivelsen er godkjent 09.12.2025 (LU/SHS-sak 118/25).

**Læringsutbytte.** Studenten …

- *Kunnskap:* kjenner til sentrale begreper innen statistisk analyse · har
  bred kunnskap om ulike statistiske analysemetoder, som t-tester,
  korrelasjonsanalyser, regresjonsanalyser og variansanalyse · har kunnskap
  om den praktiske betydningen av statistisk signifikans, og av variasjon i
  effektstørrelser
- *Ferdigheter:* kan vurdere hvilke statistiske analyser som egner seg for å
  besvare et gitt forskningsspørsmål · kan benytte relevante statistiske
  verktøy for å gjennomføre grunnleggende statistiske analyser av psykologisk
  datamateriale, deriblant t-tester, korrelasjonsanalyser og
  regresjonsanalyse · kan vurdere og tolke resultater fra en statistisk
  analyse · kan beherske utregningsmetoder for deskriptiv statistikk · kan
  anvende statistikk til å utforske psykologiske sammenhenger og forskjeller
- *Generell kompetanse:* kan gjennomføre statistiske analyser, samt lese og
  forstå kvantitativ forskningslitteratur · kan formidle resultatene fra
  statistiske analyser både skriftlig og muntlig

**Eksamen:** flervalg, individuell, under tilsyn, 2 timer, A–F, 100 % av
karakteren, **ingen hjelpemidler** — altså ingen kalkulator og ikke
formelark. Arbeidskrav (godkjent/ikke godkjent) gir adgang til eksamen.

Det betyr for siden: oppgavene skal være i flervalgsformat, utregninger skal
gå an uten kalkulator, og formler og tolkningsregler må kunne pugges.

## Filer

| Fil | Hva den gjør |
| --- | --- |
| `public/index.html` | Hele nettsiden: markup, stil og JavaScript i én fil |
| `public/404.html` | Feilside for ukjente adresser |
| `public/_headers` | Sikkerhets- og cache-headere |
| `public/_redirects` | Videresender den gamle filadressen til `/` |
| `public/favicon.svg` | Ikon |
| `public/apple-touch-icon.png`, `public/icon-*.png` | Ikonene når siden legges på hjemskjermen |
| `public/manifest.webmanifest` | Gjør at siden kan legges til på hjemskjermen som en app |
| `public/sw.js` | Service worker: siden virker uten nett etter første besøk |
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

- Søket (`/` eller knappen i toppbaren) slår opp i alle ordbokstabellene,
  seksjonene, «falske venner»-boksene, veivisertabellene, forklaringsboksene
  og den løpende teksten. Greske tegn indekseres både på lyden og på formen,
  så `n2`, `eta2` og `η²` gir samme treff, og hevet skrift kan skrives rett
  på linja. Ord slås opp med synonymer (også engelske: `effect size`,
  `outlier`), lett norsk bøying (`korrelasjonen`), ord som ikke er skrevet
  ferdig (`korre`) og én–to skrivefeil (`standrdavvik`). Småord som «hva»,
  «er» og «forskjellen på» ignoreres, så hele spørsmål kan skrives. Treff
  i navnet veier mer enn treff i forklaringen, og sjeldne ord mer enn
  vanlige. Logikken ligger i `SEARCHTEXT` øverst i skriptet (`parse`,
  `Index`, `mark`), og brukes både av søkeruta og av filteret i den
  samlede ordboka. De siste søkene huskes i nettleseren.
- «Grupper mot grupper» (`#ttest`, `#anova1`, `#anova2`) har egne demoer
  som regner ut nøyaktig det JASP ville vist for like store grupper.
  Startverdiene gjenskaper forelesningenes tall: terapistudien
  (t ≈ 7.2, d ≈ 1.67), tidligere behandlingsforsøk (F(2, 72) = 15.27,
  η² = .30) og Roediger & Karpicke (F(1, 116) = 2.13 og 13.33).
- Forklaringsboksene er `<details class="more">`. Varianten `more easy`
  («Enkelt forklart») står øverst i de tyngste seksjonene og forklarer
  ideen med hverdagseksempler; de andre har utregninger, formler og maler.
  Tall i `data-s`-spenn inne i boksene følger datasettet i sandkassen.
  Et søketreff inne i en lukket boks folder den ut.
- `#formler` er formelarket: alt som må pugges til en eksamen uten
  hjelpemidler. Tabellene har `data-fam="Formler: …"`, så hver linje også
  blir et øvingskort.
- Oppgavepanelet har en prøveeksamen: 30 oppgaver trukket på tvers av alle
  temaene, uten fasit underveis, med resultat per tema til slutt. Du kan
  gå tilbake og endre et svar, og en påbegynt eksamen avbrytes ikke uten
  at du bekrefter det. Svarene lagres når du er ferdig, så «bare de jeg
  har bommet på» fanger dem opp.
- **Mobil (under 900px):** en fast bunnmeny har Søk, Innhold, Oppgaver,
  Kort og Formler. «Innhold» er innholdsfortegnelsen som en skuff som glir
  opp. Snarveiene til oppgavene og kortene lander rett på øvingspanelet.
  Datasettbaren flyttes ned til starten av Del I, og mens du leser Del I
  står en minibar med N og «Nytt utvalg» øverst. Under 640px vises
  ordbokstabellene som stablede kort i stedet for å rulle sidelengs.
  Tabeller som fortsatt er bredere enn skjermen, får en tonet kant.
- Figurene (`setup(id, draw)`) tegnes først når de er innen ca. én skjerm
  fra synsfeltet. Ellers merkes de som utdaterte og tegnes idet de kommer
  inn. Høyden leses fra `height`-attributtet én gang. På smale skjermer
  legger figurene etikettene over stolpene i stedet for ved siden av.
- Hvert hopp (innholdsfortegnelsen, bunnmenyen, et søketreff) blir en
  oppføring i nettleserhistorikken, og søkeruta og skuffen er det også.
  Tilbake-sveipet fører deg derfor dit du var, i stedet for ut av siden.
  Det styres av `JUMP` i skriptet. På mobil dukker det i tillegg opp en
  «Tilbake»-knapp etter et søk, fordi en app på hjemskjermen ikke har
  nettleserens tilbakeknapp.
- Siden husker hvilken seksjon du var i (`sa-pos-v1` i localStorage) og
  viser «Fortsett der du slapp» øverst neste gang. Den hopper aldri dit
  av seg selv.
- `sw.js` henter alltid fra nettet først og legger en kopi i bufferen. Uten
  nett serveres kopien. Den trenger `connect-src 'self'` i CSP-en, fordi
  en service worker får CSP fra sin egen respons. Endrer du hvilke filer
  som skal forhåndslagres, bytt navnet på `CACHE` i `sw.js`.
- Antall øvingskort og oppgaver på kortene øverst regnes ut av skriptet;
  tallene i HTML-en er bare reserve uten JavaScript.
- Skriftene lastes fra Google Fonts uten å blokkere første visning
  (`media="print"` som byttes til `all` når stilarket er lastet). Uten nett
  faller siden tilbake på Georgia og en systemmono, og alt fungerer
  fortsatt.
- Lys og mørk drakt følger `prefers-color-scheme` automatisk.
- `Content-Security-Policy` i `public/_headers` tillater `'unsafe-inline'`
  for stil og skript, fordi alt ligger inline i `index.html`. Flyttes CSS og
  JS ut i egne filer, kan den strammes inn.
- `_headers` og `_redirects` må ligge inne i `public/`. Cloudflare leser dem
  som konfigurasjon og serverer dem aldri som filer.
