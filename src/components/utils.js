async function getToken() {
  function toTimeStapm(expireDate) {
    const dateString = expireDate;
    const [datePart, timePart] = dateString.split(" ");

    const [day, month, year] = datePart.split(".");

    const formattedDateString = `${month}/${day}/${year} ${timePart}`;

    const dateObject = new Date(formattedDateString);

    const timestamp = dateObject.getTime();

    return timestamp;
  }

  function isExpiredToken() {
    let expireDate = localStorage.getItem("expireDate");
    if (!expireDate) {
      return true;
    }

    let expDate = toTimeStapm(expireDate);
    let currentDate = Date.now();

    if (expDate < currentDate) {
      return true;
    }
    return false;
  }

  if (
    !localStorage.getItem("expireDate") ||
    !localStorage.getItem("token") ||
    isExpiredToken
  ) {
    const resp = await fetch(import.meta.env.VITE_API_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          import.meta.env.VITE_CLIENT_ID + ":" + import.meta.env.VITE_SECRET_KEY
        )}`,
      },
      body: "grant_type=client_credentials",
    });

    const auth = await resp.json();
    const expireDate = getOneHourLater();
    localStorage.setItem("expireDate", expireDate);
    localStorage.setItem("token", auth.access_token);

    return {
      date: expireDate,
      token: auth.access_token,
    };
  } else {
    return {
      date: localStorage.getItem("expireDate"),
      token: localStorage.getItem("token"),
    };
  }
}

function getOneHourLater() {
  let currentDate = new Date();

  let oneHourLater = new Date(currentDate.getTime() + 3600000);

  let day = String(oneHourLater.getDate()).padStart(2, "0");
  let month = String(oneHourLater.getMonth() + 1).padStart(2, "0");
  let year = oneHourLater.getFullYear();

  let hours = String(oneHourLater.getHours()).padStart(2, "0");
  let minutes = String(oneHourLater.getMinutes()).padStart(2, "0");

  let formattedDateTime = `${day}.${month}.${year} ${hours}:${minutes}`;

  return formattedDateTime;
}

export { getToken };
