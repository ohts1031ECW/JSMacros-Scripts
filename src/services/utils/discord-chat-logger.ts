const WebHookURL: string = "https://discord.com/api/webhooks/1317320770078245007/5NrDV2rgQNRPuFeGyZeIfaBVY9cRY0kSh0KDZDOBQokHS5-hNcXC-scAw3VrptR0wHBN";

const pattern = /^<[^>]+>\s*(.*)/;
const WebHookRequest: HTTPRequest = Request.create(WebHookURL);
WebHookRequest.addHeader("Content-Type", "application/json");

const msgEvent = JsMacros.on("RecvMessage", JavaWrapper.methodToJava((data) => {
    const messagetype: string = data.messageType || "";

    const message: string = data.text?.getString() || "";

    if (pattern.test(message)) { // 条件に一致する場合
        const RequestBody = {
            "content": message, // 元の文字列全体を使用
        };

        WebHookRequest.post(JSON.stringify(RequestBody));
    }

    //Chat.log(JSON.stringify(RequestBody))

}))

event.stopListener = JavaWrapper.methodToJava(() => {
    JsMacros.off(msgEvent)
})