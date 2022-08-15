type RootState ={
    recordList: RecordItem[],
    createRecordError: Error | null,
    createTagError: Error | null,
    tagList: Tag[],
    currentTag: undefined | Tag
}

type RecordItem = {
    tags: Tag[],
    notes: string,
    type: string,
    amount: number,
    createAt?: string
}

type Tag = {
    id: string,
    name: string
}

type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated'
    update: (id: string, name: string) => 'success' | 'duplicated' | 'not found'
    remove:(id:string)=> boolean
    save: () => void
}
