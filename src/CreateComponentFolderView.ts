import { window } from 'vscode';

export default  async function createComponentFolderView() : Promise<string | undefined> {
	const result = await window.showInputBox({
		placeHolder: 'MySuperCoolComponent',
        title: "Component Name",
		validateInput: text => {
            if(!text){
                return "Cannot be empty";
            }
            if(text.indexOf(' ') >= 0){
                return "No spaces allowed";
            }
            if(text.match(/^\d/)){
                return "Cannot start with number";
            }
            return null
		}
	});

    return result;
}