const fs = require("fs")
const { rl, ask } = require("../global")

async function init() {
    try {
        // try once and never again(this joke is about you)
        const build = await ask('Enter the build command: ');
        let main = JSON.parse(fs.readFileSync("ppm.json", "utf-8")).main
        let test = await ask(`Enter the test command (node ${main}): `)
        if (test === "") {
            test = `node ${main}`;
        }

        const content = {
            build,
            test,
            custom: {},
        }

        fs.writeFileSync('n.config.json', JSON.stringify(content, null, 2));
    } catch (err) {
        throw err;
    } finally {
        rl.close();
        process.exit()
    }
}

module.exports = { init, ask }
export { init, ask }