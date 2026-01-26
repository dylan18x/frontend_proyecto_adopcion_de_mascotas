import { api } from "./api";

export async function loginApi(payload: {
  username: string;
  password: string;
}): Promise<string> {
  const { data } = await api.post<{ access_token: string }>(
    "/auth/login",
    payload
  );

  return data.access_token;
}

export async function registerApi(payload: {
  username: string;
  email: string;
  password: string;
}): Promise<string> {
  const { data } = await api.post<{ access_token: string }>(
    "/auth/register",
    payload
  );

  return data.access_token;
}
