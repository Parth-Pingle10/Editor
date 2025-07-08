let active = -1;

const input = document.querySelector(".language-input");
const droplist = document.querySelector(".droplist");
const listItems = Array.from(droplist.querySelectorAll("li"));

document.querySelector(".language").addEventListener("click", (e) => {
    e.stopPropagation();
    droplist.classList.add("show");
});

document.body.addEventListener("click", () => {
    droplist.classList.remove("show");
});

input.addEventListener("input", () => {
    const value = input.value.trim().toLowerCase();
    active = -1;

    listItems.forEach(item => {
        const match = item.textContent.toLowerCase().includes(value);
        item.classList.toggle("hide", !match);
    });
});

input.addEventListener("keydown", (e) => {
    const visibleItems = listItems.filter(item => !item.classList.contains("hide"));

    if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        active = (active + 1) % visibleItems.length;
        updateActiveItem(visibleItems);
    }

    if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        active = (active - 1 + visibleItems.length) % visibleItems.length;
        updateActiveItem(visibleItems);
    }

    if (e.key === "Enter") {
        e.preventDefault();
        if (active >= 0 && visibleItems[active]) {
            input.value = visibleItems[active].textContent;
            droplist.classList.remove("show");
            active = -1;
            removeActiveClass(visibleItems); // return focus to input
        }
    }
});

function updateActiveItem(items) {
    removeActiveClass(items);
    if (active >= 0 && active < items.length) {
        items[active].classList.add("active");
    }
}

function removeActiveClass(items) {
    items.forEach(item => item.classList.remove("active"));
}

document.querySelectorAll(".droplist li").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelector(".language-input").value = item.textContent;
        document.querySelector(".droplist").classList.remove("show");
        active = -1;
        document.querySelectorAll(".droplist li").forEach(li => li.classList.remove("active"));
    });
});

document.querySelector(".filename").addEventListener("input", () => {
    const input = document.querySelector(".file").value.split(".").pop().trim().toLowerCase();
    const language = {

        "js": "JavaScript",
        "py": "Python",
        "java": "Java",
        "cpp": "C++",
        "c": "C",
        "cs": "C#",
        "ts": "TypeScript",
        "go": "Go",
        "rb": "Ruby",
        "php": "PHP",
        "swift": "Swift",
        "kt": "Kotlin",
        "rs": "Rust",
        "r": "R",
        "pl": "Perl",
        "scala": "Scala",
        "dart": "Dart",
        "hs": "Haskell",
        "ex": "Elixir",
        "lua": "Lua",
        "m": "MATLAB",
        "sh": "Shell",
        "asm": "Assembly",
        "sql": "SQL"
    };

    document.querySelector(".language-input").value = language[input] || "Plain Text";
});
const editor = document.querySelector(".editor")
editor.addEventListener("keydown", (e) => {
    if (e.key === "{") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;

        const value = editor.value;
        editor.value = value.slice(0, start) + "{}" + value.slice(end);
        editor.selectionStart = editor.selectionEnd = start + 1;
    }
    if (e.key === "(") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;

        const value = editor.value;
        editor.value = value.slice(0, start) + "()" + value.slice(end);
        editor.selectionStart = editor.selectionEnd = start + 1;
    }
    if (e.key === "[") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;

        const value = editor.value;
        editor.value = value.slice(0, start) + "[]" + value.slice(end);
        editor.selectionStart = editor.selectionEnd = start + 1;
    }
    if (e.key === "'") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;

        const value = editor.value;
        editor.value = value.slice(0, start) + "''" + value.slice(end);
        editor.selectionStart = editor.selectionEnd = start + 1;
    }
    if (e.key === "<") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;

        const value = editor.value;
        editor.value = value.slice(0, start) + "<>" + value.slice(end);
        editor.selectionStart = editor.selectionEnd = start + 1;
    }
    if (e.key === '"') {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;

        const value = editor.value;
        editor.value = value.slice(0, start) + '""' + value.slice(end);
        editor.selectionStart = editor.selectionEnd = start + 1;
    }
})

