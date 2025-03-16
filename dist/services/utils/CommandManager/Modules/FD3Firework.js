"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
exports.command = {
    name: "AutoCraftFD3Firework",
    args: {
        "delay": {
            type: "int",
            suggest: (ctx, builder) => {
                builder.suggest(2);
            }
        },
        "resultpickdelay": {
            type: "int",
            suggest: (ctx, builder) => {
                builder.suggest(5);
            }
        }
    },
    execute: async (Args) => {
        const delay = Args.delay;
        const resultpick_delay = Args.resultpickdelay;
        const inventory = Player.openInventory();
        inventory.openGui();
        const paper = inventory.findItem("minecraft:paper");
        for (const paper_slot of paper) {
            const gunpowder = inventory.findItem("minecraft:gunpowder");
            if (gunpowder.length >= 3) {
                for (let count = 0; count < 3; count++) {
                    inventory.click(gunpowder[count]);
                    Client.waitTick(delay);
                    inventory.click(count + 1);
                }
                inventory.click(paper_slot);
                Client.waitTick(delay);
                inventory.click(4);
                //pick result item
                Client.waitTick(resultpick_delay);
                inventory.quick(0);
                Client.waitTick(resultpick_delay);
            }
            else {
                Chat.log("Not enough gunpowders to craft.");
                break;
            }
        }
        Chat.log("Firework craft finished.");
    }
};
