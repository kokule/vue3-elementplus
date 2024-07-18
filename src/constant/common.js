import dayjs from "dayjs";

export const commonParams = {
    startTime: dayjs(new Date - 8652369540).format('YYYY-MM-DD'),
    endTime: dayjs(new Date).format('YYYY-MM-DD')
}