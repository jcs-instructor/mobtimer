## Windows PC Setup

In VS Code, set your default terminal to Git Bash as follows (needed for "startAll" task to work on PC):
- Press CTRL + SHIFT + P to open the Command Palette.
- Search for “Terminal: Select Default Profile” (previously “Terminal: Select Default Shell”)
- Select “Git Bash”

## Start All Components

To start all components (frontend server, backend server, and api build):

In VS Code, 
- Press CTRL + SHIFT + P to open the Command Palette
- Search for "Tasks: Run Task"
- Search for "startAll" and select it

## Create Symbolic Links to API

To create the symbolic links to mobtimer-api, from the Terminal:

```
./link-mobtimer-api.sh
```


## See also

See additional CONTRIBUTING.md files 
- [Frontend]](./mobtimer-frontend/CONTRIBUTING.md)
- [Backend]](./mobtimer-backend/CONTRIBUTING.md)
- [API]](./mobtimer-api/CONTRIBUTING.md)
