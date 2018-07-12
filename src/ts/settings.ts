class Settings {
    public ApiKey: string;
    public FeedData: FeedUrlJoin[];
    private modal: JQuery<HTMLElement>;

    constructor() {
        this.modal = $("#settings-modal");

        $('#saveSettings', this.modal).on('click', () => {
            this.Save();
            this.Hide();
        });

        // setting the placeholder
        $('#feedData', this.modal).attr('placeholder', `[
    "http://url1",
    "http://url2",
    {
        "name": "group1",
        "feeds": [
            "http://url3",
        ]
    }
]`);

        // check if this is the first run
        if (!localStorage.getItem("firstRun")) {
            this.Show();
        } else {
            this.loadLocalStorage();
        }
    }

    public Show()   { this.modal.show();   }
    public Hide()   { this.modal.hide();   }
    public Toggle() { this.modal.toggle(); }

    public Save() {
        this.ApiKey = $('#apikey').val() as string;
        let feedData = $('#feedData').val() as string;
        this.FeedData = JSON.parse(feedData);

        localStorage["apikey"] = this.ApiKey;
        localStorage["feedData"] = feedData;
        localStorage["firstRun"] = "ok";
    }

    private loadLocalStorage() {
        this.ApiKey = localStorage["apikey"];
        this.FeedData = JSON.parse(localStorage["feedData"]);

        $('#apikey').val(this.ApiKey);
        $('#feedData').val(localStorage["feedData"]);
    }
}