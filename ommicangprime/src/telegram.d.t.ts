interface TelegramWebApp {
    [x: string]: any;
    ready(): void;
    expand(): void;
    // Add other methods and properties as needed
}

interface Window {
    Telegram?: {
        WebApp: TelegramWebApp;
    };
}
