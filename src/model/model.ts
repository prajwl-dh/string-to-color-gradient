/**
 * The brightness level to influence color saturation and lightness.
 *
 * - 'dark'   => deeper colors
 * - 'normal' => balanced tones (default)
 * - 'light' => lighter, more pastel-like colors
 */
export type Brightness = 'dark' | 'normal' | 'light';

/**
 * Options to customize the gradient generation.
 */
export interface GradientOptions {
  /**
   * Brightness level used to determine color saturation/lightness.
   * @default 'normal'
   */
  brightness?: Brightness;

  /**
   * Gradient angle in degrees or 'auto' to derive it from the string hash.
   * @default 'auto'
   */
  angle?: 'auto' | number;
}
