import { PropsWithChildren } from 'react';
import { MD3DarkTheme, MD3LightTheme, MD3Theme, PaperProvider } from 'react-native-paper';
import { STATIC_COLORS, useAppTheme } from './app-theme-provider';

// Dark Theme
const MD3_DARK_THEME: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 6,
  colors: {
    // Main (Updated)
    primary: STATIC_COLORS.PRIMARY,
    onPrimary: 'hsl(0 0% 100%)', // White for contrast
    primaryContainer: 'hsl(345, 79%, 20%)', // Generated Dark Container
    onPrimaryContainer: 'hsl(345, 79%, 90%)',

    // Secondary (Keep Monochromatic/Neutral)
    secondary: 'hsl(0 0% 95%)', // --text
    onSecondary: `hsl(${STATIC_COLORS.HUE} 0% 5%)`, // --bg
    secondaryContainer: `hsl(${STATIC_COLORS.HUE} 0% 10%)`,
    onSecondaryContainer: 'hsl(0 0% 95%)',

    // Tertiary (Keep Monochromatic/Neutral)
    tertiary: 'hsl(0 0% 95%)',
    onTertiary: `hsl(${STATIC_COLORS.HUE} 0% 5%)`,
    tertiaryContainer: `hsl(${STATIC_COLORS.HUE} 0% 10%)`,
    onTertiaryContainer: 'hsl(0 0% 95%)',

    // Surfaces
    background: `hsl(${STATIC_COLORS.HUE} 0% 5%)`,
    onBackground: 'hsl(0 0% 95%)',
    surface: `hsl(${STATIC_COLORS.HUE} 0% 5%)`,
    onSurface: 'hsl(0 0% 95%)',
    surfaceVariant: `hsl(${STATIC_COLORS.HUE} 0% 10%)`,
    onSurfaceVariant: 'hsl(0 0% 95%)',
    surfaceDisabled: `hsl(${STATIC_COLORS.HUE} 0% 10%)`,
    onSurfaceDisabled: 'hsl(0 0% 50%)',

    // Inverse
    inverseSurface: 'hsl(0 0% 95%)',
    inverseOnSurface: `hsl(${STATIC_COLORS.HUE} 0% 5%)`,
    inversePrimary: STATIC_COLORS.PRIMARY,

    // Outlines
    outline: STATIC_COLORS.BORDER,
    outlineVariant: STATIC_COLORS.BORDER,

    // Misc
    error: 'hsl(0 100% 60%)',
    onError: 'hsl(0 0% 100%)',
    errorContainer: 'hsl(0 100% 20%)',
    onErrorContainer: 'hsl(0 100% 90%)',
    shadow: 'hsl(0 0% 0%)',
    scrim: 'hsl(0 0% 0%)',
    backdrop: 'hsl(0 0% 0%)',
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

// Light Theme
const MD3_LIGHT_THEME: MD3Theme = {
  ...MD3LightTheme,
  roundness: 6,
  colors: {
    // Main (Updated)
    primary: STATIC_COLORS.PRIMARY,
    onPrimary: 'hsl(0 0% 100%)',
    primaryContainer: 'hsl(345, 79%, 90%)', // Generated Light Container
    onPrimaryContainer: 'hsl(345, 79%, 10%)',

    // Secondary
    secondary: 'hsl(0 0% 5%)', // --text
    onSecondary: `hsl(${STATIC_COLORS.HUE} 0% 95%)`, // --bg
    secondaryContainer: `hsl(${STATIC_COLORS.HUE} 0% 90%)`,
    onSecondaryContainer: 'hsl(0 0% 5%)',

    // Tertiary
    tertiary: 'hsl(0 0% 5%)',
    onTertiary: `hsl(${STATIC_COLORS.HUE} 0% 95%)`,
    tertiaryContainer: `hsl(${STATIC_COLORS.HUE} 0% 90%)`,
    onTertiaryContainer: 'hsl(0 0% 5%)',

    // Surfaces
    background: `hsl(${STATIC_COLORS.HUE} 0% 95%)`,
    onBackground: 'hsl(0 0% 5%)',
    surface: `hsl(${STATIC_COLORS.HUE} 0% 95%)`,
    onSurface: 'hsl(0 0% 5%)',
    surfaceVariant: `hsl(${STATIC_COLORS.HUE} 0% 90%)`,
    onSurfaceVariant: 'hsl(0 0% 5%)',
    surfaceDisabled: `hsl(${STATIC_COLORS.HUE} 0% 90%)`,
    onSurfaceDisabled: 'hsl(0 0% 50%)',

    // Inverse
    inverseSurface: 'hsl(0 0% 5%)',
    inverseOnSurface: `hsl(${STATIC_COLORS.HUE} 0% 95%)`,
    inversePrimary: STATIC_COLORS.PRIMARY,

    // Outlines
    outline: STATIC_COLORS.BORDER,
    outlineVariant: STATIC_COLORS.BORDER,

    // Misc
    error: 'hsl(0 100% 40%)',
    onError: 'hsl(0 0% 100%)',
    errorContainer: 'hsl(0 100% 90%)',
    onErrorContainer: 'hsl(0 100% 10%)',
    shadow: 'hsl(0 0% 0%)',
    scrim: 'hsl(0 0% 0%)',
    backdrop: 'hsl(0 0% 0%)',
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

export function AppPaperProvider({ children }: PropsWithChildren) {
  const theme = useAppTheme();
  const paperTheme = theme.mode === 'dark' ? MD3_DARK_THEME : MD3_LIGHT_THEME;

  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
}
