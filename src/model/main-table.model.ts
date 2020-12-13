export interface IdataField{
    title:string,
    count:number,
}

export interface IMainTableProps {
    className:string,
    payload:{
        country:string,
        data: Array<IdataField>,
    },
    switchData:{
        onSwitchChange:Function,
        switchChecked:boolean
    }
} 