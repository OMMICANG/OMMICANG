import logging
import sqlite3
from aiogram import Bot, Dispatcher, types
from aiogram.utils.keyboard import InlineKeyboardButton, InlineKeyboardMarkup
from aiogram.exceptions import TelegramNetworkError
from aiogram.filters import Command

API_TOKEN = '7221470497:AAEFZSWmdewKJuNC_i89umxZZpUfVat0mmA'

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize bot and dispatcher
bot = Bot(token=API_TOKEN)
dp = Dispatcher()

# Initialize SQLite database
conn = sqlite3.connect('user_data.db')
cursor = conn.cursor()

# Create a table to store user data
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    telegram_id TEXT UNIQUE,
    name TEXT
)
''')
conn.commit()

@dp.message(Command(commands=["start", "help"]))
async def send_welcome(message: types.Message):
    telegram_id = message.from_user.id

    # Check if the user ID is already in the database
    cursor.execute('SELECT * FROM users WHERE telegram_id = ?', (telegram_id,))
    user = cursor.fetchone()

    # If the user is not found, insert their Telegram ID into the database
    if user is None:
        cursor.execute('INSERT INTO users (telegram_id) VALUES (?)', (telegram_id,))
        conn.commit()

    # Creating the keyboard with a button
    button = InlineKeyboardButton(text="Open OMMICANG", url="https://ommicang.onrender.com")
    keyboard = InlineKeyboardMarkup(inline_keyboard=[[button]])

    await message.reply("Welcome to OMMICANG! Click the button below to open the app.", reply_markup=keyboard)

@dp.message(Command(commands=["signup"]))
async def signup(message: types.Message):
    telegram_id = message.from_user.id
    name = message.text.split(maxsplit=1)[-1]  # Extract the name from the message

    # Update the user's name in the database
    cursor.execute('UPDATE users SET name = ? WHERE telegram_id = ?', (name, telegram_id))
    conn.commit()

    await message.reply("You have successfully signed up!")

@dp.message()
async def fallback(message: types.Message):
    await message.reply("Please use the /signup command followed by your name to sign up.")

if __name__ == '__main__':
    try:
        dp.run_polling(bot)
    except TelegramNetworkError as e:
        logging.error(f"Network error occurred: {e}")



# import logging
# import sqlite3
# from aiogram import Bot, Dispatcher, types
# from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
# from aiogram.filters import Command

# API_TOKEN = '7221470497:AAEFZSWmdewKJuNC_i89umxZZpUfVat0mmA'
# WEB_APP_URL = 'https://ommicang.onrender.com'

# # Configure logging
# logging.basicConfig(level=logging.INFO)

# # Initialize bot and dispatcher
# bot = Bot(token=API_TOKEN)
# dp = Dispatcher()

# # Initialize SQLite database
# conn = sqlite3.connect('user_data.db')
# cursor = conn.cursor()

# # Create a table to store user data
# cursor.execute('''
# CREATE TABLE IF NOT EXISTS users (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     telegram_id TEXT UNIQUE,
#     name TEXT
# )
# ''')
# conn.commit()

# @dp.message(Command("start"))
# async def send_welcome(message: types.Message):
#     keyboard = InlineKeyboardMarkup(inline_keyboard=[
#         [InlineKeyboardButton(text="Open SolarFrens", url=WEB_APP_URL)]
#     ])
#     await message.answer("Welcome to SolarFrens! Click the button below to open the app.", reply_markup=keyboard)

# @dp.message(Command("signup"))
# async def signup(message: types.Message):
#     telegram_id = message.from_user.id
#     name = message.text.split(maxsplit=1)[-1]  # Extract the name from the message

#     # Insert user data into the database
#     try:
#         cursor.execute('INSERT INTO users (telegram_id, name) VALUES (?, ?)', (telegram_id, name))
#         conn.commit()
#         await message.answer("You have successfully signed up!")
#     except sqlite3.IntegrityError:
#         await message.answer("You're already signed up!")

# if __name__ == '__main__':
#     dp.run_polling(bot)


# import logging
# import sqlite3
# from aiogram import Bot, Dispatcher, types
# from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
# from aiogram.utils import executor
# from aiogram import types

# API_TOKEN = '7221470497:AAEFZSWmdewKJuNC_i89umxZZpUfVat0mmA'
# WEB_APP_URL = 'https://ommicang.onrender.com'

# # Configure logging
# logging.basicConfig(level=logging.INFO)

# # Initialize bot and dispatcher
# bot = Bot(token=API_TOKEN)
# dp = Dispatcher(bot)

# # Initialize SQLite database
# conn = sqlite3.connect('user_data.db')
# cursor = conn.cursor()

# # Create a table to store user data
# cursor.execute('''
# CREATE TABLE IF NOT EXISTS users (
#     id INTEGER PRIMARY KEY AUTOINCREMENT,
#     telegram_id TEXT UNIQUE,
#     name TEXT
# )
# ''')
# conn.commit()

# @dp.message_handler(commands=['start'])
# async def send_welcome(message: types.Message):
#     keyboard = InlineKeyboardMarkup()
#     button = InlineKeyboardButton("Open SolarFrens", url=WEB_APP_URL)
#     keyboard.add(button)
#     await message.reply("Welcome to SolarFrens! Click the button below to open the app.", reply_markup=keyboard)

# @dp.message_handler(commands=['signup'])
# async def signup(message: types.Message):
#     telegram_id = message.from_user.id
#     name = message.text.split(maxsplit=1)[-1]  # Extract the name from the message

#     # Insert user data into the database
#     try:
#         cursor.execute('INSERT INTO users (telegram_id, name) VALUES (?, ?)', (telegram_id, name))
#         conn.commit()
#         await message.reply("You have successfully signed up!")
#     except sqlite3.IntegrityError:
#         await message.reply("You're already signed up!")

# if __name__ == '__main__':
#     executor.start_polling(dp, skip_updates=True)
