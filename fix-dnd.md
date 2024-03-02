- [x] Move code that calls getItems to useEffect
- [x] Modify getItems to take participants as an argument and iterate over participants, as we did previously
- [x] Pass setParticipants from App to Room to ParticipantsDND
- [x] Where setState is called, create a string array out of items array and call setParticipants
- [x] You should now see the correct values first time in and when you reorder the original participants 

Next steps:
- [x] Dedupe:
    - Modify Participants section by copying ParticipantsDND or by editing to have drag and drop
    - Remove ParticipantsDND
- [x] Fix formatting
    - [x] Keep Nav/Driver to the right when dragging participant
    - [x] When drag, make clear where can drop
    - [x] Keep participant cell height fixed (don't word wrap)
- Participant controls
    - [x] Delete participant button
    - [ ] WIP: Not have Delete Participant button float to left when dragging. Ask GPT how to to do this and keep the alignment of participant + delete button + role. (Optionally ask GPT how to keep the heights the same. Consider having a separate React component containing all the controls associated with a participant name, e.g., the name, the edit button, delete button, etc., so they can all be moved together.)
    - [] Edit participant name 
        - [] Add button to enter edit mode (✏️)
    - [] Consider adding a confirmation (OK/Cancel) when deleting a participant. (We'll probably have similar confirmation for editing a participant's name.)    
    - [] Move participant up/down buttons (⬆️⬇️)
    - [] Texture indicating draggability (≡)
    - [] Randomize icon isn't working on Ethan's Mac; consider a different one, e.g., "⇅"
    - [] Get rid of Edit Participants control on bottom of form once it's redundant, i.e., once we have the edit (✏️), reorder/drag, and delete (❌) functionality done within the participants list
- [ ] Styling
    - distance between participants and roles
    - increase distance between rows
- TIPS: 
    1. ASK GPT !!!!! 
    2. Keep browser side-by-side with VSCode so can immediately see UI changes as we work !!!!
    3. Try rotating nav/driv roles again - even Ethan driving the whole time...    
