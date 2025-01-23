import { Theme } from '@react-navigation/native';

// Base color palette
const Colors = {
  primary: {
    light: '#3498db',   // Bright blue
    dark: '#5DADE2',    // Softer blue for dark mode
  },
  secondary: {
    light: '#2ecc71',   // Emerald green
    dark: '#48C9B0',    // Turquoise for dark mode
  },
  background: {
    light: '#F7F9FB',   // Very light blue-gray
    dark: '#121212',    // Deep dark background
  },
  surface: {
    light: '#FFFFFF',   // Pure white
    dark: '#1E1E1E',    // Slightly lighter than background
  },
  text: {
    light: '#333333',   // Dark gray
    dark: '#E0E0E0',    // Soft light text
  },
  accent: {
    light: '#E74C3C',   // Bright red
    dark: '#EC7063',    // Softer red for dark mode
  },
  border: {
    light: '#E0E0E0',   // Light gray
    dark: '#333333',    // Dark gray
  },
  icon: {
    light: '#666666',   // Medium gray
    dark: '#CCCCCC',    // Light gray
  }
};

// Light Theme Configuration
export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: Colors.primary.light,
    background: Colors.background.light,
    card: Colors.surface.light,
    text: Colors.text.light,
    border: Colors.border.light,
    notification: Colors.accent.light,
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: 'normal'
    },
    bold: {
      fontFamily: 'System',
      fontWeight: 'bold'
    }
  }
};

// Dark Theme Configuration
export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: Colors.primary.dark,
    background: Colors.background.dark,
    card: Colors.surface.dark,
    text: Colors.text.dark,
    border: Colors.border.dark,
    notification: Colors.accent.dark,
  },
  fonts: {
    regular: {
      fontFamily: 'System',
      fontWeight: 'normal'
    },
    bold: {
      fontFamily: 'System',
      fontWeight: 'bold'
    }
  }
};

// Extended Theme Utility
export const ThemeUtils = {
  Colors,
  getThemedColor: (colorKey: keyof typeof Colors, mode: 'light' | 'dark' = 'light') => {
    return Colors[colorKey][mode];
  }
};

export default {
  LightTheme,
  DarkTheme,
  ThemeUtils
};