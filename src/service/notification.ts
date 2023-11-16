import axios from "axios";
async function sendNotification(user: any, details: any) {
  const serverKey =
    "AAAAChQoeV4:APA91bE4jFNfAKnNLn2ckr08zDVRxY5iCoiI_ntp7Jo5Y-fQO6Rc9V2-5GvQml-E1coo_cwHT91MUo5aVclsTIxPuDU2O9JncES8NE0a9lznx5faHYAIXV0B_NL_TqissHSqjwvTFPOp"; // Replace with your FCM server key

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
      const response = axios.post(
        "https://fcm.googleapis.com/fcm/send",
        fields,
        {
          headers: headers,
        }
      );
      // const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      //   method: "POST",
      //   headers: headers,
      //   body: JSON.stringify(fields),
      // });

      // if (!response.ok) {
      //   throw new Error("FCM Send Error: " + response.statusText);
      // }
      if (!response) {
        throw new Error("FCM Send Error: " + response);
      }

      // const result = await response.json();
      // const responseData = { android: { result: result } };
      const result = await (await response).data;
      const responseData = { android: { result: result } };
      console.log(responseData);
      return responseData;
    } catch (error: any) {
      console.error(error);
      return { error: error?.message };
    }
  }
}

export default sendNotification;
