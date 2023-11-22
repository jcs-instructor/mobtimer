export class StringUtils {
    static splitAndTrim(string: string) {
        return string.split(",").map(x => x.trim()).filter(x => x !== "");
    }

    static splitTrimAndRejoin(string: string) {
        return StringUtils.splitAndTrim(string).join(",");
    }

    static areSameWhenTrim(commaSeparatedList1: string, commaSeparatedList2: string): boolean {
        return StringUtils.splitTrimAndRejoin(commaSeparatedList1) !== StringUtils.splitTrimAndRejoin(commaSeparatedList2);
    }
}