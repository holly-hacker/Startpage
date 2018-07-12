class RssManager {
    public Run(settings: Settings) {
        const _this = this;

        settings.FeedData.forEach((feed, idx) => {
            if (typeof feed === "object") {
                let xhrReqs = feed.feeds.map((x) => this.fetchFeed(x, settings.ApiKey));
                $.when(...xhrReqs).fail((d) => {
                    console.log('fail', d.responseJSON.message);
                }).done(function () {
                    let allFeeds: Feed[] = [];
                    for (let i = 0; i < arguments.length; i++)
                        allFeeds[i] = arguments[i][0];
        
                    // select all the feed items
                    let flatten = <T>(arg: T[][]): T[] => [].concat(...arg);
                    _this.addFeed(feed.name, flatten(allFeeds.map(x => x.items)), idx);
                });
            } else if (typeof feed === "string") {
                this.fetchFeed(feed, settings.ApiKey).done((data) => {
                    this.addFeed(data.feed.title, data.items, idx);
                });
            }
        })
    }
    
    private fetchFeed(url: string, apikey: string): JQuery.jqXHR<Feed> {
        const rss2json: string = "https://api.rss2json.com/v1/api.json?rss_url=";
        return $.getJSON(rss2json, { 
            rss_url: url,
            count: 15,
            api_key: apikey,
        });
    }
    
    private addFeed(titleText: string, items: FeedItem[], idx: number) {
        // sort items
        items.sort((a, b) => b.pubDate.localeCompare(a.pubDate));
        
        // create new object
        let feed = $("<div>").addClass("feed").css("order", idx);
        let title = $("<div>").addClass("title").text(titleText);
        let content = $("<div>").addClass("content");
        title.appendTo(feed);
        content.appendTo(feed);
        items.slice(0, 15).forEach((val) => {
            $("<a>").attr({href: val.link, title: val.pubDate}).text(val.title).appendTo(content);
        });
    
        feed.appendTo($("#feeds"));
    }
}
