const { init } = require("./commands/init");
const { build } = require("./commands/build");
const { commit, push } = require("./commands/commit");
const { test } = require("./commands/test");
const { add } = require("./commands/add");
const { run } = require("./commands/run")

const [, , command, ...args] = process.argv;

switch (command) {
  case "build":
  case ".":
    build();
    break;

  case "commit":
    commit(args);
    break;

  case "push":
    if (args[0] && args[1]) {
      push(args[0], args[1]); // push <remote> <branch>
    } else {
      console.log("Usage: push <remote> <branch>");
    }
    break;

  case "test":
    test();
    break;

  case "init":
    init();
    break;

  case "add":
    add();
    break;
  case "run": 
    run(args[0]);
    break;

  default:
    console.log(`Unknown command

Available commands:
  init    → Initializes a new 'n' project
  build   → Builds the project, add its full command to n.config.json to run
  commit  → Commits the project (uses message from args) you can add it to n.config.json
  push    → Pushes to Git repo (usage: push <remote> <branch>) or you can add it to n.config.json
  test    → Builds test files
  add     → Adds custom commands to run

Tip: Set values in 'n.config.json' to auto-fill commit & push args.`);
    process.exit()
}