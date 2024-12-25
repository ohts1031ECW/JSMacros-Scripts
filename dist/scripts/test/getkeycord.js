"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const name = "ToggleScript";
const enabled = GlobalVars.toggleBoolean(name);
Chat.log(Chat.createTextBuilder()
    .append("[").withColor(0x7)
    .append(name).withColor(0x5)
    .append("] ").withColor(0x7)
    .append(enabled ? "enabled" : "disabled").withColor(0xc)
    .build());
while (GlobalVars.getBoolean(name)) {
    Chat.log(KeyBind.getPressedKeys().toString());
    Client.waitTick(20); // wait 1 second (synchronized to client ticks)
}
