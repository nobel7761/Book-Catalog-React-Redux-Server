"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
async function main() {
    try {
        await mongoose_1.default.connect(index_1.default.database_url);
        console.log("Database Connected Successfully");
        app_1.default.listen(index_1.default.port, () => {
            console.log(`Application listening on port ${index_1.default.port}`);
        });
    }
    catch (error) {
        console.log("Failed to connect database", error);
    }
}
main();
