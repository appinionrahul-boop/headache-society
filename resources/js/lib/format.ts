import dayjs from 'dayjs';

export const formatDate = (iso: string, fmt = 'D MMM YYYY') => dayjs(iso).format(fmt);
