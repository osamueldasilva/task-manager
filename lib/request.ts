"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import axios from "axios";

export type FetcherResponse<T> = {
  data: T;
  error?: any;
  success?: boolean;
};

export async function fetcher<T>({
  url,
  login = false,
}: {
  url: string;
  login?: boolean;
}): Promise<FetcherResponse<T>> {
  const session = await getServerSession();
  console.log("🚀 ~ session:", session);
  if (!session?.user && !login) {
    return {
      error: {
        status: 401,
        message: "Sua sessão expirou. Por favor, faça login novamente.",
      },
      data: undefined as T,
    };
  }

  const urlData = process.env.NEXT_PUBLIC_API_URL + url;
  try {
    const response = await axios.get<T>(urlData, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    return { data: response.data };
  } catch (error) {
    return { data: undefined as T };
  }
}

export async function poster<T>({
  url,
  body,
  pathName,
  login = false,
}: {
  url: string;
  body: any;
  pathName: string;
  login?: boolean;
}) {
  const session = await getServerSession();
  if (!session?.user && !login) {
    return {
      error: {
        status: 401,
        message: "Sua sessão expirou. Por favor, faça login novamente.",
      },
      data: undefined as T,
      success: false,
    };
  }

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
    return { data: undefined as T, success: false };
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
  const session = await getServerSession();
  if (!session?.user) {
    return {
      error: {
        status: 401,
        message: "Sua sessão expirou. Por favor, faça login novamente.",
      },
      data: undefined as T,
      success: false,
    };
  }

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
    return { data: undefined as T, success: false };
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
  const session = await getServerSession();
  if (!session?.user) {
    return {
      error: {
        status: 401,
        message: "Sua sessão expirou. Por favor, faça login novamente.",
      },
      data: undefined as T,
      success: false,
    };
  }

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
    return { data: undefined as T, success: false };
  }
}
