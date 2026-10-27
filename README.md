# Statistikkens alfabet

En interaktiv, selvstendig nettside om statistikk for PSY300. Først et
oversiktsark over analysene, så fire deler:
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

- **Start her** (`#start`, før Del 0) begynner med `#bruk`, «Slik kan du
  bruke siden»: seks måter å bruke siden på, med søket først, og bryteren
  for eksamensfokus. Så kommer oversiktsarket over analysene: `#ov-kart`
  viser familiene (t-test, ANOVA, korrelasjon og regresjon), delene hvert
  resultat består av, og en tabell med alle variantene. `#ov-t`,
  `#ov-anova` og `#ov-reg` sammenligner variantene i en tabell der rader
  merket `oc-likt` er det som er likt i alle, og har en JASP-lik utskrift
  per variant bak fanene (`data-ov`, `data-ov-v`, `data-ov-view`). Celler
  merket `ov-ny` er det som er særegent for varianten. `#ov-reg` setter
  korrelasjon og enkel regresjon side om side. Multippel og hierarkisk
  regresjon ligger der også, men er merket `data-x`. Tallene er regnet ut
  på forhånd og henger sammen (p fra t eller F og df, SS summerer seg til
  samme total i de tre ANOVA-ene, r og b gir samme t, og den hierarkiske
  regresjonen består av den enkle og den multiple).
- **Eksamensfokus.** Faglærer har sagt at dette ikke kommer på eksamen,
  fordi det ikke er gått gjennom i forelesninger eller seminarer:
  bayesiansk statistikk (i kapittel 3), moderering og mediering
  (kapittel 10, men interaksjoner i faktoriell og blandet ANOVA er med),
  ANCOVA (kapittel 12), ikke-parametriske tester (kapittel 15) og
  logistisk regresjon (kapittel 17). Kapitlene er fra *Discovering
  Statistics Using JASP* (Field, van Doorn og Wagenmakers, 2025). Fra
  før vektlegges heller ikke partiell og semipartiell korrelasjon eller
  multippel og hierarkisk regresjon. Alt stoff om dette er merket `data-x`
  og skjult som standard: seksjonene `#dR2`, `#kontroll`, `#vif` og
  `#fam-bayes`, og enkeltdeler, rader og forklaringsbokser ellers.
  Spearman og Kendalls τ (kapittel 7) og kjikvadrat med oddsforhold
  (kapittel 16) er ikke skjult. `data-xi` er det motsatte: tekst som bare
  vises når det andre er skjult. Bryteren (`data-xs-toggle`, i `#bruk` og
  i bunnteksten) lagrer valget i `sa-alt-v1` og laster siden på nytt.
  Valget leses i `<head>` og settes som klassen `vis-alt` på `<html>`, så
  `XS.on` og `XS.ut(el)` øverst i skriptet sier om noe er skjult. Søket,
  ordboka og kortene hopper over skjulte rader, og en lenke til noe skjult
  gir en melding med knappen «Vis alt stoffet». Oppgavene i `UTENFOR` og
  JASP-malene i `UTENFOR_GEN` er bare med i øvingen når alt vises, og
  aldri på prøveeksamen. Det samme gjelder eksemplene i setningsleseren
  som er merket `x:true`. Skal mer stoff skjules, er det nok å sette
  `data-x` på det, og legge oppgavenumrene i `UTENFOR`.
- Tegnene og JASP-ordene i «Start her» forklares i et lite vindu når
  pekeren holdes over dem (trykk på mobil, Enter med tastaturet). Skriptet
  `tegnforklaring` merker dem når siden lastes: tabellhoder og -rader slås
  opp i `EKSAKT`, og i teksten merkes et tegn når det står foran `=`, `(`,
  `<` eller lignende (`t(48)`, `p = .017`). Innholdet hentes fra
  «Kort fortalt»-kortet med samme tegn, så forklaringen er den samme som i
  seksjonen. Ord uten eget kort (Levene, Welch, Mauchly, SS, MS,
  Residuals, RMSE, Adjusted R², Intercept, Mean Difference, interaksjonen,
  R og H₀) står i `EGNE` i skriptet. Øverst i vinduet står en forklaring
  med vanlige ord fra `ENKELT`: hva tallet er, hvorfor vi bruker det, og
  hva det betyr i studien tegnet står i (appstudien, ordstudien eller
  studietimestudien, valgt av `ctx`). Den statistiske definisjonen ligger
  under «Mer presist».
