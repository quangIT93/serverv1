-> Gửi tin nhắn
socket.emit("client-send-message", data);

Có 2 trường hợp:
- Gửi text
data = {
	receiverId: [id của người nhận],
    message: message,
    createdAt: number,
	type: "text",
	postId: number
}


- Gửi images
data = {
	receiverId: [id của người nhận],
    files: buffer[],
    createdAt: number,
	type: "image",
	postId: number
}



-> Nhận tin nhắn: chỗ này a check type để hiển thị nha
socket.on("server-send-message-to-receiver", (data) => {})

- Có 2 trường hợp:
+ Nhận text
data: {
	id: number,
	sender_id: string,
	message,
	type: "text",
	created_at: number
}

+ Nhận image
data: {
	id: number,
	sender_id: string,
	images: Array[image url],
	type: "image",
	created_at: number
}


-> Người gửi nhận tin nhắn đã gửi (tại cần id của tin nhắn)
socket.on("server-send-message-was-sent", data => ());

data:
	{
        id: chatIdInserted,
        images: urlsUploaded,
        created_at: createdAt,
        type: "image",
    }
	
data:
	{
        id: chatIdInserted,
        message: message,
        created_at: createdAt,
        type: "text",
    }