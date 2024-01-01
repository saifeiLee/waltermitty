import dayjs from "dayjs";
import Cookies from "js-cookie";

export const TokenKey = "mx-token";

export function getToken(): string | null {
  const token = Cookies.get(TokenKey);
  return token ? `bearer ${token}` : null;
}

export function setToken(token: string) {
  if (typeof token !== "string") return;
  return Cookies.set(TokenKey, token, {
    expires: 14,
  });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

const LikePrefix = "mx-like";
function getLikes() {
  return decodeURIComponent(Cookies.get(LikePrefix) || "");
}

/**
 * 设置likeId,需要考虑2种情况：
 *  1. 没有设置过like
 *  2. 设置过like
 *      a. 设置过like，但是没有likeId
 *      b. 设置过like，有likeId
 * @param id
 * @returns
 */
export function setLikeId(id: string) {
  const has = getLikes();
  if (!has) {
    Cookies.set(LikePrefix, JSON.stringify([id]), { expires: getTomorrow() });
  } else {
    if (isLikedBefore(id)) {
      return;
    }
    Cookies.set(LikePrefix, JSON.stringify([...JSON.parse(has), id]), {
      expires: getTomorrow(),
    });
  }
}

export function isLikedBefore(id: string) {
  const has = getLikes();
  if (!has) {
    return false;
  }
  const likes = JSON.parse(has);
  return likes.includes(id);
}

function getTomorrow() {
  return dayjs().add(1, "day").toDate();
}
