import { settings } from "./settings";
import { DEFAULT_THEME } from "./themes/DEFAULT_THEME";

export const getPlatformConfig = async () => {
  return {
    theme: DEFAULT_THEME,
    settings
  };
};