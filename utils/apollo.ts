export const getFieldName = (data: any) => Object.getOwnPropertyNames(data)[0];
export const getItem = <T>(data: any): T => data?.[getFieldName(data)];
// TODO refactor data type
