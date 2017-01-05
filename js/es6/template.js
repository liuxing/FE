function SaferHTML(templateData) {
    let s = templateData[0];
    for (let i = 1; i < arguments.length; i++) {
        let arg = String(arguments[i]);
        console.log(arg)
        // Escape special characters in the substitution.
        s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // Don't escape special characters in the template.
        s += templateData[i];
    }
    return s;
}

let bonk = {
    sender: "Hacker Steve <script>alert('xss');</script>"
};

console.log(SaferHTML`<p>${bonk.sender} sent you a bonk.</p>`);
