export class ProjectRegexes{
    static email:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$"
    static isbn:string = "^(97[89]\\d{10})$"
    static onlyOneWhiteSpaceBetweenWords:string = '^([A-Za-z0-9"-/@_ğüşöçıİĞÜŞÖÇ]+)(\\s[A-Za-z0-9"-/@_ğüşöçıİĞÜŞÖÇ]\\S*)*?$'
    static patternForPassword:string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])?[A-Za-z\\d@$!%*?&"-_]{5,}$'
}