- «Velg analysen» i `#ov-kart` følger forelesningens tabell: faktorer,
  nivåer og om det er de samme personene på begge sider. Blandet ANOVA
  lenker til `#rm-blandet`, som foldes ut.
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
- «Grupper mot grupper» (`#ttest`, `#anova1`, `#anova2`, `#anova3` for
  gjentatte målinger og `#kjikvadrat`) har egne demoer som regner ut
  nøyaktig det JASP ville vist for like store grupper.
  Startverdiene gjenskaper forelesningenes tall: terapistudien
  (t ≈ 7.2, d ≈ 1.67), tidligere behandlingsforsøk (F(2, 72) = 15.27,
  η² = .30) og Roediger & Karpicke (F(1, 116) = 2.13 og 13.33).
- Forklaringsboksene er `<details class="more">`. Varianten `more easy`
  («Enkelt forklart») står øverst i de tyngste seksjonene og forklarer
  ideen med hverdagseksempler; de andre har utregninger, formler og maler.
  Tall i `data-s`-spenn inne i boksene følger datasettet i sandkassen.
  Et søketreff inne i en lukket boks folder den ut.
- Hvert tegn i innholdsfortegnelsen har et «Kort fortalt»-kort (`.symkort`)
  øverst i seksjonen sin: hva tegnet er, hvorfor det brukes, hvilke verdier
  det kan ha og hvordan du leser høye, lave, positive og negative verdier.
  Kortene er med i søket som egne treff.
- `#formler` er formelarket: alt som må pugges til en eksamen uten
  hjelpemidler. Tabellene har `data-fam="Formler: …"`, så hver linje også
  blir et øvingskort.
- Oppgavene ligger i `BANK` i skriptet som `{t, n, k, ch, q, o, c, f, x?}`:
  tema, nummer, begrepskoder (A1–D4: design og måling, slutning,
  analysene, lese og formidle), kapittel i Field, spørsmål, fire
  alternativer, indeksen til det riktige, én begrunnelse per alternativ og
  eventuelt en utstilling (tabell eller SVG) som vises over spørsmålet.
  Alternativene stokkes ved visning. «Øv på» filtrerer på tema, kapittel
  eller begrep; navnene på kapitlene og begrepene står i `KAPITTEL` og
  `BEGREP`.
- «Les utskriften» lages av `JASPGEN`: 24 maler som hver gang lager en
  JASP-lignende utskrift med nye tall som henger sammen (p regnet fra t, F
  eller χ² og df, symmetriske KI, df som stemmer med N) og et spørsmål til.
  `JASPGEN.make(malId, rng(frø))` gir en oppgave i samme format som
  `BANK`. Definisjonen må stå før oppgavepanelet (`(function oppgaver(){`)
  i skriptet, fordi panelet leser malene når det starter. Statistikk­
  hjelperne den bruker (normalfordeling, F- og χ²-fordeling, kritiske
  verdier, JASP-tabeller) ligger i `STATX`.
- Oppgavepanelet har en prøveeksamen: 30 oppgaver uten fasit underveis,
  trukket med samme vekting per kapittel som eksamen (`KVOTE`, tyngst på
  kapittel 6–16) og spredt på begrepene, alltid med tre genererte
  JASP-utskrifter. Til slutt får du resultat per kapittel. Du kan gå
  tilbake og endre et svar, og en påbegynt eksamen avbrytes ikke uten at du
  bekrefter det. Svarene lagres når du er ferdig, så «bare de jeg har
  bommet på» fanger dem opp.
- Oppgavene og forklaringene er skrevet for siden. De følger emnets
  konvensjoner (Levene + Welch, η² i enveis og η²p i faktoriell ANOVA og
  ved gjentatte målinger, KI = M ± 1,96 · SE, Cohens grenser), men er ikke
  hentet fra noe kursmateriell. Siden er ikke offisiell.
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
