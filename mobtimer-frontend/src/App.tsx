import React, { useState } from 'react';
import JoinMobForm from './components/JoinMobForm';
import JoinMobHeading from './components/JoinMobHeading';
import { MobSocketClient } from 'mobtimer-api';
import { waitForSocketState } from 'mobtimer-api';
import './App.css';
import ActionButton from './components/ActionButton';
// import { createController } from './createController';
import { MobTimerResponses } from 'mobtimer-api';
import { Status } from 'mobtimer-api';
// todo: unhardcode port
const port = 4000;
const url = `ws://localhost:${port}`;
const client = MobSocketClient.openSocketSync(url);

const App = () => {
  const [mobName, setMobName] = useState('');
  const [label, setLabel] = useState('Start');
  const [status, setStatus] = useState(Status.Ready);
  // const [client, setClient] = useState({} as MobSocketClient);


  const submitJoinMobRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();

    // Join mob
    console.log('joined', client);
    client.webSocket.onmessage = (message) => {
      // createController(message, setLabel, nextAction, client);
      const response = JSON.parse(message.data) as MobTimerResponses.SuccessfulResponse;
      console.log('status', response.mobState.status, response);
      switch (response.mobState.status) {
        case Status.Running: {
          setLabel("Pause");
          break;
        }
        case Status.Paused: {
          setLabel("Resume");
          break;
        }
        case Status.Ready: {
          setLabel("Start");
        }
      };
      setStatus(response.mobState.status);

    };
    await waitForSocketState(client.webSocket, WebSocket.OPEN);
    client.joinMob(mobName);
  }

  const submitAction = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    console.log('submitAction', client);
    switch (status) {
      case Status.Running: {
        client.pause()
        break;
      }
      case Status.Paused: {
        client.resume();
        break;
      }
      case Status.Ready: {
        client.start();
      }
    };
  }


  return (
    <div>
      <JoinMobHeading />
      <JoinMobForm mobName={mobName} setMobName={setMobName} submitJoinMobRequest={submitJoinMobRequest} />
      <ActionButton label={label} submitAction={submitAction} />
    </div>
  );
};

export default App;


