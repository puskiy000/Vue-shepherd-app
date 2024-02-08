import { format, isPast, isToday, isYesterday } from 'date-fns';

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const uid = (alphaNumeric = true, length = 10) => {
  let _length;

  if (length > 10) {
    _length = 10;
  } else if (length <= 0) {
    _length = 1;
  } else {
    _length = length;
  }

  return alphaNumeric
    ? Math.random()
        .toString(32)
        .slice(2, _length + 2)
    : Math.random()
        .toString()
        .slice(2, _length + 2);
};

export const getDateString = (date: Date): string => {
  if (isToday(date)) {
    return 'Today';
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else if (isPast(date)) {
    return format(date, 'do MMMM yyyy');
  }
  return '';
};

export const copierHandler = (copiedText = '', setSwitchView: any) => {
  navigator.clipboard.writeText(copiedText);
  setSwitchView(true);
  setTimeout(() => {
    setSwitchView(false);
  }, 700);
};
export const extractDataURIAndBase64 = (input: string) => {
  const regex = /(data:image\/(jpeg|jpg|png|svg);base64,.*)/;

  const match = input.match(regex);

  if (match) {
    const dataUri = match[1];

    const base64Data = dataUri.split(',')[1];

    const binaryData = atob(base64Data);

    return { base64Data, dataURI: `${dataUri.split(',')[0]}` };
  } else {
    return null;
  }
};
export const dataURItoFile = (dataURI, fileName) => {
  const type = dataURI.match(/^data:([A-Za-z-+/]+);base64/)[1];
  const byteString = atob(dataURI.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([arrayBuffer], { type });
  const file = new File([blob], fileName, { type });
  return file;
};
export const extractDataURI = (input: string) => {
  const regex = /(data:image\/(jpeg|jpg|png|svg);base64,.*)/;

  const match = input.match(regex);

  if (match) {
    const dataUri = match[1];
    return dataUri;
  } else {
    return null;
  }
};
const getDateStringTest = (date: any) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options as any);
};
export function encodeQueryParams(
  params: Record<string, string | string[]>
): string {
  const encodedParams = Object.entries(params).map(([key, value]) => {
    if (Array.isArray(value)) {
      const encodedValue = value
        .map((item) => encodeURIComponent(item))
        .join(',');
      return `${encodeURIComponent(key)}=${encodedValue}`;
    } else {
      const encodedValue = encodeURIComponent(value);
      return `${encodeURIComponent(key)}=${encodedValue}`;
    }
  });

  return `?${encodedParams.join('&')}`;
}
export const arrangeDataByDate = (data: any) => {
  return data.reduce((acc, item) => {
    const date = item.createdAt.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});
};
