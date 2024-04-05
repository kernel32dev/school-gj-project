/** this is a helper function to easily add css from inside a typescript file
 *
 * use this tag when developing, do not use it in production
 *
 * usage: (this is valid javascript)
 * ```
 * css`
 * body {
 *     margin: 0;
 *     padding: 0;
 * }
 * `
 * ```
*/
export default function css(strings: { raw: readonly string[] | ArrayLike<string> }, ...substitutions: any[]) {
    const style = document.createElement("style");
    style.innerHTML = String.raw.apply(String, arguments as any);
    document.head.appendChild(style);
}
