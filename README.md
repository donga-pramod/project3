# Portfolio Project #3 — Online Descriptive Studies Research Tool

**Link to the website** https://donga-pramod.github.io/project3/index.html

This is a group project developed by:

- **Aryal Pramod** [2573412]
- **Khatiwada Rabin** [2573400]
- **Mandal Rajnish** [2670971]

---

## Project Overview

For this portfolio project we created an online Descriptive Studies Research Tool. The tool is designed as a website that can be used to collect data for research purposes.

We built **two different tools** inside one Windows XP-themed website:

1. **Online Questionnaire** — A dating application style profile form
2. **Observation Tool** — A game-like observation logger called **Human Safari**

Users can access both tools from a central homepage. We also added a functional Windows XP-style taskbar so users can switch between the tools easily.

---

## Features

### Homepage
- Classic Windows XP desktop look
- Navigation window to choose between the two tools
- Functional taskbar with live clock
- Start button that returns to the homepage
- Easter egg: clicking the Recycle Bin opens a Rickroll

### Online Questionnaire (Dating Profile)
- Collects basic personal information suitable for a dating application profile
- Fields include: Display Name, Age, Gender, Looking For, Height, City, Education, Interests, and About Me
- All responses are saved in the browser using `localStorage`
- Users can download the collected data as a CSV file
- Minimize and Close buttons (Windows XP style)

### Observation Tool — Human Safari
- Game-inspired observation tool (similar to the Pokémon Go example mentioned in the brief)
- Users “catch” people based on observed behaviour
- Categories include: Phone Zombie, Matching Couple, Headphones Warrior, Food Walker, Self Talker, Fast Walker, Lost Tourist, and Other
- Each category has different points
- Live score and total catches counter
- Optional note field for each observation
- Recent captures list
- Data is stored locally and can be downloaded as a CSV dataset
- Help button (`?`) that opens a classic Windows XP style help dialog explaining how to use the tool

### Shared Features Across the Project
- Consistent Windows XP visual theme (title bars, buttons, colours, fonts)
- Custom XP-style cursors
- Functional taskbar that shows currently open tools
- Minimize keeps the tool on the taskbar; Close removes it
- Responsive layout for different screen sizes

---


## How to Use

1. Open the homepage (`https://donga-pramod.github.io/project3/index.html`)
2. Choose either **Online Questionnaire** or **Observation Tool**
3. The selected tool will appear as an icon on the taskbar
4. Use **Minimize** to return to the homepage while keeping the tool available on the taskbar
5. Use **Close** to fully close the tool
6. In both tools, collected data can be downloaded as a CSV file for further analysis

---



