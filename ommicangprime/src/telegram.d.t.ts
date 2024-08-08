// telegram.d.ts

interface TelegramWebApp {
    initDataUnsafe: any;
    close: () => void;
    ready: () => void;
    expand: () => void;
    // Add any other properties and methods your Telegram WebApp might use
  }
  
  interface Telegram {
    WebApp: TelegramWebApp;
  }
  
  interface TelegramWindow extends Window {
    Telegram: Telegram;
  }
  
  declare var window: TelegramWindow;
  

// interface TelegramWebApp {
//     [x: string]: any;
//     ready(): void;
//     expand(): void;
//     // Add other methods and properties as needed
// }

// interface Window {
//     Telegram?: {
//         WebApp: TelegramWebApp;
//     };
// }
