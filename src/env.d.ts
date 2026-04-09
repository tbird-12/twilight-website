/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.png' {
  const value: ImageMetadata;
  export default value;
}

declare module '*.jpg' {
  const value: ImageMetadata;
  export default value;
}

declare module '*.jpeg' {
  const value: ImageMetadata;
  export default value;
}

declare module '*.webp' {
  const value: ImageMetadata;
  export default value;
}

declare module '*.svg' {
  const value: ImageMetadata;
  export default value;
}
