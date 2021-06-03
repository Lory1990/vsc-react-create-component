import { window } from 'vscode';
import * as vscode from 'vscode';
import { paramCase } from "change-case";
const path = require("path");

export interface ICreateComponentFolderDTO {
    componentName:string,
    directoryPath: string,
}

 export default async function createComponentFolder({componentName, directoryPath} : ICreateComponentFolderDTO) {
	try{
		const componentNameSnakeCase = paramCase(componentName)
		const configuration = vscode.workspace.getConfiguration()
		
		let filesToCreate = [];
		if(configuration.get('files.createSass')){
			filesToCreate.push({
				extension: ".scss",
				content: `.${componentNameSnakeCase}{

				}
				`,
			})
		}

		
		if(configuration.get('files.createLess')){
			filesToCreate.push({
				extension: ".less",
				content: `.${componentNameSnakeCase}{

				}
				`,
			})
		}

		if(configuration.get('files.createCss')){
			filesToCreate.push({
				extension: ".css",
				content: `.${componentNameSnakeCase}{

				}
				`,
			})
		}


		
		const dialect = configuration.get("dialect")
		
		switch(dialect){
			case "typescript":
				if(configuration.get('files.createMainFile')){
					filesToCreate.push({
						extension: ".tsx",
						content: `import React from "react"

						export interface I${componentName}Props{

						}

						export default function ${componentName}(props : I${componentName}Props){
							return <div className='${componentNameSnakeCase}'>
							
							</div>
						}
						`,
					})

					filesToCreate.push({
						name: "package.json",
						content: `{
							"main": "${componentName}.tsx"
						}
						`,
					})
				}

				if(configuration.get('files.createStory')){
					filesToCreate.push({
						extension: ".stories.tsx",
						content: "",
					})
				}

				if(configuration.get('files.createFormik')){
					filesToCreate.push({
						extension: ".formik.tsx",
						content: "",
					})
				}

				
				break;
			case "javascript":
				if(configuration.get('files.createMainFile')){
					filesToCreate.push({
						extension: ".js",
						content: `import React from "react"

						export default function ${componentName}(props){
							return <div className='${componentNameSnakeCase}'>
							
							</div>
						}
						`,
					})
				
					filesToCreate.push({
						name: "package.json",
						content: `{
							"main": "${componentName}.js"
						}
						`,
					})

				}

				if(configuration.get('files.createStory')){
					filesToCreate.push({
						extension: ".stories.js",
						content: "",
					})
				}

				if(configuration.get('files.createFormik')){
					filesToCreate.push({
						extension: ".formik.js",
						content: "",
					})
				}
				break;
			case "svelte":
				break;
		}

		if(filesToCreate.length === 0) return
		
		const directory = path.join(directoryPath, componentName);
		// Ceating folder
		
		await vscode.workspace.fs.createDirectory(vscode.Uri.file(directory))
		// Ceating files
		for(let  fileToCreate of filesToCreate){
			await vscode.workspace.fs.writeFile(vscode.Uri.file(path.join(directory, fileToCreate.name ? fileToCreate.name : componentName+fileToCreate.extension)), Buffer.from(fileToCreate.content, 'utf8'));
		}
	}catch(e){
		console.error(e);
		throw e;
	}
}