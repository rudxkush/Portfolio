
// All previous outputs from commands and such
let OutputsText = "";
// Lets user scroll through the past outputs
let ScrollOffset = 0;

// String to store the current text input
let InputText = "";
// Dictionary to store info about the text blinker
let Blinker = {Index: 0, Time: Date.now() * 0.001};

// Current directory
let Directory = "C:/Users/guest";

// Stores weather to render plasma or normal terminal
let DisplayPlasma = false;

// Function to give text for rendering
function GetText()
{
    // Text to be displayed
    let FinalText = "";

    if (Time < 5 || OutputsText.split("\n").length < 19) // If in boot sequence
    {
        BootSequence();
        FinalText = OutputsText;
    }

    else if (!DisplayPlasma) // If not in boot sequence
    {
        // Trim the previous output to be displayed
        let Lines = OutputsText.split("\n");
        FinalText += Lines.slice(ScrollOffset, Math.min(ScrollOffset + 30, Lines.length)).join("\n");

        // Check if command input is on screen
        if (ScrollOffset + 30 >= Lines.length)
        {
            if ((Date.now() * 0.001 - Blinker.Time) % 1 < 0.5) // Show blinker
            {
                FinalText += `${Directory}> ${InputText.slice(0, Blinker.Index)}█${InputText.slice(Blinker.Index + 1, InputText.length)}`;
            }

            else // Dont show blinker
            {
                FinalText += `${Directory}> ${InputText}`;
            }
        }
    }

    else
    {
        return GetTextPlasma();
    }

    return FinalText;
}

// Function to handle key press and text input
function KeyPressed(key)
{
    if (DisplayPlasma)
    {
        if (key === "Escape")
        {
            DisplayPlasma = false;
        }
    }

    else if (Time > 5)
    {
        let LinesCount = OutputsText.split("\n").length;

        if (key.length === 1 && InputText.length + Directory.length + 3 < 55) // Add character
        {
            InputText = InputText.slice(0, Blinker.Index) + key.toLowerCase() + InputText.slice(Blinker.Index, InputText.length);
            Blinker = {Index: Blinker.Index + 1, Time: Date.now() * 0.001}; // Update blinker pos and reset its time
            if (ScrollOffset < LinesCount - 30) {ScrollOffset = Math.max(0, LinesCount - 30);} // Reset the scroll if off screen
        }
        
        else if (key === "Backspace" && InputText && Blinker.Index > 0) // Remove character
        {
            InputText = InputText.slice(0, Blinker.Index - 1) + InputText.slice(Blinker.Index, InputText.length);
            Blinker = {Index: Blinker.Index - 1, Time: Date.now() * 0.001}; // Update blinker pos and reset its time
            if (ScrollOffset < LinesCount - 30) {ScrollOffset = Math.max(0, LinesCount - 30);} // Reset the scroll if off screen
        }

        else if (key === "ArrowLeft") // Move blinker left
        {
            Blinker = {Index: Math.max(0, Blinker.Index - 1), Time: Date.now() * 0.001};
        }

        else if (key === "ArrowRight") // Move blinker right
        {
            Blinker = {Index: Math.min(InputText.length, Blinker.Index + 1), Time: Date.now() * 0.001};
        }

        else if (key === "ArrowUp") // Scroll text upwards
        {
            ScrollOffset = Math.max(0, ScrollOffset - 1);
        }

        else if (key === "ArrowDown") // Scroll text downwards
        {
            ScrollOffset = Math.min(LinesCount - 1, ScrollOffset + 1);
        }

        else if (key === "Tab") // Auto complete
        {
            AutoComplete(); // Complete input text
            Blinker = {Index: InputText.length, Time: Date.now() * 0.001}; // Update blinker pos and reset its time
            if (ScrollOffset < LinesCount - 30) {ScrollOffset = Math.max(0, LinesCount - 30);} // Reset the scroll if off screen
        }

        else if (key === "Enter") // Submit text
        {
            OutputsText += `${Directory}> ${InputText}\n`;
            ExecuteCommand();

            InputText = "";
            Blinker = {Index: 0, Time: Date.now() * 0.001};

            LinesCount = OutputsText.split("\n").length;
            if (ScrollOffset < LinesCount - 30) {ScrollOffset = Math.max(0, LinesCount - 30);}
        }
    }
}

