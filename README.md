# Student Upload

A simple student registration app built with plain HTML, CSS, and JavaScript. It lets you add students, validate their details, show the register table, view student names, and remove the last entry.

## Features
- Add a student with full name, matric number, level, and department
- Validate each field with inline error messages
- Prevent duplicate matric numbers
- Show a scrollable student register table
- Highlight the newest student with a "Last added" tag
- View the full list of names in a toggle panel
- Remove the last student from the array using `pop()`
- Add three sample students when the list is empty

## How to run
1. Open `index.html` in a browser.
2. Use the form to add students.
3. Click "Done, show names" to view the names panel.

## File structure
- `index.html` — page structure
- `style.css` — layout, colors, responsive design, and theme
- `script.js` — validation, rendering, and array logic
- `README.md` — usage notes and project summary

## Matric number rule
The matric number must match this format:
- `23/024145123`
- Pattern: `^\d{2}\/\d{9}$`

This means:
- two digits
- a slash
- nine digits

## Color note
The design uses a deep navy and burnt orange palette:
- Navy: `#0f2547`
- Burnt orange: `#c9540a`
- Highlight: `#fde6d3`
- Background: `#eef1f6`

These colors are defined with CSS variables and also have a dark theme using `prefers-color-scheme`.
