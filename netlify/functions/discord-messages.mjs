import fetch from "node-fetch";
const DISCORD_API_URL = "https://discord.com/api/v9";
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

exports.handler = async (event) => {
  try {
    const channelID = event.queryStringParameters.channelID;

    const response = await fetch(
      `${DISCORD_API_URL}/channels/${channelID}/messages?limit=20`,
      {
        headers: {
          Authorization: `Bot ${BOT_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    if (data.code) {
      return {
        statusCode: data.code,
        body: JSON.stringify({ error: data.message }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
