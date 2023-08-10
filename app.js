const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
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
