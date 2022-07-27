function msg() {
    alert("Hello");
}

function joinMob() {
    const client = await openSocket();
    await client.joinMob(_mobName1);
    await client.closeSocket();
    expect(client.lastResponse.mobState).toEqual(new MobTimer(_mobName1).state);
    expect(client.lastResponse.actionInfo.action).toEqual(Action.Join);
}