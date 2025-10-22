import { getBotResponse } from "./eliza.js";

export function Controller (model, view) {

    model.setOnChange(function(state) {
        view.render(state);
    });

    view.onSend = function(text){
        model.add(text, "user");
        let reply = getBotResponse(text);
        model.add(reply, "bot");
    }

    view.onExport = function(){
        let jsonText = model.exportJSON();
        let chatBlob = new Blob([jsonText], {type: "application/json"});
        let url = URL.createObjectURL(chatBlob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "textExport.json";
        a.click();
        URL.revokeObjectURL(url);
    }

    view.onImport = function(text){
        let importText = model.importJSON(text);
        if(!importText){
            alert("Import text not found.");
        }

    }

    view.onEdit = function(id){
        let newText = prompt("Edit your message: ");
        if(!newText) return;
        model.update(id, newText);
    }

    view.onDelete = function(id){
        if(!confirm("Are you sure you want to delete?")) return;
        model.remove(id);
    }

    view.onClear = function(){
        model.clear();
    }
}