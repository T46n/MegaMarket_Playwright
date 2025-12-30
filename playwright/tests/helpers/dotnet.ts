import { spawn, type ChildProcess } from 'child_process';

type StartOptions = {
  env?: NodeJS.ProcessEnv;
};

export function startDotnet(args: string[], options: StartOptions = {}): ChildProcess {
  const proc = spawn('dotnet', args, {
    shell: true,
    env: { ...process.env, ...options.env },
    stdio: 'pipe'
  });

  proc.stdout?.on('data', () => {});
  proc.stderr?.on('data', () => {});

  return proc;
}

export async function waitForHttpOk(url: string, timeoutMs: number) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: 'manual' });
      if (res.status >= 200 && res.status < 500) return;
    } catch {
      // ignore and retry
    }

    await new Promise((r) => setTimeout(r, 250));
  }

  throw new Error(`Timed out waiting for ${url}`);
}

export function stopProcess(proc: ChildProcess) {
  if (proc.killed) return;
  proc.kill();
}
