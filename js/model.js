const KEY = "joelab7";

export function Model() {
    let messages = [];
    let onChange =null;

    function makeUID(){
        return Date.now().toString() + Math.random().toString(36).slice(2, 8);
    }
    function change(){
        if (typeof onChange === "function") {
            onChange({ messages: messages.slice() });
        }
    }


    function load() {
        try{
            let labKey = localStorage.getItem(KEY);
            messages = labKey ? JSON.parse(labKey) : [];
        } catch(e) {
            messages = [];
        }
        change();
    }

    function save() {
        localStorage.setItem(KEY, JSON.stringify(messages));
        change();
    }

    function addText( text, role){
        let msg ={
            id: makeUID(),
            text: String(text),
            role : role,
            time : new Date().toISOString(),
            edited: false
        }
        messages.push(msg);
        save();
        return msg;
    }

    function updateText(id, newText) {
        let msg = messages.find(m => m.id === id);
        if (!msg) return false;
        msg.text = String(newText || ""); e
        msg.edited = true;
        save();
        return true;
    }

    function deleteText(id) {
        let before = messages.length;
        messages = messages.filter(m => m.id !== id);
        if (messages.length === before) return false;
        save();
        return true;
    }

    function clearText(){
        messages = [];
        save();
    }

    function exportJSON(){
        return JSON.stringify(messages, null, 2);
    }

    function importJSON(text){
        try {
            let textChain = JSON.parse(text);
            if (!Array.isArray(textChain)) {
                return false;
            }
            messages = textChain;
            return true;
        }catch(e){
            return false;
        }
    }

    load();

    return {
        // subscription
        setOnChange: function (fn) { onChange = fn; change(); },
        // crud
        add: addText,
        update: updateText,
        remove: deleteText,
        clear: clearText,
        // import/export
        exportJSON: exportJSON,
        importJSON: importJSON
    };
}

