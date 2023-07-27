/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  testEnvironment: "jsdom" /*node*/,
  preset: "ts-jest",
};

export default config;
