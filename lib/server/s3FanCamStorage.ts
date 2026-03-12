import { randomBytes } from "node:crypto";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const FAN_CAM_S3_UPLOAD_URL_TTL_SECONDS = 10 * 60;
const STORAGE_SCOPE =
  process.env.VERCEL_ENV === "production"
    ? "production"
    : process.env.VERCEL_ENV === "preview"
      ? "preview"
      : "development";

const FAN_CAM_S3_PREFIX = `fan-cam/${STORAGE_SCOPE}`;
const FAN_CAM_STORAGE_PROVIDER = process.env.FAN_CAM_STORAGE_PROVIDER?.trim().toLowerCase() ?? "";
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET?.trim() ?? "";
const AWS_REGION =
  process.env.AWS_REGION?.trim() ??
  process.env.AWS_DEFAULT_REGION?.trim() ??
  "";
const AWS_S3_PUBLIC_BASE_URL = process.env.AWS_S3_PUBLIC_BASE_URL?.trim() ?? "";
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID?.trim() ?? "";
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY?.trim() ?? "";
const AWS_SESSION_TOKEN = process.env.AWS_SESSION_TOKEN?.trim() ?? "";

export const FAN_CAM_S3_MANIFEST_KEY = `${FAN_CAM_S3_PREFIX}/admin/fancam-manifest.json`;
export const FAN_CAM_S3_EDIT_TOKEN_MANIFEST_KEY = `${FAN_CAM_S3_PREFIX}/admin/fancam-edit-tokens.json`;
const isS3StorageEnabled = () => FAN_CAM_STORAGE_PROVIDER === "s3";

const toPathSegment = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "upload";

const encodeObjectKeyForUrl = (objectKey: string) =>
  objectKey
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

const hasCredentialSource = () =>
  Boolean(
    (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY) ||
      process.env.AWS_WEB_IDENTITY_TOKEN_FILE ||
      process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI ||
      process.env.AWS_CONTAINER_CREDENTIALS_FULL_URI
  );

const getS3Client = () => {
  if (!AWS_REGION || !AWS_S3_BUCKET || !hasCredentialSource()) {
    return null;
  }

  if (AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY) {
    return new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        sessionToken: AWS_SESSION_TOKEN || undefined,
      },
    });
  }

  return new S3Client({ region: AWS_REGION });
};

const getRequiredS3Client = () => {
  const client = getS3Client();
  if (!client) {
    throw new Error("fan cam s3 storage is not configured");
  }
  return client;
};

const bodyToText = async (body: unknown) => {
  if (!body) {
    return "";
  }

  if (typeof (body as { transformToString?: () => Promise<string> }).transformToString === "function") {
    return (body as { transformToString: () => Promise<string> }).transformToString();
  }

  const chunks: Buffer[] = [];
  for await (const chunk of body as AsyncIterable<Buffer | Uint8Array | string>) {
    if (typeof chunk === "string") {
      chunks.push(Buffer.from(chunk));
      continue;
    }
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf8");
};

const isObjectMissing = (error: unknown) => {
  const statusCode = (error as { $metadata?: { httpStatusCode?: number } })?.$metadata?.httpStatusCode;
  const name = (error as { name?: string })?.name;
  return statusCode === 404 || name === "NoSuchKey" || name === "NotFound";
};

const buildPublicUrl = (objectKey: string) => {
  const encodedKey = encodeObjectKeyForUrl(objectKey);

  if (AWS_S3_PUBLIC_BASE_URL) {
    try {
      const base = new URL(AWS_S3_PUBLIC_BASE_URL.endsWith("/") ? AWS_S3_PUBLIC_BASE_URL : `${AWS_S3_PUBLIC_BASE_URL}/`);
      return new URL(encodedKey, base).toString();
    } catch {
      // Fall through to default S3 URL.
    }
  }

  return `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${encodedKey}`;
};

export const isS3FanCamConfigured = () =>
  Boolean(isS3StorageEnabled() && AWS_REGION && AWS_S3_BUCKET && hasCredentialSource());

export async function createFanCamS3UploadTarget(input: {
  event: string;
  fileName: string;
  contentType: string;
  kind: "image" | "video";
}) {
  const client = getRequiredS3Client();
  const safeEvent = toPathSegment(input.event);
  const safeFileName = toPathSegment(input.fileName || `${input.kind}-upload`);
  const key = `${FAN_CAM_S3_PREFIX}/uploads/${safeEvent}/${Date.now()}-${randomBytes(6).toString("hex")}-${safeFileName}`;

  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: key,
    ContentType: input.contentType || "application/octet-stream",
    CacheControl: "public, max-age=31536000, immutable",
  });

  const uploadUrl = await getSignedUrl(client, command, {
    expiresIn: FAN_CAM_S3_UPLOAD_URL_TTL_SECONDS,
  });

  return {
    uploadUrl,
    publicUrl: buildPublicUrl(key),
    objectKey: key,
    expiresIn: FAN_CAM_S3_UPLOAD_URL_TTL_SECONDS,
  };
}

export async function readS3TextObject(key: string) {
  const client = getRequiredS3Client();
  try {
    const output = await client.send(
      new GetObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: key,
      })
    );

    if (!output.Body) {
      return null;
    }

    const text = await bodyToText(output.Body);
    return text || null;
  } catch (error) {
    if (isObjectMissing(error)) {
      return null;
    }

    throw error;
  }
}

export async function writeS3TextObject(input: {
  key: string;
  text: string;
  contentType: string;
  cacheControl?: string;
}) {
  const client = getRequiredS3Client();
  await client.send(
    new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: input.key,
      Body: input.text,
      ContentType: input.contentType,
      CacheControl: input.cacheControl ?? "no-cache",
    })
  );
}
