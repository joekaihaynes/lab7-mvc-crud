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
├── README.md
└──License.md
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
- MVC isn’t about classes—it’s about boundaries.
- Keep Model free of DOM, keep View free of storage, let Controller connect them.
- Use event delegation for dynamic UI (edit/delete on new messages).
- Always start with a tiny working slice, then layer features.
- Functions over classes: For this level, factories were easier. No this bugs, and the public API is clear.
- Separation really helped: Once the model emitted state and the view only rendered it, fixing bugs felt simpler.
- Small steps: I built a “smoke test” first (send → append to DOM). Then added persistence, then edit/delete, then import/export

## Challenges Encountered 
- small little typos had me on witch hunts for what I thought were bigger problems but console really helped to hammer them out 
- Wrong input selector: I used .input but the element was just input, so submit looked “broken”. Fixed the selector.
- Form reload: Hitting Enter refreshed the page until I added e.preventDefault() in the form submit handler.
- Mixing classic and module scripts.
- this errors: Uncaught TypeError: can't access property "onChange", this is undefined when I tried class patterns. Using plain functions (factories) avoided it.
- Undefined functions: ReferenceError: add is not defined happened when I returned the wrong names from the Model. Matched the returned API and the controller calls.
- View didn’t render: I forgot to call model.setOnChange(view.render). Once wired, state changes showed up.
- Not reading the file (FileReader) or not passing the result to the model.
- importJSON validated but didn’t save()/emit change—added save() (and/or change()).
- LocalStorage parse crash: Corrupt JSON in storage threw—wrapped reads in try/catch and fell back to [].
- Combining classes: At one point I concatenated class names without a space ('message'+role) which broke styling; should be 'message ' + role.

## Live Demo Link 

## Author 
Joe Haynes 
