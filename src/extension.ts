// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const settings = vscode.workspace.getConfiguration('httpProxyToggle');
let home = settings.get('home') as string;
let office = settings.get('office') as string;

let currentProxy = vscode.workspace.getConfiguration('http').get<string>('proxy');
const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
statusBarItem.command = 'httpProxyToggle.toggle';

function updateStatusBar(currentProxy: string) {
    let currentStatus = '$(briefcase)'; // Office用のアイコン
    let hoverText = 'Http Proxy: Office'; // Office用のホバーテキスト

    if (currentProxy === home) {
        currentStatus = '$(home)'; // Home用のアイコン
        hoverText = 'Http Proxy: Home'; // Home用のホバーテキスト
    }

    statusBarItem.text = currentStatus;
    statusBarItem.tooltip = hoverText + '[' + currentProxy + ']'; // ホバーテキストを設定
    statusBarItem.show();
}

function toggleProxy() {
    currentProxy = vscode.workspace.getConfiguration('http').get<string>('proxy');
    if (currentProxy === home) {
        currentProxy = office;
    } else {
        currentProxy = home;
    }
    vscode.workspace.getConfiguration('http').update('proxy', currentProxy, vscode.ConfigurationTarget.Global);
    updateStatusBar(currentProxy as string);
}

updateStatusBar(currentProxy as string);

vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('httpProxyToggle.home')) {
        home = vscode.workspace.getConfiguration().get('httpProxyToggle.home') ?? '';
        updateStatusBar(currentProxy as string);
    }
    else if (event.affectsConfiguration('httpProxyToggle.office')) {
        office = vscode.workspace.getConfiguration().get('httpProxyToggle.office') ?? '';
        updateStatusBar(currentProxy as string);
    }
});

vscode.commands.registerCommand('httpProxyToggle.toggle', toggleProxy);

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {}
// This method is called when your extension is deactivated
export function deactivate() {}
