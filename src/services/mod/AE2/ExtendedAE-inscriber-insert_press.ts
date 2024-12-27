const InscriberSlots: number[] = [40, 44, 48, 52];
const EXInscriber_ScreenName = "com.glodblock.github.extendedae.client.gui.GuiExInscriber";
const insertItem: string = 'megacells:accumulation_processor_press';
const Delay:number = 5;

Chat.log("Auto Insert press Enabled");

//openscreen event
const screen_event: IEventListener = JsMacros.on("OpenScreen", JavaWrapper.methodToJavaAsync(async(scr) => {

    if (scr.screenName === null || scr.screenName !== EXInscriber_ScreenName) return;

    //get player inventory
    const inventory: Inventory = Player.openInventory();

    //get inscriber slot position [0]
    const press_slot: number = inventory.findItem(insertItem)[0];


    //repeat 4 times
    for (let count = 0; count < 4; count++) {
        //get screen buttons
        const ScreenButtons = Hud.getOpenScreen()?.getButtonWidgets().toArray();

        //ignore undefined
        if (ScreenButtons?.length === undefined) return;

        //grab item only first time 
        if (count === 0) {

            //grab inscriber press
            inventory.click(press_slot);
        }

        //wait 1tick
        Client.waitTick(Delay);


        //put inscriber press
        inventory.click(InscriberSlots[count]);

        //next inscription job
        for (const ScreenButton of ScreenButtons) {
            if (ScreenButton.getLabel().getString() === "Next Inscription Job") {
                ScreenButton.click(true);
            }
        }
        Client.waitTick(Delay);
    }
    inventory.click(press_slot);
    //close screen
    Client.waitTick(Delay);
    scr.screen.close();
}))


//Chat.log(JsMacros.listeners("OpenContainer").toString())
event.stopListener = JavaWrapper.methodToJava(() => {
    Chat.log("Auto Insert press Disabled");
    JsMacros.off(screen_event);
})