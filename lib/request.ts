"use server";

import { revalidateTag, revalidatePath } from "next/cache";

export type FetcherResponse<T> = {
  data: T;
  error?: any;
  success?: boolean;
};

export async function fetcher<T>({
  url,
  tag,
}: {
  url: string;
  tag: string;
}): Promise<FetcherResponse<T>> {
  const urlData = process.env.NEXT_PUBLIC_API_URL + url;
  try {
    const response = await fetch(urlData, {
      method: "GET",
      next: {
        tags: ["get-task"],
      },
    });

    const responseData: T = await response.json();

    return { data: responseData };
  } catch (error) {
    return { error, data: undefined as T };
  }
}

export async function poster<T>({
  url,
  body,
  tag,
  pathName,
}: {
  url: string;
  body: any;
  tag: string;
  pathName: string;
}) {
  const urlData = process.env.NEXT_PUBLIC_API_URL + url;

  try {
    const response = await fetch(urlData, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    revalidateTag(tag);
    revalidatePath(pathName);
    return { data: responseData, success: true };
  } catch (error) {
    return { error, data: undefined as T, success: false };
  }
}
export async function put<T>({
  url,
  body,
  tag,
  pathName,
}: {
  url: string;
  body: any;
  tag: string;
  pathName: string;
}) {
  const urlData = process.env.NEXT_PUBLIC_API_URL + url;

  try {
    const response = await fetch(urlData, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    revalidateTag(tag);
    revalidatePath(pathName);
    return { data: responseData, success: true };
  } catch (error) {
    return { error, data: undefined as T, success: false };
  }
}

export async function deleter<T>({
  url,
  tag,
  pathName,
  body,
}: {
  url: string;
  tag: string;
  pathName: string;
  body: any;
}) {
  const urlData = process.env.NEXT_PUBLIC_API_URL + url;

  try {
    const response = await fetch(urlData, {
      method: "DELETE",
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    if (response.ok) {
      revalidatePath(pathName);
    }
    return { data: responseData, success: true };
  } catch (error) {
    return { error, data: undefined as T, success: false };
  }
}
