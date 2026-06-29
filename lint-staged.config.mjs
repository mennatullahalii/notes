const ignoredSegments = new Set([
  "node_modules",
  "dist",
  "build",
  ".next",
  ".turbo",
  ".cache",
]);

const ignoredFiles = new Set(["pnpm-lock.yaml"]);

const quote = (file) => `"${file.replaceAll('"', '\\"')}"`;

const filterIgnored = (files) =>
  files.filter((file) => {
    const normalized = file.replaceAll("\\", "/");
    const segments = normalized.split("/");

    return (
      !segments.some((segment) => ignoredSegments.has(segment)) &&
      !ignoredFiles.has(segments.at(-1))
    );
  });

const command = (prefix, files) => {
  const filteredFiles = filterIgnored(files);

  return filteredFiles.length
    ? [`${prefix} ${filteredFiles.map(quote).join(" ")}`]
    : [];
};

export default {
  "./*.{js,mjs,cjs,ts,tsx,jsx}": (files) => [
    ...command("eslint --fix --max-warnings=0", files),
    ...command("prettier --write --ignore-unknown", files),
  ],
  "!(node_modules)/**/*.{js,mjs,cjs,ts,tsx,jsx}": (files) => [
    ...command("eslint --fix --max-warnings=0", files),
    ...command("prettier --write --ignore-unknown", files),
  ],
  "./*.{json,md,yml,yaml}": (files) =>
    command("prettier --write --ignore-unknown", files),
  "!(node_modules)/**/*.{json,md,yml,yaml}": (files) =>
    command("prettier --write --ignore-unknown", files),
};
