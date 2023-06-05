Resource for retro: https://docs.google.com/document/d/1EKo20gHXQsAFqiAw56kNISPx170u0RLXiXBNqulV4Rg/edit#

**Start of Session**
Joel:

- Start TTS meeting timer
- Enable participant screen sharing in Zoom

Joel & Ethan:

- Open our depoloyed web timer https://mobtimer-frontend-iwa7.onrender.com (or if that's not working, try: https://mobti.me/arrested-egg or http://mobtimer.zoeetrope.com/)
  - turn on Sounds
  - add "Stand/Stretch" to names and/or role descriptions (e.g., "Navigator (STAND)")
  - optional: Browser notifications
- Open VS Code
  - git pull
  - run task "mobtimer step 3 - start watch" 
    - if get compilation or runtime errors, consider running task "mobtimer all steps"
  - verify tests are working
  - synchronize extension timer (stop, start, stop)
- Read "Practices to Focus On" section below!!!!!!!!!!!!!!!!!!!!!!!

Ethan:

- Snack
- Glasses

**End of Session**

- Retro: https://docs.google.com/document/d/1EKo20gHXQsAFqiAw56kNISPx170u0RLXiXBNqulV4Rg/edit#

**Facilitator (and First Navigator When Timer Doesn't Remember)**:
...
5/17/2023 - Joel

**Warning**:

- Make sure to run tests manually frequently! (since we turned off gated checkins and are making ui changes)

**Practices to Focus On (always have 1 or 2 items here)**:

- Do one thing at a time and then commit
- Always review between-sesssion changes at start of next session (& notify when making these changes)

**Other Practices**:

- While waiting for long activities (e.g., deploy), consider activities can do while waiting.
- Try documenting in parallel with doing (e.g., having Ethan make changes to CONTRIBUTING.md, while Joel is deploying).
- Rotate who facilitates session startups & retros
- List accomplishments/what happened in retros
- When entering commands from Terminal, write script first (so have a record of steps needed / makes environment changes repeatable)
- Snack for Ethan
- **Strict navigator style**
- **If confused as driver, ask questions rather than suggesting alternatives**
- **Consider working in parallel**
- **Full TDD w/explicit "Refactor" convo & impl. every time, including:**
  - No `any` types
  - Refactor redundant code
  - Encapsulate & information hide
  - Consistent level of abstraction
  - Consistent names & naming conventions (e.g., underscore for private fields, capitalization, etc.)
  - Avoid tech debt
  - If no state (i.e, only one instance) use function, not class
  - ... (add more as we go)
- **Retro at end of each 2-hour session (so can impl. immediately rather than wait a week)**
- **Phrases**:
  - "Got it" (ELMO) [Joel-not sure if this is working that well... 6/29/22]
  - "Hold on" (Navigator wants floor)
- **Remember to give credit to co-author**:
  `Co-authored-by: Ethan Strominger <ethanstrominger2@gmail.com>`
  `Co-authored-by: Joel Silberman <42779942+jcs-instructor@users.noreply.github.com>`

---

**Practices to Try**:

- **5/25/2022:** Each person gets approx. 1 hour to be the leader on what we work on

---

**Established Practices**:

- **Terminology**
  - VSCode Bar
  - Inline icons
  - Code Tab
  - Browser Tab
  - Left code pane, right code pane
- **Always verbalize intent**: Navigator verbalize your intent (why) before directing, when coding or exploring code
- **Avoid rabbit holes**: When exploring and mob timer elapses, reevaluate if going down a productive path
- **Scribe**: If desired, in retro, request that talker and scribe should be separate people
- **Commit frequently on feature branch**

**Cool Things to Use**:

- Outline feature in VS Code

**Appendix**:

- Consider other approaches to 100% pairing
- Consider time limits on tasks we’re working on
- Use Zoom chat (or write on paper) when we have ideas we want to get out of our head but don't necessarily need to be discussed right then.
