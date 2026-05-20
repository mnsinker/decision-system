/**
 * @deprecated Import from `@/design-system/runtime/themeRegistry` or `@/design-system/theme`.
 * Re-exports preserve backward compatibility — registry is the single source of truth.
 */
import { themeRegistry } from "../runtime/themeRegistry";

export {
  themeRegistry as themes,
  defaultThemeName as defaultTheme,
  availableThemes,
} from "../runtime/themeRegistry";

export type { Theme, ThemeName } from "../contract";

export const premiumDense = themeRegistry.premiumDense;
export const compactDashboard = themeRegistry.compactDashboard;
export const readableMarketing = themeRegistry.readableMarketing;
