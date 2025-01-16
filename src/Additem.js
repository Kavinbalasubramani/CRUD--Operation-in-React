import { FaPlus } from "react-icons/fa";
export const Additem = ({newitem ,setNewitem,handleSubmit})=> {
    return(
        <form className="addForm" onSubmit={handleSubmit}>
            <label htmlFor="additem"> </label>
            <input
             autoFocus
             id='additem'
             type='text'
             placeholder='Add item'
             value={newitem}
             onChange={(e)=>{setNewitem(e.target.value)}}
             required
            
            />
        <button type="submit">
            <FaPlus />
        </button>
        </form>
        
    )
    
}