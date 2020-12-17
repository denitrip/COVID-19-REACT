export interface IdataField{
    title:string,
    count:number,
}

export interface IMainTableProps {
    className:string,
    payload:{
        sortedData: Array<IdataField>,
        country:string,
        
    },
    switchData:{
        onSwitchChange:Function,
        switchChecked:boolean
    }
} 