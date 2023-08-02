Client imports mobtimerRequest from index.ts

index.ts (4 - client only uses 2, does not use type)
action.ts (1) - variable for action name

mobTimerRequests.ts (6 - client uses 4)

- MobTimerRequest definition (not used by client)
- type ResumeRequest
  - specifies action.Resume for action name
- function resumeRequest
  - specifies Action.Resume for return
  - as ResumeRequest ensures developer does not make a mistake

all the client needs to generate a request string to send to the server

mobSocketClient (2) - could be eliminated, it is sample code. resume() calls function with similar name and then sends it

- resume
  - MobTimerRequests.resume

backendSocket (2)

- case Action.Resume
  - mobtimer.resume()

Appendix: Tests

- mobTimer.test.ts - tests the mobTimer directly
- requestRepsonse.test.ts - tests the mobTimer wrapped in a request/response pair
- requestRepsonse.integration.test.ts - tests the mobTimer wrapped in a request/response pair, going through a real socket
- heartbeat.test.ts
- heartbeat.integration.test.ts
- App.test.ts
- controller.test.ts