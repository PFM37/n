const { configExists, nconfigPath, nconfig, c, child_process, ask, rl } = require("../global");
const fs = require("fs");
const path = require("path");

function removeGitLockIfExists(repoPath: string) {
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

  // Save to config if new
  if (!nconfig.commit || nconfig.commit !== sanitized) {
    const raw = fs.readFileSync(nconfigPath, "utf-8");
    const data = JSON.parse(raw);
    data.commit = sanitized;
    fs.writeFileSync(nconfigPath, JSON.stringify(data, null, 2));
  }

  console.log("> git add .");
  c.exec("git add .", (err1: any) => {
    if (err1) return console.error("Add error:", err1);

    console.log(`> git commit -m "${sanitized}"`);
    c.exec(`git commit -m "${sanitized}"`, (err2: any, stdout2: any, stderr2: any) => {
      if (err2) return console.error("Commit error:", err2);
      if (stdout2) process.stdout.write(stdout2);
      if (stderr2) process.stderr.write(stderr2);

      if (rl && rl.close) rl.close();
      process.exit(0);
    });
  });
}

function push(origin: any, branch: any) {
  const fallbackBranches = ["main", "master"];
  const targetBranch = branch || fallbackBranches.find(b => branchExists(b)) || "main";
  const remote = origin || "origin";

  const pushCmd = configExists && nconfig.push
    ? `git push ${nconfig.push}`
    : `git push ${remote} ${targetBranch}`;

  console.log("> " + pushCmd);
  c.exec(pushCmd, (err: any, stdout: any, stderr: any) => {
    if (err) return console.error("Git push failed:", err.message);
    if (stdout) process.stdout.write(stdout);
    if (stderr) process.stderr.write(stderr);
    process.exit()
  });
}

function branchExists(branch: any) {
  try {
    child_process.execSync(`git rev-parse --verify ${branch}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

module.exports = { push, commit, branchExists };
export { push, commit, branchExists }