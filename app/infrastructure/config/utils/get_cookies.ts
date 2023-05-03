import { cookies } from "next/headers";

export const getAccessToken = cookies!().has('access_token') ? cookies!().get('access_token') : ""