# Linecal

Ein einfacher Linienkalender mit statischem JSON-Endpunkt ueber GitHub Pages.

## GitHub Pages aktivieren

1. Repository auf GitHub oeffnen.
2. Zu `Settings` -> `Pages` gehen.
3. Unter **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. Speichern und 1-2 Minuten warten, bis die Seite live ist.

## JSON-Endpunkt

Nach dem Deployment ist der Endpunkt hier erreichbar:

`https://terrorzwerg.github.io/Linecal/linienkalender.json`

## Abruf per JavaScript

```js
const response = await fetch("https://terrorzwerg.github.io/Linecal/linienkalender.json");
const data = await response.json();
console.log(data);
```

## Hinweise

- Der Endpunkt ist read-only (statische Datei von GitHub Pages).
- Nach jeder Aenderung an `linienkalender.json` muss ein neuer Push erfolgen.
- Bei Cache-Verzoegerung testweise mit Query-Parameter abrufen:
  `https://terrorzwerg.github.io/Linecal/linienkalender.json?v=1`
