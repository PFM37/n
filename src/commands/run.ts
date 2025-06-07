const fs = require('fs');
const { c } = require("./commit")
const readline = require("readline");

const configExists = fs.existsSync('n.config.json'); // vely impatinet, no no, vely imertont valiable 1 
const nconfig = JSON.parse(fs.readFileSync('n.config.json', 'utf-8')); // vely imertont valiable 2

function run() {
    if (configExists 
        /*
        Who will be a sillyionare, is this statement true
        A: 10011110 10011100 
        B: 01011001 01000101 01010011
        C: 01001000 01100101 01101100 01101100 00100000 01011001 01100101 01100001 01101000 11110000 10011111 10100110 10000101 11110000 10011111 10100110 10000101 11110000 10011111 10100110 10000101 
        D: 01100110 01110101 01100011 01101011 00100000 01101110 01101111
        */
    ) {
        if (nconfig && nconfig.run) {
            console.log('> npm install'); // i am gonna install all the dependencies, so the code doesn't crash like your brain does wile coding
            c.exec('npm install', (err: any, stdout: any, stderr: any) => {
            if (err) {
                console.error('npm install failed:', err); // you're brain is probably gonna crash after trying to read the error message
                return; // go back to your time, adopted kitler
            }
            console.log('npm install completed'); // don't shout italian brainrot after this, this isn'y like you won world cup

            console.log(`> ${nconfig.run}`);
            c.exec(nconfig.run, (runErr: any, out: any, runStderr: any) => {
                if (runErr) {
                console.error('Run command failed:', runErr); // Yeah another error to crash your brain and think you're a failure
                return;
                }
                console.log('Run command completed:\n', out); // Hell yeah
            });
            });
        }
    } else {
        console.error('n.config.json not found.'); // guess why? Because it wasn't fucking created. Ok you're a fucking piece of shit anyways and you probably doesn't know the full form of json so let me create it for you
        createN();
    }
}

async function createN() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // initializes realine and store it to rl variable

    const ask = (prompt: string): Promise<string> => {
        return new Promise(resolve => rl.question(prompt, (answer: string) => resolve(answer.trim())));
    };

    // asks a question to your ass

    try {
        // try once and never again(this joke is about you)
        const run = await ask('Enter the run command: ');

        const content = {
            run
        }

        fs.writeFileSync('n.config.json', JSON.stringify(content, null, 2));
    } catch (err) {
        throw err;
    } finally {
        rl.close();
    }
}

export { configExists, createN, run, nconfig }
exports = { configExists, createN, run, nconfig }