import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

type AppColors = {
  primary: string;
  highlight: string;
  border: string;
  background: {
    dark: string;
    base: string;
    light: string;
  };
  text: {
    base: string;
    alwaysWhite: string;
    danger: string;
    warning: string;
    success: string;
    info: string;
    muted: string;
  };
  elevation: {
    level0: string;
    level1: string;
    level2: string;
    level3: string;
    level4: string;
    level5: string;
  };
};

type ColorMode = 'dark' | 'light';

type AppTheme = {
  colors: AppColors;
};

export type AppThemeContextType = AppTheme & {
  mode: ColorMode;
  toggleTheme: () => void;
};

export const STATIC_COLORS = {
  HUE: 0,
  DANGER: 'hsl(8, 52%, 65%)',
  INFO: 'hsl(218, 59%, 67%)',
  WARNING: 'hsl(51, 36%, 50%)',
  MUTED: 'hsl(0, 0%, 62%)',
  PRIMARY: 'hsl(345, 79%, 51%)',
  BORDER: 'hsl(0 0% 30%)',
} as const;

const DARK_THEME: AppTheme = {
  colors: {
    primary: 'hsl(345, 79%, 51%)',
    highlight: 'hsl(0 0% 60%)',
    border: 'hsl(0, 0%, 30%)',
    background: {
      dark: `hsl(${STATIC_COLORS.HUE} 0% 0%)`,
      base: `hsl(${STATIC_COLORS.HUE} 0% 5%)`,
      light: `hsl(${STATIC_COLORS.HUE} 0% 10%)`,
    },
    text: {
      base: 'hsl(0 0% 95%)',
      alwaysWhite: 'hsl(0, 0%, 95%)',
      danger: 'hsl(8, 52%, 65%)',
      warning: 'hsl(51, 36%, 50%)',
      success: 'hsl(149, 34%, 54%)',
      info: 'hsl(218, 59%, 67%)',
      muted: 'hsl(0, 0%, 62%)',
    },
    elevation: {
      level0: 'transparent',
      level1: `hsl(${STATIC_COLORS.HUE} 0% 7.5%)`,
      level2: `hsl(${STATIC_COLORS.HUE} 0% 10%)`,
      level3: `hsl(${STATIC_COLORS.HUE} 0% 12.5%)`,
      level4: `hsl(${STATIC_COLORS.HUE} 0% 15%)`,
      level5: `hsl(${STATIC_COLORS.HUE} 0% 17.5%)`,
    },
  },
};

const LIGHT_THEME: AppTheme = {
  colors: {
    primary: 'hsl(345, 79%, 51%)',
    highlight: 'hsl(0 0% 100%)',
    border: 'hsl(0, 0%, 30%)',
    background: {
      dark: `hsl(${STATIC_COLORS.HUE} 0% 90%)`,
      base: `hsl(${STATIC_COLORS.HUE} 0% 95%)`,
      light: `hsl(${STATIC_COLORS.HUE} 0% 100%)`,
    },
    text: {
      base: 'hsl(0 0% 5%)',
      alwaysWhite: 'hsl(0, 0%, 95%)',
      danger: 'hsl(7, 100%, 65%)',
      warning: 'hsl(50, 100%, 37%)',
      success: 'hsl(155, 100%, 38%)',
      info: 'hsl(214, 100%, 65%)',
      muted: 'hsl(0, 0%, 50%)',
    },
    elevation: {
      level0: 'transparent',
      level1: `hsl(${STATIC_COLORS.HUE} 0% 92.5%)`,
      level2: `hsl(${STATIC_COLORS.HUE} 0% 90%)`,
      level3: `hsl(${STATIC_COLORS.HUE} 0% 87.5%)`,
      level4: `hsl(${STATIC_COLORS.HUE} 0% 85%)`,
      level5: `hsl(${STATIC_COLORS.HUE} 0% 82.5%)`,
    },
  },
};

const AppThemeContext = createContext<AppThemeContextType | null>(null);

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export function AppThemeProvider({ children }: PropsWithChildren) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ColorMode>(systemScheme ?? 'light');

  const toggleTheme = () => {
    setMode((oldColorScheme) => (oldColorScheme === 'dark' ? 'light' : 'dark'));
  };

  const theme = mode === 'dark' ? DARK_THEME : LIGHT_THEME;

  return (
    <AppThemeContext.Provider
      value={{
        ...theme,
        mode: mode,
        toggleTheme,
      }}
    >
      {children}
    </AppThemeContext.Provider>
  );
}
