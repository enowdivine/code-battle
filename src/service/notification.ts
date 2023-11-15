async function sendNotification(user: any, details: any) {
  const serverKey = "YOUR_FCM_SERVER_KEY"; // Replace with your FCM server key

  if (user) {
    const fields = {
      notification: {
        body: details.message,
        title: details.title,
        click_action: "FLUTTER_NOTIFICATION_CLICK",
        sound: "default",
      },
      data: {
        status: details.status,
        id: user.FCM_TOKEN,
        image: details.image,
        category: details.category,
        type: "message",
      },
      to: user.FCM_TOKEN,
      apns: {
        payload: {
          aps: {
            sound: "default",
          },
        },
      },
    };

    const headers = {
      Authorization: "key=" + serverKey,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        throw new Error("FCM Send Error: " + response.statusText);
      }

      const result = await response.json();
      const responseData = { android: { result: result } };

      return responseData;
    } catch (error: any) {
      console.error(error);
      return { error: error?.message };
    }
  }
}

export default sendNotification;
