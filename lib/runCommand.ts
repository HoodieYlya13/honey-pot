import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function run(cmd: string): Promise<string> {
  try {
    const { stdout, stderr } = await execAsync(cmd);
    if (stderr) console.error(stderr);
    return stdout.toString();
  } catch (err) {
    console.error("Command failed:", err);
    throw err;
  }
}