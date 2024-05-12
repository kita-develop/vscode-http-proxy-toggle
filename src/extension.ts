// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const settings = vscode.workspace.getConfiguration('httpProxyToggle');
const home = settings.get('home') as string;
const office = settings.get('office') as string;

let currentProxy = vscode.workspace.getConfiguration('http').get<string>('proxy');
const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
statusBarItem.command = 'httpProxyToggle.toggle';

function updateStatusBar(currentProxy: string) {
    let currentStatus = 'Http Proxy: Office';
    if (currentProxy === ``) {
        currentStatus = 'Http Proxy: Home';
    }
    statusBarItem.text = currentStatus;
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

vscode.commands.registerCommand('httpProxyToggle.toggle', toggleProxy);

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {}
// This method is called when your extension is deactivated
export function deactivate() {}
