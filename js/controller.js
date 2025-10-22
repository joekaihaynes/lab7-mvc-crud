import { getBotResponse } from "./eliza";

export function Controller (model, view) {

    model.setOnchange(function(state)){
        view.render(state);
    }

    view.onSend = function(text){

    }

    view.onExport = function(state){

    }

    view.onExport = function(state){

    }

    view.onEdit = function(state){

    }

    view.onClear = function(state){

    }
}