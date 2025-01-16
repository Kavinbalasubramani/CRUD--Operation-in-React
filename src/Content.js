import React from 'react';
import { FaRegTrashAlt } from "react-icons/fa";

const Content=({items,handlechange,handleDelete})=>
{
    return(
            <main>
                <ul>
                {
                    items.length ?(
                                    items.map((item)=>(
                            <li className='item' key={item.id} >
                                <input type='checkbox' onChange={()=>handlechange(item.id)} checked={item.checked}/>
                                <label>{item.item}</label>
                                <button onClick={()=> handleDelete(item.id)}><FaRegTrashAlt role='button' tabIndex='0'/></button>
                            </li>
                        ))
                    ):   <p>your is empty</p>
                 
                }
                </ul>
            </main>
    )
}
export default Content;