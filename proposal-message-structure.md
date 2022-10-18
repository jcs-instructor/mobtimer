# Current request from client:

id: string;

**Option 1:**
action: Join
mobName: string

**Option 2:**
action: Start | Pause | Resume

**Option 3:**
action: Update
value: { durationMinutes?: number };

# Current response from server:

{ id: string,
actionInfo: { action: Start | Pause | Resume | Expired | InvalidRequestError,
mobState: {
mobName: string;
status: Status;
durationMinutes: number;
secondsRemaining: number;
}

# Proposal for both:

Add data element, send all of data back
{ data:
{ roles: [string],
defaultRole: string,
members: [string],
**new features**
breakTimers: [Timer],
groupMessage: [string],
reminders: [string],
}
}
