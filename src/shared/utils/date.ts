export const getFormatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = ("0" + date.getMonth()).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    const hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).substr(-2);

    return `${day}.${month}.${year} ${hours}:${minutes}`;
};