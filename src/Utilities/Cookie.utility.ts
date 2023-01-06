const clientSetCookie = (cname: string, cvalue: string, expiredTime?: number) => {
  if (expiredTime) {
    const d = new Date();
    d.setTime(expiredTime);
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${cname}=${cvalue};expires=${expires};path=/`;

    return;
  }
  document.cookie = `${cname}=${cvalue};path=/`;
};

const clientDeleteCookieByName = (cname: string) => {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

  return true;
};

const clientGetCookieByName = (cname: string) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return false;
};

export const CookieUtility = {
  clientSetCookie,
  clientDeleteCookieByName,
  clientGetCookieByName
};
