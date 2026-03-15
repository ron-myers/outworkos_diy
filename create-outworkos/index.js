#!/usr/bin/env node

const { execSync, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const REPO = "https://github.com/MattVOLTA/outworkos_diy.git";

// ── Colors ──────────────────────────────────────────────────
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const amber = (s) => `\x1b[33m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;

// ── Helpers ─────────────────────────────────────────────────
function fail(msg) {
  console.error(`\n  ${red("Error:")} ${msg}\n`);
  process.exit(1);
}

function check(cmd, label) {
  try {
    execSync(`command -v ${cmd}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

// ── Main ────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const flags = process.argv.slice(2).filter((a) => a.startsWith("-"));

  if (flags.includes("--help") || flags.includes("-h")) {
    console.log(`
  ${bold("create-outworkos")} ${dim("[directory]")}

  Scaffolds an Outwork OS workspace — a personal operating system
  for knowledge workers, powered by Claude Code.

  ${bold("Usage:")}
    npx create-outworkos            ${dim("# creates ./outworkos")}
    npx create-outworkos my-work    ${dim("# creates ./my-work")}

  ${bold("Options:")}
    --help, -h    Show this help message
    --version     Show version
`);
    process.exit(0);
  }

  if (flags.includes("--version")) {
    const pkg = require("./package.json");
    console.log(pkg.version);
    process.exit(0);
  }

  const targetName = args[0] || "outworkos";
  const targetDir = path.resolve(process.cwd(), targetName);

  // ── Banner ──────────────────────────────────────────────
  console.log();
  console.log(`  ${amber("▐▌")} ${bold("Outwork OS")}`);
  console.log(
    `  ${dim("A personal operating system for knowledge workers")}`
  );
  console.log();

  // ── Prerequisites ───────────────────────────────────────
  if (!check("git")) {
    fail("git is required but not found. Install it and try again.");
  }

  if (process.platform !== "darwin") {
    console.log(
      `  ${amber("Warning:")} Outwork OS uses macOS Keychain for token storage.`
    );
    console.log(
      `  ${dim("Some features may not work on this platform.")}`
    );
    console.log();
  }

  // ── Check target ────────────────────────────────────────
  if (fs.existsSync(targetDir)) {
    const contents = fs.readdirSync(targetDir);
    if (contents.length > 0) {
      fail(
        `Directory ${bold(targetName)} already exists and is not empty.\n         Choose a different name or remove it first.`
      );
    }
  }

  // ── Clone ───────────────────────────────────────────────
  console.log(`  ${dim("Cloning into")} ${bold(targetName)}${dim("...")}`);

  try {
    execSync(`git clone --depth 1 ${REPO} "${targetDir}"`, {
      stdio: ["ignore", "ignore", "pipe"],
    });
  } catch (err) {
    fail(`Failed to clone repository.\n         ${err.stderr?.toString().trim() || "Check your network connection."}`);
  }

  // Remove the .git directory so the user starts fresh
  const gitDir = path.join(targetDir, ".git");
  if (fs.existsSync(gitDir)) {
    fs.rmSync(gitDir, { recursive: true, force: true });
  }

  // Initialize a fresh git repo
  try {
    execSync("git init", { cwd: targetDir, stdio: "ignore" });
    execSync("git add -A", { cwd: targetDir, stdio: "ignore" });
    execSync('git commit -m "Initial commit from create-outworkos"', {
      cwd: targetDir,
      stdio: "ignore",
    });
  } catch {
    // Non-fatal — user can init git themselves
  }

  console.log(`  ${green("Done.")} Outwork OS scaffolded.\n`);

  // ── Run setup ───────────────────────────────────────────
  const setupScript = path.join(targetDir, "setup.sh");
  if (fs.existsSync(setupScript)) {
    console.log(`  ${dim("Running interactive setup...")}\n`);

    // Make sure it's executable
    try {
      fs.chmodSync(setupScript, 0o755);
    } catch {
      // ignore
    }

    const setup = spawn("bash", [setupScript], {
      cwd: targetDir,
      stdio: "inherit",
    });

    setup.on("close", (code) => {
      console.log();
      if (code === 0) {
        printNextSteps(targetName);
      } else {
        console.log(
          `  ${amber("Setup exited with code " + code + ".")} You can re-run it anytime:`
        );
        console.log(`  ${bold(`cd ${targetName} && ./setup.sh`)}\n`);
      }
    });

    setup.on("error", () => {
      console.log(
        `  ${amber("Could not run setup automatically.")} Run it manually:`
      );
      console.log(`  ${bold(`cd ${targetName} && ./setup.sh`)}\n`);
    });
  } else {
    printNextSteps(targetName);
  }
}

function printNextSteps(dir) {
  console.log(`  ${bold("Next steps:")}`);
  console.log();
  console.log(`  ${green("1.")} ${bold(`cd ${dir}`)}`);
  console.log(`  ${green("2.")} Open Claude Code: ${bold("claude")}`);
  console.log(
    `  ${green("3.")} Try a command:    ${bold("/scan")}  ${dim("or")}  ${bold("/whats-next")}`
  );
  console.log();
  console.log(
    `  ${dim("Docs:")} https://github.com/MattVOLTA/outworkos_diy`
  );
  console.log();
}

main().catch((err) => {
  fail(err.message);
});
