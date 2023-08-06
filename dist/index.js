"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
async function run() {
    try {
        const text = core.getInput("text");
        const regex = core.getInput("regex");
        const flags = core.getInput("flags");
        const re = new RegExp(regex, flags);
        const result = re.exec(text);
        if (result) {
            for (const [index, x] of result.entries()) {
                if (index === 10) {
                    return;
                }
                if (index === 0) {
                    core.setOutput("match", x);
                    continue;
                }
                core.setOutput(`group${index}`, x);
            }
        }
    }
    catch (error) {
        core.error(error);
        core.setFailed(error.message);
    }
}
run();
