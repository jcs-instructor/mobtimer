- [x] Set status in frontend mobtimer when get message (already set secondsRemaining); change setSecondsRemaining to setState in MobTimer: to make more parallel with the public get state property in the MobTimer
- [x] When get a message, restart the Timer.tsx interval
- [x] Possible refactor:
  - [x] Rename frontend mobTimer variable as frontendMobTimer
  - [x] Remove MobTimer.resume() and just use .start()
  - [x] Rename \_whenStartedInSeconds as \_whenLastStartedInSeconds
- [x] Deduplicate 2 copies of MobTimer (newest should be in frontend) & move MobTimer class to mobtimer-api (shared)
- [x] Change Timer.tsx to use MobTimer to fix 0:0 issue etc. (should be 00:00)
- [x] Move timer from App.tsx to Room.tsx