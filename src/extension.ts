import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    // Register a document change listener and add it to subscriptions
    let documentChangeListener = vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => {
        const activeEditor = vscode.window.activeTextEditor;
        
        if (activeEditor && activeEditor.document.languageId === 'csharp') {
            
            for (const change of event.contentChanges) {

                console.log("----------------------");
                console.log("Range: "        + change.range);           // [15:2, 15:5] Row starts from 0
                console.log("RangeLength: "  + change.rangeLength);     // If myT will be autocompleted, the range of the word to be replaced is 3
                console.log("RangeOffset: "  + change.rangeOffset);     // Position of Char in the document
                console.log("Change Text: "  + change.text);            // Changed Text
                console.log("Length: "       + change.text.length);
                console.log("----------------------");
                 
                // TODO - Remove
                // filterKeywords(change.text)

                if 
                (
                    isIntelliSenseCompletion(change.text) &&    // Check Regex
                    event.reason != 1                           // Check if UNDO
                    
                ) {
                    console.log("Intellisense: ", event.document.uri.fsPath);
                        setTimeout(() => {
                            activeEditor.edit(edit => {
                                edit.insert(activeEditor.selection.active, '();');
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

    // TODO - NEEDS WORK
    const methodInvocationRegex = new RegExp("^[A-Z][A-Za-z]{2,}$");



    // Match method invocations in the change text
    const matches = changeText.match(methodInvocationRegex);

    
    
    // TODO - Does the word exist somewhere else within the document? 
    // TODO - CHECK for keywords 
    // TODO - Might be CLOSED OFF, check for C# extension Compatibility! 
    // TODO - Console. <-- This autocompletes as well 
    console.log("--------------");
    console.log("----Matches----");
    console.log("--------------");

    console.log(matches?.length);
    console.log(matches);
    console.log("--------------");


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

function filterKeywords(input: string) {

    const lowercaseInput = input.toLowerCase

    if (
        lowercaseInput.length === 0 || 
        lowercaseInput == undefined || 
        typeof lowercaseInput !== 'string'
    ) {

        console.log("EMPTY");

        return false
    }

    const cSharpKeywords = [
        "abstract",
        "as",
        "base",
        "bool",
        "break",
        "byte",
        "case",
        "catch",
        "char",
        "checked",
        "class",
        "const",
        "continue",
        "decimal",
        "default",
        "delegate",
        "do",
        "double",
        "else",
        "enum",
        "event",
        "explicit",
        "extern",
        "false",
        "finally",
        "fixed",
        "float",
        "for",
        "foreach",
        "goto",
        "if",
        "implicit",
        "in",
        "int",
        "interface",
        "internal",
        "is",
        "lock",
        "long",
        "namespace",
        "new",
        "null",
        "object",
        "operator",
        "out",
        "override",
        "params",
        "private",
        "protected",
        "public",
        "readonly",
        "ref",
        "return",
        "sbyte",
        "sealed",
        "short",
        "sizeof",
        "stackalloc",
        "static",
        "string",
        "struct",
        "switch",
        "this",
        "throw",
        "true",
        "try",
        "typeof",
        "uint",
        "ulong",
        "unchecked",
        "unsafe",
        "ushort",
        "using",
        "var",
        "virtual",
        "void",
        "volatile",
        "while",
      ];
      
    const isKeyword = cSharpKeywords.find((keyword) => keyword === input)
    
    console.log("FILTER KEYWORD: ", isKeyword);

    return isKeyword

}