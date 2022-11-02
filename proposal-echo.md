In our tests, we need to wait for the response to the last request we send before making test assertions.

Current method: Store the id of the last request, and then wait for a reponse with the same id.

Instead of that, do the following (proposal):
- Send the server an echo request (type EchoRequest)
- Wait for the echo response
- Take the 2nd to last response (since the last one is not needed, i.e., echo response)