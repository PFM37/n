const fs = require("fs")
const readline = require("readline")

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

    // initializes realine and store it to rl variable

let ask = (prompt: string): Promise<string> => {
    return new Promise(resolve => rl.question(prompt, (answer: string) => resolve(answer.trim())));
};

async function init() {
    

    // asks a question to your ass

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
    }
}

module.exports = { init, ask, rl }
export { init, ask, rl }