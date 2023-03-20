timers.ts - no changes, defines mobTimer

App.tsx

const App = {
[duration,setDuration]= useState([])
Controller.setDuration = setDuration
Route <Room {duration: frontendMobtimer.duration, ...}>
}

Controller.ts

static set duration(duration) {
frontendMobtimer.duration = duration;
Controller.setDuration(duration);
}

Room.tsx
<Duration {duration}>

Duration.tsx
{ code to display duration }
when user changes duration, call Controller.setDuration
