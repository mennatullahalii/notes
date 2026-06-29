import nodeConfig from "@workspace/eslint-config/node";
import reactConfig from "@workspace/eslint-config/react";

const nodeFiles = [
  "*.{js,mjs,cjs,ts}",
  "apps/api/**/*.{js,mjs,cjs,ts}",
  "packages/database/**/*.{js,mjs,cjs,ts}",
  "packages/eslint-config/**/*.{js,mjs,cjs,ts}",
  "packages/shared-types/**/*.{js,mjs,cjs,ts}",
];

const reactFiles = ["apps/web/**/*.{js,mjs,cjs,jsx,ts,tsx}"];

const scopedConfig = (configs, files) =>
  configs.map((config) =>
    config.ignores && Object.keys(config).length === 1
      ? config
      : { ...config, files },
  );

export default [
  ...scopedConfig(nodeConfig, nodeFiles),
  ...scopedConfig(reactConfig, reactFiles),
];
