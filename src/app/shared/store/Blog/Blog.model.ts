export interface BlogModel{
    id: string,
    title: string,
    description: string
}


export interface Blogs{
    bloglist: BlogModel[],
    errorMessage: string
}