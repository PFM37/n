const { configExists, nconfig } = require("./run");
const fs = require("fs")
const child_process = require("child_process");

let c = child_process; // i did this because its simplerer to use child_process as c

function commit(args: string) {
    c.exec(`git add . && git commit -m "${args}"`); // yeah, just commits your work
}

function push(origin: string, branch?: string) {
    const fallbackBranches = ["main", "master"];
    const branc = branch || fallbackBranches.find(b => branchExists(b)) || "main";
    /*
    this checks if in cli a parameter for branch is provied but if it isn't it just uses main or master becuase thats just most common names for brnaches
    */

    if (configExists && JSON.parse(fs.readFileSync(nconfig)).push) {
        c.exec(`git push ${JSON.parse(fs.readFileSync(nconfig)).push}`, (err: any, stdout: any) => {
            if (err) {
            console.error(`Git push failed: ${err.message}`);
            /*
            "failure" 
                - Typical asian parents
            */
            return;
            }
        console.log(`Git push successful:\n${stdout}`);
        /*
        *Happy Happy dancing cat song plays*
        */
        });
        /* 
        this first checks if n.config.json has "push": "..."  but if it doesn't it just trys the eles staement
        */
    } else {
        c.exec(`git push ${origin} ${branc}`, (err: any, stdout: any) => {
            if (err) {
            console.error(`Git push failed: ${err.message}`);
            /*
            "failure" 
                - Typical asian parents
            */
            return;
            }
            console.log(`Git push successful:\n${stdout}`);
            /*
            *Happy Happy dancing cat song plays*
            */
        });
    }
}

// i don't need to explain this
function branchExists(branch: string): boolean {
  try {
    child_process.execSync(`git rev-parse --verify ${branch}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

export { push, commit, c }; // exports the fuck out of this file for ESM imports
exports = { push, commit, c }; // exports the fuck out of this file for commonjs imports