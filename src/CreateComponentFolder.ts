import { window } from 'vscode';

export interface ICreateComponentFolderDTO {
    componentName:string,
    path: string,
}

 export default async function CreateComponentFolder(data : ICreateComponentFolderDTO) {
	// const result = await window.showInputBox({
	// 	value: 'abcdef',
	// 	valueSelection: [2, 4],
	// 	placeHolder: 'MySuperCoolComponent',
    //     title: "Component Name",
	// 	validateInput: text => {
    //         if(text.indexOf(' ') >= 0) return "No spaces allowed"
    //         if(text.match(/^\d/)) return "Cannot start with number"
    //         return null
	// 		//window.showInformationMessage(`Validating: ${text}`);
	// 		//return text === '123' ? 'Not 123!' : null;

	// 	}
	// });
	// window.showInformationMessage(`Got: ${result}`);
}