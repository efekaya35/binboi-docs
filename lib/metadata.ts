import type { Metadata } from "next";

import {
  PRODUCT_DESCRIPTION,
  PRODUCT_NAME,
  PRODUCT_SHORT_DESCRIPTION,
} from "@/constants";
import { env } from "@/lib/env";

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
};

/**
 * Builds consistent page metadata for the Binboi app.
 */
export function createMetadata({
  title,
  description = PRODUCT_SHORT_DESCRIPTION,
  path = "/",
}: MetadataInput = {}): Metadata {
  const fullTitle = title ? `${title} | ${PRODUCT_NAME}` : PRODUCT_NAME;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(env.appUrl),
    openGraph: {
      title: fullTitle,
      description,
      siteName: PRODUCT_NAME,
      type: "website",
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description || PRODUCT_DESCRIPTION,
    },
  };
}
