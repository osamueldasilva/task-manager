"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

export type FetcherResponse<T> = {
  data: T;
  error?: any;
  success?: boolean;
};

export async function fetcher<T>({
  url,
}: {
  url: string;
}): Promise<FetcherResponse<T>> {
  const urlData = process.env.NEXT_PUBLIC_API_URL + url;
  try {
    const response = await axios.get<T>(urlData, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    return { data: response.data };
  } catch (error) {
    return { error, data: undefined as T };
  }
}

export async function poster<T>({
  url,
  body,

  pathName,
}: {
  url: string;
  body: any;

  pathName: string;
}) {
  const urlData = process.env.NEXT_PUBLIC_API_URL + url;

  try {
    const response = await axios.post(urlData, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath(pathName);
    return { data: response.data, success: true };
  } catch (error) {
    return { error, data: undefined as T, success: false };
  }
}

export async function put<T>({
  url,
  body,

  pathName,
}: {
  url: string;
  body: any;

  pathName: string;
}) {
  const urlData = process.env.NEXT_PUBLIC_API_URL + url;

  try {
    const response = await axios.put(urlData, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath(pathName);
    return { data: response.data, success: true };
  } catch (error) {
    return { error, data: undefined as T, success: false };
  }
}

export async function deleter<T>({
  url,

  pathName,
  body,
}: {
  url: string;

  pathName: string;
  body: any;
}) {
  const urlData = process.env.NEXT_PUBLIC_API_URL + url;

  try {
    const response = await axios.delete(urlData, {
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      revalidatePath(pathName);
    }
    return { data: response.data, success: true };
  } catch (error) {
    return { error, data: undefined as T, success: false };
  }
}
