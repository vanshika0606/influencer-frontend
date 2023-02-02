import React, { useEffect, useState } from 'react'
import './style.css'
import {BiSearchAlt2} from 'react-icons/bi'
import {BsFillArrowLeftCircleFill} from "react-icons/bs"

const Lists = ({list,del, setDel,setList, setView, setUpdate, setId,
setUpdateData,update}) => {

    const [search,setSearch]= useState("")
    const [sort, setSort]= useState("")


    const handleInput = (e)=>{
        
        setSearch(e.target.value)
        
     }

    const GetList=async()=>{
        

     const res= await fetch("https://influence-backend.onrender.com/get").then((res)=>{
        return res.json()
     })
     
     setList(res.influencers)
    }

    useEffect(()=>{
        GetList()
    },[del, update])

    const Search = async()=>{
        const res= await fetch(`https://influence-backend.onrender.com/search?name=${search}&sort=${sort}`).then((res)=>{
            return res.json()
         })
         
         setList(res.influencer)
    }
    


    useEffect(()=>{

        Search()

    },[search,sort])


  return (
    <div className='back'>
        <button 
        onClick={()=>{
            setView(false)
        }}
        className='back-button'>
        <BsFillArrowLeftCircleFill
        style={{fontSize:'15px', paddingRight:'10px'}}/>
        Back</button>
        <div className='search-div'>
        <BiSearchAlt2
        style={{fontSize:"20px"}}/>
            <input  name="search" id="search" type="text" placeholder={`Search by name or social media handle`}
            onChange={handleInput}
            
             />
        </div>
        <div className='table-box'>
            <div className='sort-div'>
        <select
        name="sort"
        className="sort"
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          console.log(sort)
        }}
      >
        <option value="">Select sort field</option>
        <option value="name" >Name</option>
        <option value="social_media">Social media handle</option>
        <option value="follower_No">Followers</option>
        
        </select>  
        </div>      
      <table className='table'>
  <thead>
    
    <tr>
      <th >SR NO.</th>
      <th >NAME</th>
      <th >SOCIAL MEDIAL HANDLE</th>
      <th >FOLLOWERS</th>
      <th >UPDATE / DELETE</th>
    </tr>

  </thead>

  <tbody>
    { list && list.map( (r,ind)=>{
       return <tr key={r._id}>
       <td>{ind+1}</td>
       <td>{r.name}</td>
       <td>{r.social_media}</td>
       <td>{r.follower_No}</td>
       <td>
       <i className="fa fa-pencil-square-o edit" aria-hidden="true" onClick={()=>{

        setUpdateData({
            name:r.name,
            social_media:r.social_media,
            follower_No:r.follower_No
        })
        setId(r._id);

        setUpdate(true);

       }}></i>
       
       <i className="fa fa-trash delete" aria-hidden="true"
       onClick={()=>{
        
        fetch('https://influence-backend.onrender.com/delete/' +r._id, {
      method: 'DELETE',
    })

    setDel(!del)
    // toast.success("Row deleted successfully!")

       }}
       ></i>

       </td>
     </tr>

    })
    
    }
   
  </tbody>
    
 
</table>

    </div>
{ !list || (list.length==0 ? <h3>OOPS! nothing is here</h3>:'')}
    
      
    </div>
  )
}

export default Lists
