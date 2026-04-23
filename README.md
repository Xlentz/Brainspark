# 🌌 Nexoria – Die Wissens-Expedition

Nexoria ist eine interaktive Progressive Web App (PWA) für Kinder und Jugendliche (8–14 Jahre), die spielerisches Lernen mit Gamification-Elementen verbindet. In verschiedenen Wissensbereichen können Nutzer XP sammeln, Badges verdienen und zum "Kategorie-König" aufsteigen.

![Status](https://img.shields.io/badge/Status-Beta-orange)
![Plattform](https://img.shields.io/badge/Plattform-Web%20%2F%20PWA-blue)
![Technologien](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS-yellow)

## 🚀 Features

- **Altersgerechte Herausforderungen:** Getrennte Quiz-Level für Junior (8-10 Jahre) und Master (11-14 Jahre).
- **Vielfältige Themenwelten:**
  - 🌿 **Bio-Dschungel** (Biologie & Natur)
  - 🔢 **Zahlen-Zauber** (Mathematik & Logik)
  - ⏳ **Zeitreise** (Geschichte)
  - 🚀 **Kosmos & Technik** (Astronomie & Physik)
  - 🧩 **Rätsel-Reich** (Allgemeinwissen & Knobeleien)
  - ⚽ **Sport & Spiel** (Sportgeschichte & Regeln)
  - 🇬🇧 **English Explorer** (Vokabeln & Grammatik)
  - 🎬 **Medien-Macher** (Film, Internet & Sicherheit)
- **Gamification:**
  - Sammle **XP** für jede richtige Antwort.
  - Schalte **Badges** (Erfolge) frei, z.B. für fehlerfreie Runden oder erreichte Meilensteine.
  - Lokale Highscore-Speicherung.
- **Offline-First:** Dank Service Worker und PWA-Unterstützung ist die App auch ohne aktive Internetverbindung nutzbar.

## 🛠️ Technische Details

Die App ist bewusst leichtgewichtig ohne schwere Frameworks gebaut:

- **Frontend:** Vanilla JavaScript, HTML5, CSS3 (mit Custom Properties für Themes).
- **Daten:** Die Quiz-Inhalte sind in modularen `.json`-Dateien strukturiert.
- **Speicherung:** Fortschritte und Einstellungen werden im `localStorage` des Browsers gespeichert.
- **PWA:** Vollständiges `manifest.json` und ein Service Worker für Caching und Offline-Verfügbarkeit.

## 📂 Projektstruktur

```text
.
├── index.html          # Hauptanwendung & UI-Logik
├── sw.js               # Service Worker für Offline-Support
├── manifest.json       # PWA-Konfiguration
├── category-1.json     # Quiz-Daten: Bio-Dschungel
├── category-2.json     # Quiz-Daten: Zahlen-Zauber
...
└── icon.png            # App-Icon
