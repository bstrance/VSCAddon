'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "hex2bin" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.hex2bin', () => {
        // The code you place here will be executed every time your command is executed
        const mark = '31　 27 　 23 　19 　15 　11 　 7　　3　 ', slicepadding = "0000000000000000000000000000000";
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }
        var selection = editor.selection;
        var text = editor.document.getText(selection);
        if (text.length < 8) {
            return; // Not Command
        }
        //Hex2bin
        if (text.length == 8) {
            var change = (slicepadding + parseInt(text, 16).toString(2)).slice(-32);
            change.split(" ", 4);
            var segments = change.match(/.{4}/g);
            var spcode = "";
            for (var i = 0; i < segments.length; i++) {
                spcode += " " + segments[i];
            }
            // Display a message box to the user
            vscode.window.showInformationMessage(mark);
            vscode.window.showInformationMessage(spcode.trim());
            //Bin2Hex
        }
        else if (text.length > 8 && text.length < 40) {
            var change = parseInt(text.replace(/\s+/g, ""), 2).toString(16);
            var spcode = change.toUpperCase();
            // Display a message box to the user
            vscode.window.showInformationMessage(spcode.trim());
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map