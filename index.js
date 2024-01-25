const login = require("facebook-chat-api");
const fs = require("fs");
const express = require("express");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));

  try {
    const api = await loginPromise({ appState });
    
    const message = "Anh yêu em Tuyết Trinh, làm bạn gái anh nhé!";
    const recipientUserId = "100086257548924";

    // Hàm gửi tin nhắn
    function sendMessage(api, message, recipientUserId) {
      return new Promise((resolve, reject) => {
        api.sendMessage(message, recipientUserId, (err, messageInfo) => {
          if (err) reject(err);
          console.log(`Đã gửi tin nhắn: "${message}" tới ${recipientUserId}`);
          resolve();
        });
      });
    }

    // Gửi tin nhắn đồng bộ
    for (let i = 0; i < 3; i++) {
      await sendMessage(
        api,
        "Tin nhắn số " + (i + 1) + ": " + message,
        recipientUserId
      );
    }

    res.send('<h1 style="color: red;text-align: center;">Đã gửi 999 tin nhắn</h1>');
  } catch (err) {
    console.error("Không thể đọc file appstate.json:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Hàm đăng nhập trả về Promise
function loginPromise({ appState }) {
  return new Promise((resolve, reject) => {
    login({ appState }, (err, api) => {
      if (err) reject(err);
      resolve(api);
    });
  });
}

app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe tại http://localhost:${port}`);
});
