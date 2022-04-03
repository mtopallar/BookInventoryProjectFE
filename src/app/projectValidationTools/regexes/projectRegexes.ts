export class ProjectRegexes{
    static email:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$"
    static isbn:string = "^(97[89]\\d{10})$"
    static onlyOneWhiteSpaceBetweenWords:string = '^[A-Za-zĞÜŞİÖÇğüşıöç.\"\']+?([ ]([A-Za-zĞÜŞİÖÇğüşıöç.\"\'])+)*$'
    static patternForPassword:string = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])?[A-Za-z\\d@$!%*?&"-_]{5,}$'
    static onlyOneWhiteSpaceBetweenWordsForBookName:string = '^([A-Za-z0-9"-/ğüşöçıİĞÜŞÖÇ]+)(\\s[A-Za-z0-9"-/ğüşöçıİĞÜŞÖÇ]\\S*)*?$'
}

//onlyOneWhiteSpaceBetweenWords ad soyad gibi kullanımlar için sadece iki kelime arasında tek boşluğa izin veren, isim kısaltmaları veya lakaplar için özel karakter olarak sadece nokta, çift tırnak ve tek tırnağa izin veren pattern

//onlyOneWhiteSpaceBetweenWordsForBookName bu daha ziyade kitap adları için kullanacağım, yine birden fazla kelime ekleneckse sadece iki kelime arasında tek boşluğa izin veren, bunun yanında çoğu özel karaktere ve rakama da izin veren pattern.