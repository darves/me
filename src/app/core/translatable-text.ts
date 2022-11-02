export interface TranslatableText<T = Object> {
  text: string;
  params?: T;
}

export const resolveTranslatableText = (
  data: string | TranslatableText
): TranslatableText => {
  if (data && (data as TranslatableText).text) {
    return {
      text: (data as TranslatableText).text,
      params: (data as TranslatableText).params,
    };
  }

  return {
    text: data as string,
  };
};
