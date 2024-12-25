"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MeteorJarFilePath = "C:/Users/ohts1031ECW/AppData/Roaming/PrismLauncher/instances/vanila1.21/.minecraft/mods/meteor-client-0.5.8.jar";
const meteor = "meteordevelopment.meteorclient";
const Classes = [
    "meteordevelopment.meteorclient.MeteorClient",
    "meteordevelopment.meteorclient.addons.MeteorAddon",
    "meteordevelopment.meteorclient.systems.commands.Commands",
    "meteordevelopment.meteorclient.systems.modules.Category",
    "meteordevelopment.meteorclient.systems.modules.Modules",
    "meteordevelopment.meteorclient.systems.modules.render.hud.HUD"
];
Chat.log(Reflection.loadJarFile(MeteorJarFilePath));
//Chat.log(Reflection.getClass(meteor));
for (const ClassData of Classes) {
    try {
        const temp = Reflection.loadMappingHelper(MeteorJarFilePath).getClass(ClassData);
        Chat.log("Found: " + ClassData);
        Chat.log("Result: \n" + temp);
    }
    catch (error) {
        //Chat.log("Error: \n" + error)
    }
}
