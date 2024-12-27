//@ts-nocheck
// 必要なJavaクラスをインポート
const Modules = Java.type("meteordevelopment.meteorclient.systems.modules.Modules");

// Blinkモジュールの名前
const moduleName = "Blink"; // Blinkモジュールの名前

try {
    // モジュールマネージャーから指定されたモジュールを取得
    const module = Modules.get().get(moduleName);
    if (!module) {
        Chat.log(`モジュール "${moduleName}" が見つかりません`);
    } else {
        // モジュールの有効/無効状態を切り替える
        const isActive = module.isActive();
        module.toggle();

        // 状態を通知
        Chat.log(`モジュール "${moduleName}" を ${isActive ? "無効" : "有効"} にしました`);
    }
} catch (e) {
    // エラー処理
    Chat.log(`エラーが発生しました: ${e}`);
}
