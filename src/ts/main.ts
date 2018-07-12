$(document).ready(() => {
    Clock.set("#clock");
    setInterval(() => { Clock.set("#clock") }, 1000);

    let settings = new Settings();
    $("#gear").on("click", () => { settings.Toggle(); });

    const rssMan = new RssManager();
    rssMan.Run(settings);
});
