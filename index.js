const login = require("facebook-chat-api");
const fs = require("fs");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));

    const api = await new Promise((resolve, reject) => {
      login({ appState }, (err, api) => {
        if (err) reject(err);
        resolve(api);
      });
    });

    const message = "Anh yêu em, làm bạn gái anh nhé!";
    const recipientUserId = "100052851488205";

    function sendMessage(api, message, recipientUserId, index) {
      return new Promise((resolve, reject) => {
        api.sendMessage(message, recipientUserId, (err, messageInfo) => {
          if (err) reject(err);
          console.log(`Đã gửi tin nhắn số ${index}: "${message}" tới ${recipientUserId}`);
          resolve();
        });
      });
    }

    // Gửi tin nhắn đồng bộ
    for (let i = 0; i < 9; i++) {
      try {
        await sendMessage(
          api,
          `Tin nhắn số ${i + 1}: ${message}`,
          recipientUserId,
          i + 1
        );
        await new Promise(resolve => setTimeout(resolve, 1000)); // Chờ 1 giây trước khi gửi tin nhắn tiếp theo
      } catch (err) {
        console.error("Có lỗi xảy ra khi gửi tin nhắn:", err);
      }
    }

    res.send('<h1 style="color: red;text-align: center;">999 tin nhắn đã gửi thành công!</h1>');
  } catch (err) {
    console.error("Không thể đọc file appstate.json:", err);
    res.status(500).send('Đã xảy ra lỗi khi gửi tin nhắn.');
  }
});

app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe tại http://localhost:${port}`);
});
