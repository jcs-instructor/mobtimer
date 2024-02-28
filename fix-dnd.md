- [x] Move code that calls getItems to useEffect
- [x] Modify getItems to take participants as an argument and iterate over participants, as we did previously
- [x] Pass setParticipants from App to Room to ParticipantsDND
- [x] Where setState is called, create a string array out of items array and call setParticipants
- [x] You should now see the correct values first time in and when you reorder the original participants 

Next steps:
- [x] Dedupe:
    - Modify Participants section by copying ParticipantsDND or by editing to have drag and drop
    - Remove ParticipantsDND
- [] Fix formatting
    - [x] Keep Nav/Driver to the right when dragging participant
    - [x] When drag, make clear where can drop
    - [x] Keep participant cell height fixed (don't word wrap)
- [] Edit participant name
so can get rid of Edit Participants control on bottom of form (TIPS: 
    1. ASK GPT !!!!! 
    2. Keep browser side-by-side with VSCode so can immediately see UI changes as we work !!!!)
- [] Add Move Up and Move Down icon to each participant?

