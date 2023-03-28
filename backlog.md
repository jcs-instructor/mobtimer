# Backlog

See also: [Reminders](./reminders.md), [Epics](./epics.md), and [Completed](./completed.md)

Improve Later

- [ ] Low priority. Ethan after hours:
  - [ ] 2nd crack on start scripts, think about class vs function
  - [ ] In tasks.json, reorder tasks by order of execution
- [ ] Ethan - between sessions:
  - [ ] Upgrade to new version of nodemon (current ver. 2.0.19, latest ver. 2.0.20)
- [ ] Delete old unused branches

Next

- Deploy to render.com
  - [ ] WIP: Deploy to render.com (fix error)
    - [ ] Is there a way for it to make a sound and/or other notification when done?
  - [x] Copy mobtimerclient to mobtimer-frontend and change references
  - [ ] Clean up warnings
  - [x] Set REACT_APP_WEBSOCKET_URL to something like: wss://final1-u56m.onrender.com
  - [ ] Verify working
  - [ ] Try BrowserRouter
  - [ ] We currently have it https://mobtimer-backend-pj2v.onrender.com, and modified the environment variable, but haven't been able to test yet in Postman;
    and in the deployed UI, it is still trying to access the localhost backend even though we set the environment variable to go to
    [CONTRIBUTING](./mobtimer-backend/CONTRIBUTING.md)
  - [ ] Update CONTRIBUTING.md
  - [ ] Review duplicated code mobSocketClient (and dependency on websocket) and see "rethink mobtimer-api" in [Epics](./epics.md) for this
- [ ] Review [Epics](./epics.md), and migrate into GitHub Issues?
- [ ] Cleanup
  - [ ] Remove unused elements from App.css, i.e., all starting with ".App"
  - [ ] Delete unused files:
    - [ ] home.html
    - [ ] app.yaml
