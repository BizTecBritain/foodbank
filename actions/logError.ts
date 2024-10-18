"use server";

import { getServerAuthSession } from "@/auth";
import { logger } from "@/services/logger";

export async function logError(
  message: string,
  meta: { [key: string]: any } = {},
) {
  const user = await getServerAuthSession();

  logger.error(message, { ...meta, user: user?.user });
}
