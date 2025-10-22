const KEY = "joelab7";

export class Model {
    constructor() {
        this.messages = [];
        this.lastSaved = null;
        this.onChange  = null;
        this.load();
    }
    emit(){
        if (typeof this.onChange === "function") {
            this.onChange(this.getState());
        }
    }

    getState(){
        return {
            messages: this.messages.slice(),
            lastSaved: this.lastSaved
        }
    }

    load() {
        try{
            const labKey = localStorage.getItem(KEY);
            this.messages = labKey ? JSON.parse(labKey) : [];
        } catch {
            this.messages = [];
        }
        this.lastSaved = new Date().toISOString();
        this.emit()
    }

    save() {
        localStorage.setItem(KEY, JSON.stringify(this.messages));
        this.lastSaved = new Date().toISOString();
        this.emit()
    }

    addText( text, role){
        const msg ={
            id: Date.now().toString() + Math.random().toString(36).slice(2,8),
            text,
            role,
            time : new Date().toISOString(),
            edited: false
        }

        this.messages.push(msg);
        this.save();
        return msg;
    }

    updateText(id, newText){
        const newMsg = this.messages.find(message => message.id === id);
        if (newMsg){
            newMsg.text = newText;
            newMsg.edited = true;
            this.save();
        }
    }

    deleteText(id){
        this.message = this.messages.filter(message => message.id !== id);
        this.save();
    }

    clearText(){
        this.messages = [];
        this.save();
    }

    exportJSON(){
        return JSON.stringify(this.messages, null, 2);
    }

    importJSON(text){
        try {
            const textChain = JSON.parse(text);
            if (!Array.isArray(textChain)) {
                return false;
            }
            this.messages = textChain;
            return true;
        }catch{
            return false;
        }
    }
}

