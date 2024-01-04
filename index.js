const login = require("facebook-chat-api");
const fs = require("fs");

const express = require("express");
const app = express();
const port = 3000; // Chọn cổng mà máy chủ sẽ lắng nghe

// Đường dẫn khi người dùng nhấp vào trái tim
app.get("/", (req, res) => {
  // Code gửi tin nhắn ở đây
  // Ví dụ sử dụng facebook-chat-api
  const login = require("facebook-chat-api");

  try {
    const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));

    login({ appState }, (err, api) => {
      if (err) return console.error(err);

      const message = "Anh yêu em, làm bạn gái anh nhé!";
      const recipientUserId = "100052851488205";
      // Hàm gửi tin nhắn
      function sendMessage(api, message, recipientUserId) {
        api.sendMessage(message, recipientUserId, (err, messageInfo) => {
          if (err) return console.error(err);
          console.log(`Đã gửi tin nhắn: "${message}" tới ${recipientUserId}`);
        });
      }

      // Gửi tin nhắn
      for (let i = 0; i < 99; i++) {
        setTimeout(() => {
          sendMessage(
            api,
            "Tin nhắn số " + "" + i + ": " + message,
            recipientUserId
          );
        }, i * 1000); // Gửi tin nhắn mỗi giây
      }
    });
  } catch (err) {
    console.error("Không thể đọc file appstate.json:", err);
  }

  res.send('  <h1 style="color: red;text-align: center;">999 tin nhắn</h1>');
});

// Khởi động máy chủ
app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe tại http://localhost:${port}`);
});
