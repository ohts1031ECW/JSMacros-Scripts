const WebHookURL: string = "https://discord.com/api/webhooks/1317320770078245007/5NrDV2rgQNRPuFeGyZeIfaBVY9cRY0kSh0KDZDOBQokHS5-hNcXC-scAw3VrptR0wHBN";

const WebHookRequest: HTTPRequest = Request.create(WebHookURL);
WebHookRequest.addHeader("Content-Type", "application/json");

const msgEvent = JsMacros.on("RecvMessage", JavaWrapper.methodToJava((data) => {
    const messagetype: string = data.messageType || "";

    const message:string = data.text?.getString() || "";

    if (messagetype === "System") return;

    const RequestBody = {
        "content": message,
    }

    //Chat.log(JSON.stringify(RequestBody))
    WebHookRequest.post(JSON.stringify(RequestBody));
}))

event.stopListener = JavaWrapper.methodToJava(() => {
    JsMacros.off(msgEvent)
})