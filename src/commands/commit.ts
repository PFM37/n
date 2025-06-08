const { configExists, nconfigPath, nconfig } = require("../global");
const fs = require("fs");
const path = require("path");
const { ask, rl } = require("./init");
const { c, child_process } = require("../global");

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

function commit(args = []) {
  removeGitLockIfExists(process.cwd());

  let commitMessage: string = args[0] || nconfig.commit;
  if (!commitMessage) {
    commitMessage = ask("Please provide a commit message: ");
  }

  const sanitized = commitMessage.replace(/^["'`]|["'`]$/g, "");

  // Save the commit message to config if it's new
  if (!nconfig.commit || nconfig.commit !== sanitized) {
    const raw = fs.readFileSync(nconfigPath, "utf-8");
    const data = JSON.parse(raw);
    data.commit = sanitized;
    fs.writeFileSync(nconfigPath, JSON.stringify(data, null, 2));
  }

  console.log("> git add .");
  c.exec("git add .", (err1: any) => {
    if (err1) return console.log("Add error:", err1);

    console.log(`> git commit -m "${sanitized}"`);
    c.exec(`git commit -m "${sanitized}"`, (err2: any, out2: any) => {
      if (err2) return console.log("Commit error:", err2);
      console.log(out2);
    });
  });
  rl.close()
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

export { push, commit, c, branchExists };
module.exports = { push, commit, c, branchExists };