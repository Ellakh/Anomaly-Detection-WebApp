import React from 'react'
//import Select from 'react-select/src/Select';

const option=[
    {label:'React',value:'react'},
    {label:'React',value:'react'}
]

function CustomSelect(props){
    return<div>
        <Select options={options}/>
    </div>
}

export default CustomSelect;