import MD5 from 'crypto-js/md5';
import SHA1 from 'crypto-js/sha1';
import SHA256 from 'crypto-js/sha256';
import tinycolor from 'tinycolor2';
import { Brightness, GradientOptions } from './model/model';

/**
 * Hashes a string to a 32-bit integer using MD5.
 * @param str - Input string
 * @returns A 32-bit integer derived from the string hash
 */
function hashStringToInt(str: string): number {
  const hash = MD5(str).toString();
  return parseInt(hash.slice(0, 8), 16);
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
function getAngleFromString(str: string): number {
  const hash = SHA1(str).toString();
  const angleInt = parseInt(hash.slice(0, 4), 16);
  return angleInt % 360;
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

  const hash = SHA256(str).toString();
  const hue1 = parseInt(hash.slice(0, 6), 16) % 360;
  const hue2 = parseInt(hash.slice(6, 12), 16) % 360;

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
