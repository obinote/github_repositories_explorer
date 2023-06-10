export interface FormValues {
    keywords: string,
    loading: boolean,
    submited: boolean
}

export interface DataList {
    login: string,
    repos_url: string
}

export interface ReposData {
    login: string,
    id: number,
    name: string,
    stargazers: number,
    description: string
}

export interface ComponentProps {
    keyword: string
    dataList: DataList[]
}