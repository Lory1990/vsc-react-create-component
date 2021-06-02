// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import createComponentFolderView from './CreateComponentFolderView';
import createComponentFolder from './createComponentFolder';
const path = require("path");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let logger = vscode.window.createOutputChannel("ReactCreateComponenet");
	logger.show();
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	logger.appendLine('Extension started');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vsc-react-create-component.createFolder', async (event) => {
		try{
			const componentName = await createComponentFolderView();
			if(!componentName) {return;}

			let componentDirectory = undefined;
			if(event){
				const directoryStatistics = await vscode.workspace.fs.stat(event);
				
				if(directoryStatistics.type === vscode.FileType.Directory){
					componentDirectory = event;
				}else{
					const parentDirectory = path.dirname((event as vscode.Uri).fsPath);
					componentDirectory = vscode.Uri.file(parentDirectory);
				}
			}else{
				//TODO
				debugger;
			}

			await createComponentFolder({
				componentName,
				directoryPath: (componentDirectory as  vscode.Uri).fsPath
			});
			vscode.window.showInformationMessage(`Created ${componentName} component`);
		}catch(e){
			logger.appendLine("Error");
			logger.appendLine(e);
		}
	});

	let disposableContext = vscode.commands.registerCommand('vsc-react-create-component.createFolderFromContext', async (event) => {
		const componentName = await createComponentFolderView();
		if(!componentName) {return;}
		console.log(event);
		debugger;
		//   if(componentName) vscode.window.showInformationMessage(`Creating ${componentName} component`);
		//   CreateComponentFolder({
		// 	  componentName,
		// 	  path: "/to/be/defined"
		//   })
	  });

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableContext);
}

// this method is called when your extension is deactivated
export function deactivate() {}
