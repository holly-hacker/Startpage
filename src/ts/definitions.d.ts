type FeedUrlJoin = (string | {name: string, feeds: string[]});

interface Feed {
    feed: FeedMetadata;
    items: FeedItem[];
    status: string;
}

interface FeedMetadata {
    author: string;
    description: string;
    image: string;
    link: string;
    title: string;
    url: string;
}

interface FeedItem {
    author: string;
    categories: string[];
    content: string;
    description: string;
    enclosure: object;
    guid: string;
    link: string;
    pubDate: string;
    thumbnail: string;
    title: string;
}