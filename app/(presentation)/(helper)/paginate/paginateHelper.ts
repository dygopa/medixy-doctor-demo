export const getSkipPagination = (obj: { page: number; limit: number }): number => {
    let skip = 0;

    skip = (obj.page * obj.limit) - obj.limit;

    return skip;
}