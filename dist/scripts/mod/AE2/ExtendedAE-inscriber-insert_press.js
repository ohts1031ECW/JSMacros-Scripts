"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InscriberSlots = [44, 48, 52, 56];
const EXInscriber_ScreenName = "com.glodblock.github.extendedae.client.gui.GuiExInscriber";
const insertItem = "ae2:silicon_press";
Chat.log("Auto Insert press Enabled");
//openscreen event
const screen_event = JsMacros.on("OpenScreen", JavaWrapper.methodToJava((scr) => {
    if (scr.screenName === null || scr.screenName !== EXInscriber_ScreenName)
        return;
    //get player inventory
    const inventory = Player.openInventory();
    //get inscriber slot position [0]
    const press_slot = inventory.findItem(insertItem)[0];
    Chat.log(press_slot);
    //repeat 4 times
    for (let count = 0; count < 4; count++) {
        inventory.click(press_slot);
        inventory.click(InscriberSlots[count]);
    }
}));
//Chat.log(JsMacros.listeners("OpenContainer").toString())
event.stopListener = JavaWrapper.methodToJava(() => {
    Chat.log("Auto Insert press Disabled");
    JsMacros.off(screen_event);
});
