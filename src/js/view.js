export function View(doc){
    let d = document;
    let list = d.querySelector(".messages")
    let form = d.querySelector(".input-area");
    let input = form.querySelector("input");
    let count = d.getElementById("msgCount");
    let exptButton = d.getElementById("exportButton");
    let impButton = d.getElementById("importButton");
    let clrButton = d.getElementById("clearButton");

    let onSend = null;
    let onImport = null;
    let onExport = null;
    let onClear = null;

    function render(state){
        let items = (state && state.messages) ? state.messages : [];
        list.innerHTML = "";

        if(!items.length){
            let empty = d.createElement("p");
            empty.className = "empty-convo";
            empty.textContent = "No messages yet. Start a conversation!";
            list.appendChild(empty);
        }else{
            for (let i = 0; i < items.length; i++) {
                let m = items[i];
                let p = d.createElement("p");
                p.className = (m.role === "user") ? "user" : "bot";
                p.textContent = m.text || "";
                list.appendChild(p);


            }

            list.scrollTop = list.scrollHeight;
        }

        if (count){
            let n = items.length;
            count.textContent = n + " message" + (n===1 ? "" : "s");
        }
    }

    if (form){
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (!input) return;
            let text = String(input.value || "").trim();
            if(!text) return
            if(typeof onSend === "function") onSend(text);
            input.value = "";

        });


    }

    if (exptButton){
        exptButton.addEventListener("click", function () {
            if (typeof onExport === "function") onExport();
        });
    }

    if (impButton){
        impButton.addEventListener("click", function () {
            let picker = d.createElement("input");
            picker.type = "file";
            picker.accept = "application/json";
            picker.addEventListener("change", function () {
                let file = picker.files && picker.files[0];
                if (!file) return;
                let reader = new FileReader();
                reader.onload = function () {
                    if (typeof onImport === "function") {
                        onImport(String(reader.result || ""));
                    }
                };
                reader.readAsText(file);
            });
            picker.click();
        });
    }

    if (clrButton){
        clrButton.addEventListener("click", function () {
            if (confirm("Clear all messages?")) {
                if (typeof onClear === "function") onClear();
            }
        });
    }

    return{
        render: render,
        set onSend(fn)   { onSend = fn;   },
        set onExport(fn) { onExport = fn; },
        set onImport(fn) { onImport = fn; },
        set onClear(fn)  { onClear = fn;  }
    };

}