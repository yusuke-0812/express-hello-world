const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(html));

// PostgreSQLの設定
const pool = new Pool({
    connectionString: "PGPASSWORD=VHUSXvYdJT7rvwwV75seWM3cMy2s1hWv psql -h dpg-cjad1llm2m9c73c8ese0-a.oregon-postgres.render.com -U chatuserdb_user chatuserdb",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => res.type("html").send(html));

app.get("/signup", (req, res) => {
    // ここでユーザー登録用のHTMLを提供します
    res.sendFile(path.join(__dirname, "./html", "register.html"));
});

app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send("Missing parameters");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, hashedPassword]);

        res.status(200).send("User registered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

const server = app.listen(port, () => console.log(`Chat app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html =  `
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>簡単なチャットアプリ</title>
    <style>
        #chatArea {
            border: 1px solid black;
            height: 300px;
            overflow-y: scroll;
            padding: 10px;
            margin-bottom: 10px;
        }

        #chatArea p {
            margin: 5px 0;
        }
    </style>
</head>

<body>

<div id="chatArea">
</div>

<input type="text" id="chatInput" placeholder="メッセージを入力...">
<button onclick="sendMessage()">送信</button>

<script>
    function sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const chatArea = document.getElementById('chatArea');

        const message = chatInput.value;

        if (message.trim() === "") return;  // 何も入力されていない場合は送信しない

        const messageElement = document.createElement('p');
        messageElement.textContent = message;

        chatArea.appendChild(messageElement);

        chatInput.value = "";  // 入力エリアをクリア
        chatArea.scrollTop = chatArea.scrollHeight;  // スクロールを最下部に移動
    }
</script>

</body>
</html>
`
