const { nconfig, configExists, ask, rl } = require("../global");
const { init } = require("./init");
import * as fs from 'fs';

async function add() {
    if (configExists) {
        const newScript = await ask("what should it be named?: ")
        const newScriptValue = await ask("what should it do?(commands only): ")
        // Use the script name as the file path directly
        nconfig.custom[newScript] = newScriptValue;
        fs.writeFileSync("n.config.json", JSON.stringify(nconfig, null, 2));
        process.exit()
    }
    else {
        console.log("Looks like n.config.json doesn't exist")
        const yorn = await ask("Would you like to create it?(y/n): ")
        if (yorn == "y") {
            init()
            process.exit()
        }
        else {
            rl.close()
            process.exit()
        }
    }
}

module.exports = { add }
export { add }