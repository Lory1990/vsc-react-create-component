// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import CreateComponentFolderView from './CreateComponentFolderView'
import CreateComponentFolder from './createComponentFolder'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Extension started');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vsc-react-create-component.createFolder', async (event) => {
		// const path2 = event
		// const path = vscode.workspace
		// console.log('Folders are', path, path2);
		const componentName = await CreateComponentFolderView();
		if(!componentName) return
		if(componentName) vscode.window.showInformationMessage(`Creating ${componentName} component`);
		CreateComponentFolder({
			componentName,
			path: "/to/be/defined"
		})
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
