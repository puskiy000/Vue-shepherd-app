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
