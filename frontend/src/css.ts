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
 *
 * you can also add filename and line information to annotate the content of the style tag that will be generated with source information
 * ```
 * css` ${{ __filename, __line }}
 * body {
 *     margin: 0;
 *     padding: 0;
 * }
 * `
 * ```
 *
 * *(there is a known issue with source information and css comments that span multiple lines, do not use both at once)*
*/
export default function css(strings: { raw: readonly string[] | ArrayLike<string> }, ...substitutions: any[]) {
    let style = document.createElement("style");
    let first = substitutions[0];
    if (typeof first === "object" && first !== null && "__filename" in first && typeof first["__filename"] === "string" && "__line" in first && typeof first["__line"] === "number") {
        substitutions[0] = "";

        let filename = first["__filename"];
        let line = first["__line"];

        let name = filename.substring(Math.max(filename.lastIndexOf("/"), filename.lastIndexOf("\\")) + 1);

        style.dataset["from"] = name + ":" + line;

        style.innerHTML = add_line_numbers(String.raw(strings, ...substitutions), line, ":" + name + ":" + filename + " ");
    } else {
        style.innerHTML = String.raw.apply(String, arguments as any);
    }
    document.head.appendChild(style);
}

function add_line_numbers(styles: string, lineno: number, header: string): string {
    if (lineno < 0 || !Number.isSafeInteger(lineno)) return styles;
    let width = String(count_lines(styles) + lineno).length;
    let i = -1;
    let lined = "";
    while (true) {
        let n = styles.indexOf("\n", i + 1);
        if (n === -1) {
            lined += "/*" + String(lineno).padStart(width) + header + "*/ " + styles.substring(i + 1);
            break;
        }
        lined += "/*" + String(lineno).padStart(width) + header + "*/ " + styles.substring(i + 1, n + 1);
        i = n;
        header = "";
        lineno++;
    }
    return lined;
}

function count_lines(styles: string): number {
    let count = 0;
    let i = -1;
    while (true) {
        i = styles.indexOf("\n", i + 1);
        if (i === -1) break;
        count++;
    }
    return count;
}