import './App.css';
import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';
import { Additem } from './Additem.js';
import { useEffect, useState } from 'react';
import apiRequest from './apiRequest.js';
import SearchContent from './SearchContent.js';

function App() {
  const API_URL="http://localhost:3500/items";
  const [items,setItems]=useState([])
  const[fetchError,setFetchError]=useState(null)
  const[isLoading,setIsLoading]=useState(true)
  const[search,setSearch]=useState('')


const addItem= async(item)=>
{
const id=items.length ? String(parseInt(items[items.length-1].id )+1) : 1;
const Addnewitem={id,checked:false,item}
const listItems=[...items, Addnewitem];
setItems(listItems);


const postoptions={
  method :'POST',
  headers:{
    'content-type': 'application/json'
  },
  body:JSON.stringify(Addnewitem)
}

const result=await apiRequest(API_URL,postoptions)

if(result)
   setFetchError(result)
}


const handlechange = async(id)=>{
    const listItems=items.map((item)=>(
        item.id === id ? {...item, checked: !item.checked} : item
    ))
    setItems(listItems);
    const myItem=listItems.filter((item)=>item.id===id)
    const updateOptions={
      method:'PATCH',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify({checked:myItem[0].checked})
    }
    const requrl=`${API_URL}/${id}`
    const result= await apiRequest(requrl,updateOptions)
    if(result) setFetchError(result)
}

useEffect( ()=>
{
  const fetchItems=async()=>{
    try{
      const respones= await fetch(API_URL);
      if(!respones.ok) throw Error("Data is not received");
      const listItems= await respones.json();
      setItems(listItems)
      setFetchError(null)
    }
    catch(err)
    {
      setFetchError(err.message);
    }
    finally{
      setIsLoading(false);
    }
    
  }
  setTimeout(()=>(async()=>await fetchItems())(),2000)
}, [])


const handleDelete=async(id)=>{
    const listItems=items.filter((item)=>
    (
        item.id!==id
    ))
    setItems(listItems);
    const deleteOptions={
      method:'DELETE'
    }
    const requrl=`${API_URL}/${id}`
    const result= await apiRequest(requrl,deleteOptions)
    if(result) setFetchError(result)
    }
  const[newitem,setNewitem]=useState('')
  
  function handleSubmit(e)
    {
        e.preventDefault();
        console.log(newitem);
        addItem(newitem)
        setNewitem('')
    }
  return (
    <div className='App'>
      <Header />
      <Additem 
      newitem={newitem}
      setNewitem={setNewitem}
      handleSubmit={handleSubmit}
      />
      <SearchContent 
      search={search}
      setSearch={setSearch}/>
      
      <main>
        {
        isLoading && <p>loading item.....</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && <Content 
        items={items.filter((item)=>(item.item).includes(search))}
        handlechange={handlechange}
        handleDelete={handleDelete}
      />}
      </main>
      <Footer />


    </div>
  )
}

export default App;
