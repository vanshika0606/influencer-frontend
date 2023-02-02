import React ,{useState, useEffect} from 'react'
import './style.css'

const Form = ({setList , setView , del, submitButton, update, url, influencer, setInfluencer,method, setUpdate}) => {

   

    let name, value;
    const handleInput = (e)=>{
       name= e.target.name
       value= e.target.value
       setInfluencer({...influencer,[name]:value})
       
    }


    const submit = async(e)=>{


        e.preventDefault()

        const { name,social_media, follower_No} = influencer;

        const res = await fetch(`http://localhost:3000/${url}`,{
            method:`${method}`,
            headers:{
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
          
                name,social_media, follower_No
              })
             
          })
          

           const result = await res.json();
           const msg = result.message;

           setInfluencer({
            name:"",
            social_media:"",
            follower_No:""
           })

        setUpdate(false)

    }
    
    
    
    

    
    return (
      <>
    
      {console.log(influencer)}
    
    <div className={update!==true?'back':'update-form'}>
   { !update && <button className='view' 
    onClick={
      ()=>{

        setView(true)
      }
    }
    >
            View List of Influencers
    </button>
}
      
     
      <form  className="add-form" method="POST">
            
            <input  name="name" id="name" type="text" placeholder='Name'
            onChange={handleInput}
            value={influencer.name}
             />
            <br/>

            
            <input  name="social_media" id="social"  type="text"
            onChange={handleInput} 
            value={influencer.social_media}
            placeholder='Social media handle'
            />
            <br/>

           
            <input  name="follower_No" 
            value={influencer.follower_No}
             type="number" 
             placeholder='Followers'
             onChange={handleInput} 
             />
            <br/>
            

            <input type="submit" value={submitButton} readOnly onClick={submit}/>
            
        </form>
     

    </div>
    </>
  )
}

export default Form