function BootSequence()
{
    OutputsText = "";
    let LoadingChars = ["-", "\\", "|", "/"];

    if (Time > 0.1) {OutputsText += " ██████╗ ██╗   ██╗██████╗ ██████╗  █████╗ \n";}
    if (Time > 0.2) {OutputsText += " ██╔══██╗██║   ██║██╔══██╗██╔══██╗██╔══██╗\n";}
    if (Time > 0.3) {OutputsText += " ██████╔╝██║   ██║██║  ██║██████╔╝███████║\n";}
    if (Time > 0.4) {OutputsText += " ██╔══██╗██║   ██║██║  ██║██╔══██╗██╔══██║\n";}
    if (Time > 0.5) {OutputsText += " ██║  ██║╚██████╔╝██████╔╝██║  ██║██║  ██║\n";}
    if (Time > 0.6) {OutputsText += " ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝\n\n\n";}
    if (Time > 1.1) {OutputsText += "Welcome to Rudras-OS 2.9.0 x86_64\n";}
    if (Time > 1.2) {OutputsText += "Type 'help' to list available commands\n\n\n";}
    if (Time > 1.7) {OutputsText += `Loading ${LoadingChars[Math.ceil((Math.min(3.7, Time) % 0.4) / 0.1) - 1]} ${Math.ceil(Math.min(100, (Time - 1.7) / 0.02))}%\n`;}
    if (Time > 3.7) {OutputsText += ".\n";}
    if (Time > 3.8) {OutputsText += ".\n";}
    if (Time > 3.9) {OutputsText += ".\n";}
    if (Time > 4.0) {OutputsText += "Complete!\n\n";}

    ScrollOffset = Math.min(OutputsText.split("\n").length - 1, ScrollOffset);
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// File system structure (unchanged)
// File system structure (Updated with provided 2026 data)
const FileSystem = {
    "root": {type: "directory", contents: {

        "projects": {type: "directory", contents: {
            "projects.txt": {type: "file", content: "Key technical projects focusing on NLP, systems\noptimization, and data structures. Highlights include\na scratch-built GPT model and optimized performance\nalgorithms[cite: 27, 30, 31]."},
            "gpt_spam_classifier.lnk": {type: "link", content: "https://github.com/rudxkush/gpt2-spam-classifier"},
            "graph.lnk": {type: "link", content: "https://github.com/rudxkush/Graph"},
            "tree.lnk": {type: "link", content: "https://github.com/rudxkush/Tree"},
            "round_robin.lnk": {type: "link", content: "https://github.com/rudxkush/RoundRobin"},
            "Schedule Overlap.lnk": {type: "link", content: "https://github.com/rudxkush/WorkerScheduleIntersection"},
            "K-Sum Finder.lnk": {type: "link", content: "https://github.com/rudxkush/multi-element-sum-finder"},
        }},

        "about.txt": {type: "file", content: "Rudra Pratap Singh Kushwah [cite: 1]\nSoftware Engineer | B.Tech CSE, KIIT (2025) [cite: 7, 41, 42]\nLanguages: C/C++, Python, Java, JS/TS, SQL, Swift, Dart [cite: 3]\nTools: AWS, Docker, Kubernetes, PyTorch, React, Node.js [cite: 4]\nPeak LeetCode Rating: 1900 (Top 2% globally) [cite: 38]\nSolved 550+ problems across CodeChef and LeetCode[cite: 37]."},
        
        "experience.txt": {type: "file", content: "INTECH SYSTEMS (2025):\n- Developed C# Copilot for Nestlé (40% efficiency boost) \n- Built serverless Python/Azure pipelines (10K+ records) [cite: 12]\n- Cut deployment time 30% via GitHub Actions & K8s [cite: 13]\n\nTRANSLAB TECHNOLOGIES (2023-2024):\n- Java/Spring Boot APIs for ICICI (2M+ users) [cite: 16]\n- Slashed latency 40% via SQL optimization [cite: 17]\n\nRUDDER SOFT (2024):\n- Optimized Flutter widget trees (25% faster render) [cite: 23]\n- Reduced query latency 20% via NoSQL/REST integration [cite: 24]"},
        
        "plasma.exe": {type: "executable", content: "plasma"},
    }},
};
// Error 404 not found.
function ListFiles() {
    // 1. Resolve the current directory safely
    let currentDirObj = FileSystem.root;
    
    // We remove "C:/Users/guest" and split the remaining path
    const pathParts = Directory.replace("C:/Users/guest", "").split("/").filter(Boolean);
    
    for (let dir of pathParts) {
        if (currentDirObj.contents && currentDirObj.contents[dir]) {
            currentDirObj = currentDirObj.contents[dir];
        }
    }

    // 2. Header: Print the current folder name
    const folderName = Directory.split("/").pop() || "root";
    OutputsText += `\n Directory of ${folderName}:`;

    // 3. Logic to print files with a retro tree structure
    const files = Object.keys(currentDirObj.contents || {});
    
    if (files.length === 0) {
        OutputsText += "\n ┗━━ (Empty)";
    } else {
        files.forEach((fileName, index) => {
            const isLast = index === files.length - 1;
            const prefix = isLast ? " ┗━" : " ┣━";
            
            // Retro distinction: Folders get a trailing slash or different arrow
            const isFile = fileName.includes(".");
            const pointer = isFile ? "▷ " : "▶ ";
            
            OutputsText += `\n${prefix}${pointer}${fileName}`;
        });
    }

    OutputsText += "\n\n";
}

function ChangeDirectory(InputDirectory)
{
    let CurrentDirectory = Directory.slice(15).split("/").filter(Boolean);

    // Go back a folder
    if (InputDirectory === "..") {CurrentDirectory.pop();}
    
    // Return to root folder
    else if (InputDirectory === "/") {CurrentDirectory = [];}
    
    // Move to new folder
    else
    {
        // Move to current folder
        let DirectoryContents = FileSystem.root;
        for (let Dir of CurrentDirectory) {DirectoryContents = DirectoryContents.contents[Dir];}

        // Add new folder to path
        if (DirectoryContents.contents[InputDirectory] && DirectoryContents.contents[InputDirectory].type === "directory")
        {CurrentDirectory.push(InputDirectory);}
        
        // Desired path dousnt exist
        else {OutputsText += `\ncd: '${InputDirectory}' No such directory\n\n`;return;}
    }

    Directory = `C:/Users/guest${CurrentDirectory.length ? "/" : ""}${CurrentDirectory.join("/")}`;
}

function StartFile(InputFile)
{
    // Move to current folder
    let DirectoryContents = FileSystem.root;
    for (let Dir of Directory.slice(15).split("/").filter(Boolean)) {DirectoryContents = DirectoryContents.contents[Dir];}

    // Perform action based on what file is opened
    if (DirectoryContents.contents[InputFile] && DirectoryContents.contents[InputFile].type === "file")
    {
        OutputsText += `\n${DirectoryContents.contents[InputFile].content}\n\n`;
    }

    else if (DirectoryContents.contents[InputFile] && DirectoryContents.contents[InputFile].type === "link")
    {
        OutputsText += `\nRedirecting to '${DirectoryContents.contents[InputFile].content}'\n\n`;
        window.open(DirectoryContents.contents[InputFile].content);
    }

    else if (DirectoryContents.contents[InputFile] && DirectoryContents.contents[InputFile].type === "executable")
    {
        OutputsText += `\n'${InputFile}' Started successfully\n\n`;
        DisplayPlasma = true;
    }
    
    // Selected file dousnt exist
    else {OutputsText += `\nstart: '${InputFile}' No such file\n\n`;}
}

// Modified ExecuteCommand function
function ExecuteCommand()
{
    const [Command, ...Arguments] = InputText.split(" ");

    if (Command)
    {
        ComputerBeep.play();
        ComputerBeep.currentTime = 0;
    }

    switch (Command)
    {
        case "ls":
            if (Arguments.length) {OutputsText += "\nError: 'ls' doesn't accept any arguments\n\n";}
            else {ListFiles();}
            break;

        case "cd":
            if (Arguments.length > 1) {OutputsText += "\nError: 'cd' doesn't accept more that one argument\n\n";}
            else {ChangeDirectory(Arguments[0]);}
            break;

        case "start":
            if (Arguments.length > 1) {OutputsText += "\nError: 'start' doesn't accept more that one argument\n\n";}
            else {StartFile(Arguments[0]);}
            break;

        case "clear":
            if (Arguments.length) {OutputsText += "\nError: 'clear' doesn't accept any arguments\n\n";}
            else {BootSequence();}
            break;

        case "help":
            if (Arguments.length) {OutputsText += "\nError: 'help' doesn't accept any arguments\n\n";}
            else {OutputsText += "\nPress 'tab' for auto complete and press 'esc' to exit\na program (.exe file)\n\nLS       Lists current directory contents\nCD       Change directory, '..' moves back, '/' to root\nSTART    Opens specified file in current directory\nCLEAR    Clears all previous terminal outputs\n\n";}
            break;

        case "":
            break;

        default:
            OutputsText += `\nCommand not found '${Command}'\n\n`;
    }
}
  
// Autocomplete function
function AutoComplete()
{
    const [Command, ...Arguments] = InputText.split(" ");
    const CommandsList = ["ls", "cd", "start", "clear"];
    
    // Auto completing a command
    if (!Arguments.length)
    {
        const CompletededCommand = CommandsList.filter(Element => Element.startsWith(Command));
        if (CompletededCommand.length) {InputText = CompletededCommand[0]};
    }
  
    // Auto comepleting a file name
    if (["cd", "start"].includes(Command) && Arguments.length < 2)
    {
        // Move to current folder
        let DirectoryContents = FileSystem.root;
        for (let Dir of Directory.slice(15).split("/").filter(Boolean)) {DirectoryContents = DirectoryContents.contents[Dir];}

        // Possible file names
        const PossibleCompletions = Object.keys(DirectoryContents.contents).filter(Item => Item.startsWith(Arguments));
        if (PossibleCompletions.length) {InputText = `${Command} ${PossibleCompletions[0]}`;}
    }
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

function GetTextPlasma()
{
    const Letters = [" ", "_", "a", "b", "c", "ö", "õ", "ö", "#", "$", "%", "1", "2", "3", "A", "B", "C"];
    let Text = "";

    for (let Row = 1; Row < 31; Row++)
    {
        for (let Col = 1; Col < 56; Col++)
        {
            const Intensity = GetIntensityPlasma(Row / 30, Col / 55);
            Text += Letters[Math.max(Math.min(Math.floor(Intensity) - 1, Letters.length - 1), 0)];
        }

        Text += "\n";
    }

    return Text
}

function GetIntensityPlasma(Row, Col)
{ 
    let Intensity = 0.0;

    Intensity += 0.7 * Math.sin(0.5 * Row + Time / 5);
    Intensity += 3 * Math.sin(1.6 * Col + Time / 5);
    Intensity += 1 * Math.sin(10 * (Col * Math.sin(Time / 2) + Row * Math.cos(Time / 5)) + Time / 2);

    const CyclicX = Row + 0.5 * Math.sin(Time / 2);
    const CyclicY = Col + 0.5 * Math.cos(Time / 4);

    Intensity += 0.4 * Math.sin(Math.sqrt(100 * CyclicX ** 2 + 100 * CyclicY ** 2 + 1) + Time);
    Intensity += 0.9 * Math.sin(Math.sqrt(75 * CyclicX ** 2 + 25 * CyclicY ** 2 + 1) + Time);
    Intensity += -1.4 * Math.sin(Math.sqrt(256 * CyclicX ** 2 + 25 * CyclicY ** 2 + 1) + Time);
    Intensity += 0.3 * Math.sin(0.5 * Col + Row + Math.sin(Time));

    return 17 * (0.5 + 0.499 * Math.sin(Intensity)) * (0.7 + Math.sin(Time) * 0.3);
}



