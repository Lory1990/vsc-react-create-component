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
		let stylesImport = []
		if(configuration.get('styleFiles.createSass')){
			filesToCreate.push({
				extension: ".scss",
				content: `.${componentNameSnakeCase}{

				}
				`,
			})
			stylesImport.push(`import './${componentName}.scss'`)
		}

		if(configuration.get('styleFiles.createSassModule')){
			filesToCreate.push({
				extension: ".module.scss",
				content: `.${componentNameSnakeCase}{

				}
				`,
			})
			stylesImport.push(`import style from './${componentName}.module.scss'`)
		}

		
		if(configuration.get('styleFiles.createLess')){
			filesToCreate.push({
				extension: ".less",
				content: `.${componentNameSnakeCase}{

				}
				`,
			})
			stylesImport.push(`import './${componentName}.less'`)
		}

		if(configuration.get('styleFiles.createLessModule')){
			filesToCreate.push({
				extension: ".module.less",
				content: `.${componentNameSnakeCase}{

				}
				`,
			})
			stylesImport.push(`import style from  './${componentName}.module.less'`)
		}

		if(configuration.get('styleFiles.createCss')){
			filesToCreate.push({
				extension: ".css",
				content: `.${componentNameSnakeCase}{

				}
				`,
			})
			stylesImport.push(`import './${componentName}.css'`)
		}

		if(configuration.get('styleFiles.createCssModule')){
			filesToCreate.push({
				extension: ".module.css",
				content: `.${componentNameSnakeCase}{

				}
				`,
			})
			stylesImport.push(`import style from './${componentName}.module.css'`)
		}


		let styles = stylesImport.join("\n")
		const dialect = configuration.get("dialect")
		
		switch(dialect){
			case "typescript":
				if(configuration.get('files.createMainFile')){
					filesToCreate.push({
						extension: ".tsx",
						content: `import React from "react"
						${styles}

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
						content:`
							import React from 'react';
							import ${componentName}, { I${componentName}Props } from '.';

							export default {
								title: 'Components/${componentName}',
								component: ${componentName},
							};


							export const Plain = (args : I${componentName}Props) => {
								return <${componentName} {...args}/>;
							}

							Plain.args = {
							}
						`,
					})
				}

				if(configuration.get('files.createFormik')){
					filesToCreate.push({
						extension: ".formik.tsx",
						content: `import React from "react"
						import { I${componentName}Props } from './${componentName}'

						export interface I${componentName}FormikProps extends I${componentName}Props{

						}

						export default function ${componentName}(props : I${componentName}FormikProps){
							return <div className='${componentNameSnakeCase}-formik'>
							
							</div>
						}
						`,
					})
				}

				
				break;
			case "javascript":
				if(configuration.get('files.createMainFile')){
					filesToCreate.push({
						extension: ".js",
						content: `import React from "react"
						${styles}

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
						content:`
							import React from 'react';
							import ${componentName} from '.';

							export default {
								title: 'Components/${componentName}',
								component: ${componentName},
							};


							export const Plain = args => {
								return <${componentName} {...args}/>;
							}

							Plain.args = {
							}
						`
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