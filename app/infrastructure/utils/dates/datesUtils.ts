export const getDateFormatUTC = (date: string): Date => {
    const parts: any = date.match(/(\d+)/g);

    if (!parts || parts.length === 0) return new Date();

    return new Date(parts[0], parts[1], parts[2])
}