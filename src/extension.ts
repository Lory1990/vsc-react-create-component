// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import getComponentNameView from './GetComponentNameView';
import createComponentFolder from './createComponentFolder';
import getComponentFolderProcedure from './GetComponentFolderProcedure';
const path = require("path");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vsc-react-create-component.createFolder', async (event) => {
		try{
			const componentName = await getComponentNameView();
			if(!componentName) {return;}

			const componentDirectory = await getComponentFolderProcedure(event);
			if(!componentDirectory) {return;}
		
			await createComponentFolder({
				componentName,
				directoryPath: componentDirectory.fsPath
			});
			vscode.window.showInformationMessage(`Created ${componentName} component`);
		}catch(e){
			vscode.window.showErrorMessage(e.message)
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
