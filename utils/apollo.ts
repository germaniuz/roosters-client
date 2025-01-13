export const getFieldName = (data: unknown) => Object.getOwnPropertyNames(data)[0];
export const getItems = <T>(data: Record<string, { items: T[] }>): T[] => data?.[getFieldName(data)]?.items ?? [];
