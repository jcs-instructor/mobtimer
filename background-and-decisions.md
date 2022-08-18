- Decision: Split Repos before deploy.

  - It’s simplest to start with everything in the same repo, but later we should split them because:
    - It’s easier to deploy
    - Common pattern (maybe best practice)
    - You can pick the app you deploy (e.g., Heroku for backend; may use something else for frontend)

- TBD: Consider using existing backend code by packing into npmjs package or submodule and splitting into 3 repositories. See background and decisons. 3 repositories would be:
  - client socket code. Create npmjs or make a submodule.
  - server socket code. Uses client socket code for testing only.
  - (1) server socket code and (2) frontend which both use (3) client socket code. Server socket code uses client socket code only for tests.
