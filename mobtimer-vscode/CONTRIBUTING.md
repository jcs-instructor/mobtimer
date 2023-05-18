# Development

## Initial Setup

From the Terminal:

  ```
  git clone [this repository name here]
  cd [this repository name here]
  ```

## Start and Debug

To start and debug:

- In the terminal, enter 
  `yarn run watch`        
- Press F5 (i.e., Run > Debug)

## Create an installer

### One Time
1. `npm install -g @vscode/vsce` OR `yarn global add -g @vscode/vsce`

### Subsequent
1. From terminal in top directory for the project: `vsce package`
2. Find file mobtimer-vscode.vsix.  For Mac, I found it in Documents,then copied to Downloads
3. To install in your vscode, from terminal: 

```
     cd <file location>
     code --install-extension mobtimer-vscode.vsix
```
4. To install in vscode on other machines, copy the vsix file to a directory, and then follow instructions in the previous step.

## Publish extension

For information on how to publish an extension, see https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce.

