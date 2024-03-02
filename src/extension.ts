import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    // Register a document change listener and add it to subscriptions
    let documentChangeListener = vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
        const activeEditor = vscode.window.activeTextEditor;
        
        if (activeEditor && activeEditor.document.languageId === 'csharp') {
            
            // Log a message whenever a change occurs in a C# file
            console.log("Slowly getting there");
            console.log(event.reason);

            for (const change of event.contentChanges) {

                if (isIntelliSenseCompletion(change.text) && event.reason != 1) {
                    console.log("Intellisense: ", event.document.uri.fsPath);
                        setTimeout(() => {
                            activeEditor.edit(edit => {
                                edit.insert(activeEditor.selection.active, '()');
                            });
                    }, 5);
                }
                
            }
        }
    });

    // Add the document change listener to the subscriptions array
    context.subscriptions.push(documentChangeListener);

    // Show an information message when the extension is activated
    console.log('HELLO WORLD');
}

export function deactivate() {}

function isIntelliSenseCompletion(changeText: string): boolean {

    // Regular expression pattern to match method invocations
    const methodInvocationRegex = /\b[a-zA-Z_]\w{1,}\b/g;

    // Match method invocations in the change text
    const matches = changeText.match(methodInvocationRegex);

    /* TODO - Does the word exist somewhere else within the document? */
    /* TODO - CHECK so that variables won't get parenthesis */

    // Amount of Words
    if (matches && matches.length > 0) {

        // Check for Code Snippets
        if (matches.length > 1) {
            // If there are multiple matches, analyze them further if needed
            console.log('Multiple matches found:', matches);
            return false
            // Additional logic to handle multiple matches
        }

        return true;
    }

    return false;
}
