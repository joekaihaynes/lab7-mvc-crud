# Lab 7 – MVC Refactor (Chat App with CRUD + Persistence)

## Project Overview
This lab refactors the Lab 6 chat into a **Model–View–Controller (MVC)** app with full **CRUD** for messages and **localStorage** persistence. The UI and Eliza-style bot stay familiar, but the code is reorganized so **data**, **presentation**, and **user interactions** are clearly separated.

**What’s included**
- **Create**: send user messages; bot replies
- **Read**: load chat history on page load
- **Update**: edit user messages (shows “edited”)
- **Delete**: delete a message or clear all (with confirm)
- **Persistence**: data survives refresh via `localStorage`
- **Import / Export**: JSON file in/out
- **UX**: message count, last saved time, Enter-to-send, auto-scroll

---

## Repository Structure
`
lab7-mvc-crud/
│
├── src/
│   ├── index.html
│   ├── styles.css
│   └── js/
│       ├── app.js          # bootstraps MVC
│       ├── model.js        # data + persistence (CRUD, localStorage, import/export)
│       ├── view.js         # rendering + DOM events (no business logic)
│       ├── controller.js   # coordinates Model and View
│       └── eliza.js        # tiny reply logic (exported function)
│
└── README.md
`
## Architecture (MVC)

### Model (`model.js`)
- Owns data: array of messages `{ id, text, role, timestamp, edited? }`
- **CRUD**: `create / read / update / delete / clear`
- Persists to **localStorage**
- **Observer pattern**: notifies subscribers on changes
- **Import/Export**: JSON round-trip with basic validation

### View (`view.js`)
- Renders messages and small UI bits (count, last saved)
- Emits semantic events: `send`, `edit`, `delete`, `clear`, `import`, `export`
- Uses **event delegation** for dynamic edit/delete buttons
- No business logic and no storage calls

### Controller (`controller.js`)
- Subscribes to View events → updates Model
- Subscribes to Model updates → refreshes View
- Calls `eliza.js` to generate bot replies
- No direct DOM manipulation or persistence here

### App (`app.js`)
- Wires Model ↔ View ↔ Controller

## Reflections 

## Observations 

## Challenges Encountered 

## Live Demo Link 

## Author 
Joe Haynes 
