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

## GitHub Pages Deployment

### One-time setup
- Clone or fork this repo (e.g., jcs-instructor/mobtimer)
- In the terminal, enter:
    ```
    cd mobtimer-frontend/
    npm run deploy
    ```
- In the GitHub repo from the prior step, go to Settings, then Pages, and select the Branch: gh-pages,
  and click Save (to the right of it)
- Create a repo called <username>.github.io (e.g., jcs-instructor.github.io)
- View in web browser - note: it might take a few minutes to be available

### Subsequent deployments
- In the terminal, enter:
    ```
    cd mobtimer-frontend/
    npm run deploy
    ```