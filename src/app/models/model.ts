export class SummaryData {
    Global: GlobalData;
    Countries: Array<CountryData>;
    Date: Date;
}

export class GlobalData {
    NewConfirmed: number;
    NewDeaths: number;
    NewRecovered: number;
    TotalConfirmed: number;
    TotalDeaths: number;
    TotalRecovered: number
}

export class CountryData extends GlobalData {
    Country: string;
    CountryCode: string;
    Date: Date;
    Slug: string
}

export class News{
    articles: Article[];
    status: string;
    totalResults: number;
}

export class Article{
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
}