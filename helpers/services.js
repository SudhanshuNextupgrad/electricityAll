export async function verifyData() {
  const token = localStorage.getItem("token");
  try {
    const data = await fetch(process.env.NEXT_PUBLIC_SITE_URL + "verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const result = await data.json();
    return result;
  } catch (err) {
    return err;
  }
}

//function for get
export async function getData(route) {
  try {
    const data = await fetch(process.env.NEXT_PUBLIC_SITE_URL + route);
    const result = await data.json();
    return result;
  } catch (err) {
    return err;
  }
}

//function for post
export async function postData(route, postObject) {
  const token = localStorage.getItem("token");
  try {
    const data = await fetch(process.env.NEXT_PUBLIC_SITE_URL + route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(postObject),
    });
    const result = await data.json();
    return result;
  } catch (err) {
    return err;
  }
}

//function for post
export async function putData(route, putObject) {
  const token = localStorage.getItem("token");
  try {
    const data = await fetch(process.env.NEXT_PUBLIC_SITE_URL + route, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(putObject),
    });
    const result = await data.json();
    return result;
  } catch (err) {
    return err;
  }
}

//function for delete
export async function deleteData(route, deleteObject) {
  const token = localStorage.getItem("token");
  try {
    const data = await fetch(process.env.NEXT_PUBLIC_SITE_URL + route, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(deleteObject),
    });
    const result = await data.json();
    return result;
  } catch (err) {
    return err;
  }
}
