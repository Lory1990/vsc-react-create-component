import { window } from 'vscode';
import * as vscode from 'vscode';
const path = require("path");

export interface ICreateComponentFolderDTO {
    componentName:string,
    directoryPath: string,
}

 export default async function createComponentFolder({componentName, directoryPath} : ICreateComponentFolderDTO) {
	try{
		let extensions = [".tsx", ".stories.tsx", ".js", ".formik.tsx"];
		const directory = path.join(directoryPath, componentName);
		// Ceating folder
		debugger
		await vscode.workspace.fs.createDirectory(vscode.Uri.file(directory))
		// Ceating files
		for(let  extension of extensions){
			await vscode.workspace.fs.writeFile(vscode.Uri.file(directory + "\\" + componentName+extension), Buffer.from("", 'utf8'));
		}
	}catch(e){
		console.error(e);
		throw e;
	}
}