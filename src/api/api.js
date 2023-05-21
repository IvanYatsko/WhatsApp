import { HOST } from "./api.config";

export async function authorized({ idInstance, apiTokenInstance }) {
  // idInstance = "1101823121";
  // apiTokenInstance = "c827789af01c433389b1f3ce2840785358d79595d9ac4f6da0";
  try {
    const response = await fetch(
      `${HOST}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function sendMessage(instance, data = {}) {
  const { idInstance, apiTokenInstance } = instance || {};
  try {
    const response = await fetch(
      `${HOST}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function receiveNotification(instance) {
  const { idInstance, apiTokenInstance } = instance || {};
  try {
    const response = await fetch(
      `${HOST}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteNotification(instance, receiptId) {
  const { idInstance, apiTokenInstance } = instance || {};
  try {
    const response = await fetch(
      `${HOST}/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
  }
}
