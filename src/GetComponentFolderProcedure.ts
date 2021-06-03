import * as  vscode from 'vscode';
const path = require("path");
import * as fs from 'fs';

export default  async function getComponentFolderProcedure(folderPathFromContextMenu: any) : Promise<vscode.Uri | undefined> {
	let componentDirectory = undefined;

    if(!folderPathFromContextMenu){
        
        let value = "src/";
        let selectedWorkspace = null
        if(vscode.window.activeTextEditor?.document.uri){
            selectedWorkspace = vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor?.document.uri);
            value = vscode.workspace.asRelativePath(vscode.window.activeTextEditor?.document.uri, false);
        }
        //vscode.window.activeTextEditor.
        const componentDirectoryPath =  await vscode.window.showInputBox({
            placeHolder: 'Where should I place the component?',
            value: value,
            title: "Component path",
            validateInput: async text => {
                if(!text){
                    return "Cannot be empty";
                }
                if(text.match(/^\d/)){
                    return "Cannot start with number";
                }
            }
        });
        if(!componentDirectoryPath){
             return; 
        }
        if(selectedWorkspace){
            folderPathFromContextMenu =  vscode.Uri.file(path.join(selectedWorkspace.uri.fsPath, componentDirectoryPath));
        }else{
            folderPathFromContextMenu = vscode.Uri.file(componentDirectoryPath);
        }
    }


    if(folderPathFromContextMenu){
        // const exists = fs.existsSync((folderPathFromContextMenu as vscode.Uri).path)
        // if(!exists){
        //     throw new Error("Directory does not exists")
        // }

        const directoryStatistics = await vscode.workspace.fs.stat(folderPathFromContextMenu);
        
        if(directoryStatistics.type === vscode.FileType.Directory){
            componentDirectory = folderPathFromContextMenu;
        }else{
            const parentDirectory = path.dirname((folderPathFromContextMenu as vscode.Uri).fsPath);
            componentDirectory = vscode.Uri.file(parentDirectory);
        }
    }
    
    return componentDirectory;
}