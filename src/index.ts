
import tinycolor from 'tinycolor2';
import { Brightness, GradientOptions } from './model/model';

/**
 * Hashes a string to a 32-bit integer using MD5.
 * @param str - Input string
 * @returns A 32-bit integer derived from the string hash
 */
/**
 * FNV-1a hashing algorithm (32-bit).
 * @param str - Input string
 * @returns A 32-bit integer hash
 */
function fnv1a(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0; // Ensure unsigned 32-bit integer
}

/**
 * Hashes a string to a 32-bit integer using FNV-1a.
 * @param str - Input string
 * @returns A 32-bit integer derived from the string hash
 */
function hashStringToInt(str: string): number {
  return fnv1a(str);
}

/**
 * Returns a predefined lightness value based on brightness level.
 * @param brightness - Brightness setting
 * @returns Lightness value (0–100)
 */
function getLightness(brightness: Brightness = 'normal'): number {
  switch (brightness) {
    case 'dark':
      return 35;
    case 'light':
      return 70;
    default:
      return 60;
  }
}

/**
 * Returns a predefined saturation value based on brightness level.
 * @param brightness - Brightness setting
 * @returns Saturation value (0–100)
 */
function getSaturation(brightness: Brightness = 'normal'): number {
  switch (brightness) {
    case 'dark':
      return 80;
    case 'light':
      return 60;
    default:
      return 70;
  }
}

/**
 * Generates a consistent gradient angle from a string using SHA-1.
 * @param str - Input string
 * @returns Angle between 0–359 degrees
 */
/**
 * Generates a consistent gradient angle from a string using FNV-1a.
 * @param str - Input string
 * @returns Angle between 0–359 degrees
 */
function getAngleFromString(str: string): number {
  const hash = fnv1a(str + 'angle');
  return hash % 360;
}

/**
 * Converts a string into a single HSL-based hex color.
 *
 * @param str - Input string to hash
 * @param brightness - Brightness setting (default: 'normal')
 * @returns A hex color string (e.g., "#a1b2c3")
 */
export function stringToColor(
  str: string,
  brightness: Brightness = 'normal'
): string {
  const hashInt = hashStringToInt(str);
  const hue = hashInt % 360;
  const saturation = getSaturation(brightness);
  const lightness = getLightness(brightness);

  return tinycolor({ h: hue, s: saturation, l: lightness }).toHexString();
}

/**
 * Converts a string into a gradient composed of two colors.
 *
 * @param str - Input string to hash
 * @param options - Gradient options (brightness)
 * @returns A tuple of two hex color strings
 */
export function stringToGradient(
  str: string,
  options: GradientOptions = {}
): [string, string] {
  const { brightness = 'normal' } = options;

  const hash1 = fnv1a(str + 'color1');
  const hash2 = fnv1a(str + 'color2');
  const hue1 = hash1 % 360;
  let hue2 = hash2 % 360;

  // Ensure hue2 is sufficiently different from hue1
  const MIN_HUE_DIFF = 30;
  if (Math.abs(hue1 - hue2) < MIN_HUE_DIFF) {
    hue2 = (hue2 + MIN_HUE_DIFF) % 360;
  }

  const saturation = getSaturation(brightness);
  const lightness = getLightness(brightness);

  const color1 = tinycolor({
    h: hue1,
    s: saturation,
    l: lightness,
  }).toHexString();
  const color2 = tinycolor({
    h: hue2,
    s: saturation,
    l: lightness,
  }).toHexString();

  return [color1, color2];
}

/**
 * Converts a string into a complete CSS linear-gradient string.
 *
 * @param str - Input string to hash
 * @param options - Gradient options including angle and brightness
 * @returns A CSS gradient string (e.g., `linear-gradient(45deg, #a1b2c3, #d4e5f6)`)
 */
export function stringToCssGradient(
  str: string,
  options: GradientOptions = {}
): string {
  const { angle = 'auto' } = options;
  const [color1, color2] = stringToGradient(str, options);
  const angleValue = angle === 'auto' ? getAngleFromString(str) : angle;

  return `linear-gradient(${angleValue}deg, ${color1}, ${color2})`;
}
