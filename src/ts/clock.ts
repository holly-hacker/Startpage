namespace Clock {
    export function set(selector: string) {
        const d = new Date();
        $(selector).text(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    }

    const pad = (idk: number) => idk >= 10 ? idk : "0" + idk;
}
