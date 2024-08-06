from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    telegram_id = db.Column(db.String(100), nullable=False)

# Create database and tables
with app.app_context():
    db.create_all()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    telegram_id = data.get('telegramId')

    if not name or not telegram_id:
        return jsonify({'error': 'Missing fields'}), 400

    new_user = User(name=name, telegram_id=telegram_id)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 200

if __name__ == '__main__':
    app.run(port=5000)



# const express = require('express');
# const mongoose = require('mongoose');
# const cors = require('cors');
# const bodyParser = require('body-parser');

# const app = express();
# app.use(cors());
# app.use(bodyParser.json());

# mongoose.connect('mongodb://localhost:27017/ommicang', { useNewUrlParser: true, useUnifiedTopology: true });

# const userSchema = new mongoose.Schema({
#     name: String,
#     telegramId: String
# });
# const User = mongoose.model('User', userSchema);

# app.post('/signup', async (req, res) => {
#     const { name, telegramId } = req.body;
#     const newUser = new User({ name, telegramId });
#     await newUser.save();
#     res.status(200).send('User registered successfully');
# });

# app.listen(5000, () => console.log('Server running on port 5000'));
