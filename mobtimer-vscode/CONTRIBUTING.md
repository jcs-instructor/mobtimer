# Development

## Initial Setup

From the Terminal:

  ```
  git clone [this repository name here]
  cd [this repository name here]
  ```

## Start and Debug

To start and debug:

- If this component hasn't been started yet, then in the terminal, enter `yarn run watch`        
- Press F5 (i.e., Run > Debug)
- Enter VS Code command (ctrl-shift-P in Windows) to run the Hello World task 
  (you should then the mobtimer in the statusbar)

## Create an installer

### One Time
- `yarn global add @vscode/vsce`   

### Subsequent
1. From terminal in the mobtimer-vscode directory: 
```
cd <mobtimer-vscode directory>
vsce package
```
2. Find file mobtimer-vscode*.vsix. 
  - For Mac, I found it in Documents,then copied to Downloads
  - For PC, I found in in the current directory
3. To install in your vscode, from terminal: 

```
     cd <file location>
     code --install-extension mobtimer-vscode*.vsix
```
4. ?
5. To install in vscode on other machines, copy the vsix file to a directory, and then follow instructions in the previous step.

## Publish extension

For information on how to publish an extension, see https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce.

