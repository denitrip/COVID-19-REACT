export interface IdataField{
    title:string,
    count:number,
}

export interface IMainTableProps {
    payload:{
        data: Array<IdataField>,
        country:string,
        
    },
    switchData:{
        onSwitchChange:Function,
        switchChecked:boolean
    }
    countryFlag:string,
} 