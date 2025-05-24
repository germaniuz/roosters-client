import { DAY_PART } from './../constants/date';

export const formatDate = (date: number | string | Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

export const getNameOfDayPart = (): Values<typeof DAY_PART> => {
    const now = new Date();
    const hour = now.getHours();

    switch (true) {
        case hour >= 6 && hour < 11:
            return DAY_PART.MORNING;
        case hour >= 11 && hour < 18:
            return DAY_PART.AFTERNOON;
        default:
            return DAY_PART.EVENING;
    }
};

export const calculateDurationInIntervals = (startTime: string, endTime: string): number => {
    const [startHours, startMinutes, startSeconds] = startTime.split(':').map(Number);
    const [endHours, endMinutes, endSeconds] = endTime.split(':').map(Number);
    const startDate = new Date(1970, 0, 1, startHours, startMinutes, startSeconds);
    const endDate = new Date(1970, 0, 1, endHours, endMinutes, endSeconds);
    const durationInMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

    return Math.floor(durationInMinutes / 15);
};

export const calculateStartTimeLine = (startTime: string): number => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;

    return Math.ceil(totalMinutes / 15) + 1;
};

export const getDateTimeISOString = (dateString: string) => {
    return dateString.replace(' ', 'T').slice(0, -3);
};

export const getNowIsoString = () => {
    const now = new Date();
    const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
    return (
        now.getFullYear() +
        '-' +
        pad(now.getMonth() + 1) +
        '-' +
        pad(now.getDate()) +
        'T' +
        pad(now.getHours()) +
        ':' +
        pad(now.getMinutes())
    );
};

export const isWithinDays = (targetDateString: string, days: number) => {
    const targetDate = new Date(targetDateString);
    const currentDate = new Date();
    const timeDifference = targetDate.getTime() - currentDate.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);
    return dayDifference >= 0 && dayDifference <= days;
};

export const getDateTimeString = (date: string) => {
    return new Date(date).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
};

export const getTimeString = (date: string) => {
    return new Date(date).toLocaleString('ru-RU', {
        hour: 'numeric',
        minute: 'numeric',
    });
};

export const getDateString = (date: string) => {
    return new Date(date).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};