const edit = CodeMirror.fromTextArea(document.querySelector(".editor"), {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    extraKeys: {
        "Tab": "autocomplete",
        "Ctrl-/": "toggleComment",   // Toggle line comment
        "Ctrl-F": "find",            // Open find box
        "Ctrl-G": "findNext",        // Go to next match
        "Shift-Ctrl-G": "findPrev",  // Go to previous match
        "Shift-Ctrl-F": "replace",   // Find and replace
        "Shift-Ctrl-R": "replaceAll" // Replace all
    }
})
const langmap = {
    "javascript": "javascript",
    "python": "python",
    "java": "text/x-java",
    "c++": "text/x-c++src",
    "c": "text/x-csrc",
    "c#": "text/x-csharp",
    "typescript": "application/typescript",
    "go": "go",
    "ruby": "ruby",
    "php": "application/x-httpd-php",
    "swift": "swift",             // No native mode; may require plugin/custom
    "kotlin": "text/x-kotlin",    // Not in default CM modes
    "rust": "rust",               // Community mode available
    "r": "r",
    "perl": "perl",
    "scala": "text/x-scala",      // May require extra setup
    "dart": "dart",               // Community mode available
    "haskell": "haskell",
    "elixir": "elixir",           // Not in default CM
    "lua": "lua",
    "objective-c": "text/x-objectivec", // Treated as a C-like language
    "shell": "shell",
    "assembly": "text/x-gas",     // Assembly (GNU)
    "matlab": "octave",           // CodeMirror uses 'octave' for MATLAB-like syntax
    "sql": "sql"
};
const langInput = document.querySelector(".language-input");

langInput.addEventListener("input", () => {
    const lang = langInput.value.trim().toLowerCase();
    const mode = langmap[lang] || "text/plain"; // fallback
    edit.setOption("mode", mode);
});

function getExtension(lang) {
    const extMap = {
        "python": "py",
        "javascript": "js",
        "java": "java",
        "c++": "cpp",
        "c": "c",
        "c#": "cs",
        "typescript": "ts",
        "go": "go",
        "ruby": "rb",
        "php": "php",
        "swift": "swift",
        "kotlin": "kt",
        "rust": "rs",
        "r": "r",
        "perl": "pl",
        "scala": "scala",
        "dart": "dart",
        "haskell": "hs",
        "elixir": "ex",
        "lua": "lua",
        "shell": "sh",
        "assembly": "asm",
        "matlab": "m",
        "sql": "sql"
    };
    return extMap[lang] || "txt";
}


async function runcode() {
    const code = edit.getValue();
    const input = document.querySelector(".input").value;
    const bhasha = document.querySelector(".language-input").value;
    const file = document.querySelector(".filename").value;


    const langVersionMap = {
        "javascript": "18.15.0",
        "python": "3.10.0",
        "java": "15.0.2",
        "c++": "10.2.0",
        "c": "10.2.0",
        "c#": "6.12.0",         // Mono
        "typescript": "5.0.3", // Usually same as TS compiler version
        "go": "1.20.5",
        "ruby": "3.2.2",
        "php": "8.2.3",
        "swift": "5.7.3",
        "kotlin": "1.8.10",
        "rust": "1.70.0",
        "r": "4.2.2",
        "perl": "5.34.0",
        "scala": "3.2.2",
        "dart": "2.19.6",
        "haskell": "9.2.5",
        "elixir": "1.14.2",
        "lua": "5.4.4",
        "objective-c": "10.2.0", // same as GCC (treated as C/C++)
        "shell": "5.1.16",       // bash version
        "assembly": "10.2.0",    // GCC asm
        "matlab": "octave",      // Piston uses Octave instead of MATLAB
        "sql": "15.3"            // PostgreSQL version
    };
    const praju = bhasha.trim().toLowerCase();
    const back = {
        language: praju,
        version: langVersionMap[praju] || "*",
        files: [{ name: file || `main.${getExtension(praju)}`, content: code }],
        stdin: input
    };

console.log("Sending to Piston:", back);


    try {
        const res = await fetch("https://pranjal-enz6.onrender.com/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(back),
        });

        const data = await res.json();
        console.log("Full response:", data);
        const output =
            data.run?.stdout ||
            data.stdout ||
            data.run?.output ||
            data.output ||
            data.run?.stderr ||
            data.stderr ||
            data.message ||
            "⚠️ No output received.";

        document.querySelector(".output").textContent = output;



    } catch (err) {
        document.querySelector(".output").innerHTML = "Error while running"
        console.log(err);
    }
}

document.querySelector(".run").addEventListener("click", runcode);

document.querySelector(".clear").addEventListener("click",()=>{
    document.querySelector(".input").value=""
    document.querySelector(".output").innerHTML="<h3>Output</h3>"
    edit.setValue("");
})


document.querySelector(".save").addEventListener("click",()=>{
          const filename = document.querySelector(".file").value.trim();
      const content = edit.getValue();

      if (!filename || !filename.includes(".")) {
        alert("Please enter a filename with extension");
        return;
      }

      const blob = new Blob([content], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
}
)