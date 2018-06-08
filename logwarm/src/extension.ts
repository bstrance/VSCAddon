'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // Edit function
    let disposable = vscode.commands.registerCommand('extension.eatlog', () => {
        console.log("called warm!")
        let editor = vscode.window.activeTextEditor; // get editor
        let doc = editor.document;            // get document
        let cur_selection = editor.selection; // get area
        if(editor.selection.isEmpty){
            // if area is None, all select area.
            let startPos = new vscode.Position(0, 0);
            let endPos = new vscode.Position(doc.lineCount - 1, 10000);
            cur_selection = new vscode.Selection(startPos, endPos);
        }

        let text = doc.getText(cur_selection); //get text
        var textArray = text.split(/\r\n|\r|\n/);
        for (let i = 0; i < textArray.length; i++) {
            textArray[i] = textArray[i].replace(/^(?!.*(tx\.|rx\.|#)).+$/g,"");
            textArray[i] = textArray[i].replace(/(.*)(?=tx\.)|(.*)(?=rx\.)/g,"");
            console.log(textArray[i])
        }
        const eattext = textArray.filter(v => v)
        console.log("result>"+eattext.join('\r\n'));
        //set text
        editor.edit(edit => {
            edit.replace(cur_selection, eattext.join('\r\n'));
        });

        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Eat!');
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}