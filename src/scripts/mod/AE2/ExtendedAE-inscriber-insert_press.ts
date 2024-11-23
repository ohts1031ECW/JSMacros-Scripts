import { showArray } from "../../../lib/dev";

const InscriberSlots: number[] = [44, 48, 52, 56];
const EXInscriber_ScreenName = "com.glodblock.github.extendedae.client.gui.GuiExInscriber"
const insertItem: string = "ae2:silicon_press"

Chat.log("Auto Insert press Enabled");

//openscreen event
const screen_event: IEventListener = JsMacros.on("OpenScreen", JavaWrapper.methodToJava((scr) => {

    if (scr.screenName === null || scr.screenName !== EXInscriber_ScreenName) return;

    //get player inventory
    const inventory: Inventory = Player.openInventory();

    //get inscriber slot position [0]
    const press_slot:number = inventory.findItem(insertItem)[0];

    Chat.log(press_slot)

    
    //repeat 4 times
    for(let count = 0;count<4;count++){
        inventory.click(press_slot);

        inventory.click(InscriberSlots[count])
    }
}))


//Chat.log(JsMacros.listeners("OpenContainer").toString())
event.stopListener = JavaWrapper.methodToJava(() => {
    Chat.log("Auto Insert press Disabled");
    JsMacros.off(screen_event);
})