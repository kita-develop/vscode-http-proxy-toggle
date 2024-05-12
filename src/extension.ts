// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let proxySetting1 = vscode.workspace.getConfiguration('http').get<string>('proxy');
    let proxySetting2 = 'http://proxy.example.com:80/'; // ここに2つ目のプロキシ設定を記述

    let currentProxy = proxySetting1;

    context.subscriptions.push(vscode.commands.registerCommand('http-proxy-toggle.toggleProxy', () => {
        if (currentProxy === ``) {
            currentProxy = proxySetting2;
        } else {
            currentProxy = ``;
        }
        vscode.workspace.getConfiguration('http').update('proxy', currentProxy, vscode.ConfigurationTarget.Global);
    }));
}
// This method is called when your extension is deactivated
export function deactivate() {}
