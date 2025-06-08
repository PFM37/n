const { configExists, nconfigPath, nconfig } = require("../global");
const fs = require("fs");
const { ask } = require("./init");
const { c, child_process } = require("../global");
const path = require("path");

function commit(args = []) {
  removeGitLockIfExists(process.cwd());
  const commitArg = args[0];

  const commitMessage: string = commitArg || String(ask("Please provide a commit message: "));
  const sanitized = commitMessage.replace(/^["'`]|["'`]$/g, "");

  if (configExists && nconfig.commit) {
    console.log("> git add .");
    c.exec("git add .", (err1: any) => {
      if (err1) return console.log("Add error:", err1);

      console.log(`> git commit -m "${nconfig.commit}"`);
      c.exec(`git commit -m "${nconfig.commit}"`, (err2: any, out2: any) => {
        if (err2) return console.log("Commit error:", err2);
        console.log(out2);
      });
    });
    return;
  }

  // Save the commit message to config
  const raw = fs.readFileSync(nconfigPath, "utf-8");
  const data = JSON.parse(raw);
  data.commit = sanitized;
  fs.writeFileSync(nconfigPath, JSON.stringify(data, null, 2));

  console.log("> git add .");
  c.exec("git add .", (err1: any) => {
    if (err1) return console.log("Add error:", err1);

    console.log(`> git commit -m "${sanitized}"`);
    c.exec(`git commit -m "${sanitized}"`, (err2: any, out2: any) => {
      if (err2) return console.log("Commit error:", err2);
      console.log(out2);
    });
  });
}

function push(origin: any, branch: any) {
  const fallbackBranches = ["main", "master"];
  const branc = branch || fallbackBranches.find(b => branchExists(b)) || "main";

  if (configExists && nconfig.push) {
    c.exec(`git push ${nconfig.push}`, (err: any, stdout: any) => {
      if (err) return console.error(`Git push failed: ${err.message}`);
      console.log(`Git push successful:\n${stdout}`);
    });
  } else {
    c.exec(`git push ${origin} ${branc}`, (err: any, stdout: any) => {
      if (err) return console.error(`Git push failed: ${err.message}`);
      console.log(`Git push successful:\n${stdout}`);
    });
  }
}

function branchExists(branch: any) {
  try {
    child_process.execSync(`git rev-parse --verify ${branch}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function removeGitLockIfExists(repoPath: any) {
  const lockPath = path.join(repoPath, ".git", "index.lock");
  if (fs.existsSync(lockPath)) {
    try {
      fs.unlinkSync(lockPath);
      console.log("Removed stale .git/index.lock file");
    } catch (e: any) {
      console.error("Failed to remove .git/index.lock:", e.message);
    }
  }
}

export { push, commit, c };
module.exports = { push, commit, c };