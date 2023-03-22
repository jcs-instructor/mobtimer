## Initial Setup

From the Terminal:

```
git clone [this repository name here]
cd [this repository name here]
yarn
```

## Start Frontend Server

If running from a single repository, see CONTRIBUTING.md in the top level directory to start all components (frontend server, backend server, and api build)

To start the Frontend Server only, from the Terminal:

```
cd mobtimer-frontend
./start.sh
```

## Refresh node_modules, rerun yarn

For some issues, you may want to delete node_modules and run yarn again. After yarn is done, you will need to relink the mobtimer-api directory. Follow these directions to do both steps:

```
../scripts/clean.sh mobtimer-frontend
```
