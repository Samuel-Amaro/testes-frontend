/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  clearMocks: true,
  testEnvironment: "jsdom" /*node*/,
  preset: "ts-jest",
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  moduleDirectories: ["node_modules", "bower_components", "shared"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|less)$": "identity-obj-proxy",
  },
};

export default config;
