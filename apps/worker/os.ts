const base_path = process.env.BASE_WORKING_DIR as string;

if (!Bun.file(base_path).exists()) {
  Bun.write(base_path, "");
}

export async function onFileContent(filePath: string, fileContent: string) {
  console.log("🚀 adding file path", filePath);

  await Bun.write(`${base_path}/${filePath}`, fileContent);
}

export async function onShellCommand(shellCommand: string) {
  const commands = shellCommand.split("&&");
  console.log("🚀 ~ onShellCommand ~ commands:", commands)

  for (const command of commands) {
    console.log(`Running command ${command.trim().split(" ")}`);

    const result = await Bun.spawnSync({ cmd: command.trim().split(" "), cwd: base_path });
    console.log("🚀 ~ onShellCommand ~ result:", result.stdout.toString())
    console.log("🚀 ~ onShellCommand ~ result:", result.stderr.toString())
  }
}
