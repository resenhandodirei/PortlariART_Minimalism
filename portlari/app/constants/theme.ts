import { Platform } from 'react-native';

const ROSA_PRINCIPAL = '#FF69B4'; 
const PRETO_PURO = '#000000';
const BRANCO_PURO = '#FFFFFF';
const CINZA_DISCRETO = '#1A1A1A'; 
export const Colors = {
  light: {
    text: PRETO_PURO,
    background: BRANCO_PURO,
    tint: ROSA_PRINCIPAL,
    icon: PRETO_PURO,
    tabIconDefault: '#BCBCBC',
    tabIconSelected: ROSA_PRINCIPAL,
  },
  dark: {
    text: BRANCO_PURO,
    background: PRETO_PURO,
    tint: ROSA_PRINCIPAL,
    icon: ROSA_PRINCIPAL,
    tabIconDefault: '#444444',
    tabIconSelected: ROSA_PRINCIPAL,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded', 
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});