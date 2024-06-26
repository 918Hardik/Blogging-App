import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const createBlog = () => {
  const [category,setCategory] = useState("");
  const [mainImage,setMainImage] = useState("");
  const [mainImagePreview,setmainImagePreview] = useState("");
  const [intro,setIntro] = useState("");
  
  const [paraOneTitle, setparaOneTitle] = useState("");
  const [paraTwoTitle, setparaTwoTitle] = useState("");
  const [paraThreeTitle, setparaThreeTitle] = useState("");
  const [paraOneImage, setparaOneImage] = useState("");
  const [paraTwoImage, setparaTwoImage] = useState("");
  const [paraThreeImage, setparaThreeImage] = useState("");
  const [paraOneImagePreview, setparaOneImagePreview] = useState("");
  const [paraTwoImagePreview, setparaTwoImagePreview] = useState("");
  const [paraThreeImagePreview, setparaThreeImagePreview] = useState("");

  const [ paraOneDescription ,setparaOneDescription ] = useState("");
  const [ paraTwoDescription ,setparaTwoDescription ] = useState("");
  const [ paraThreeDescription ,setparaThreeDescription ] = useState("");

  const [ title  , setTitle]= useState("");
  const [published , setPublished] = useState(true);

  const mainImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setmainImagePreview(reader.result);
      setMainImage(file);
    };
  };
  
  

  const paraOneImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setparaOneImagePreview(reader.result);
      setparaOneImage(file);
    };
  };
  

  const paraTwoImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setparaTwoImagePreview(reader.result);
      setparaTwoImage(file);
    };
  };
  

  const paraThreeImageImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setparaThreeImagePreview(reader.result);
      setparaThreeImage(file);
    };
  };

  const handleBlog = async(e)=>{
    e.preventDefault();
    const formData= new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("mainImage", mainImage);
    formData.append("intro", intro);
    formData.append("published", published);
    if(paraOneTitle.length >0){
      formData.append("paraOneTitle" , paraOneTitle)
    }
    if(paraTwoTitle.length >0){
      formData.append("paraTwoTitle" , paraTwoTitle)
    }
    if(paraThreeTitle.length >0){
      formData.append("paraThreeTitle" , paraThreeTitle)
    }
    if(paraOneImage){
      formData.append("paraOneImage",paraOneImage)
    }
    if(paraTwoImage){
      formData.append("paraTwoImage",paraTwoImage)
    }
    if(paraThreeImage){
      formData.append("paraThreeImage",paraThreeImage)
    }
    if(paraOneDescription.length>0){
      formData.append("paraOnedescription",paraOneDescription)
    }
    if(paraTwoDescription.length>0){
      formData.append("paraTwodescription",paraTwoDescription)
    }
    if(paraThreeDescription.length>0){
      formData.append("paraThreedescription",paraThreeDescription)
    }
    try{
      const {data} = await axios.post("http://localhost:4000/api/v1/blog/post",formData,{withCredentials:true , headers:{"Content-Type":"multipart/form-data"}});
      setTitle("");
      setIntro("");
      setMainImage("");
      setCategory("");
      setmainImagePreview("");
      setparaOneImage("");
      setparaOneImagePreview("");
      setparaOneTitle("");
      setparaOneDescription("");
      setparaTwoImage("");
      setparaTwoImagePreview("");
      setparaTwoTitle("");
      setparaTwoDescription("");
      setparaThreeImage("");
      setparaThreeImagePreview("");
      setparaThreeTitle("");
      setparaThreeDescription("");
      setPublished(true);
      toast.success(data.message);
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  }
  
  return (
    <>
    <section className='create-blog'> 
    <h3>Create Blog</h3>
    <div className="container">
      <form onSubmit={handleBlog}>
        <div className="category-box">
          <label>Category</label>
          <select value={category} onChange={(e)=>setCategory(e.target.value)} >
            <option value="">Select Blog Category</option>
            <option value="LifeStyle">LifeStyle</option>
            <option value="Techonlogy">Technology</option>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
            <option value="Travel">Travel</option>
            <option value="Sports">Sports</option>
           
          </select>
        </div>
        <input type="text" placeholder='Blog main title' value={title} onChange={(e)=> setTitle(e.target.value)}/>
        <div style={{display:"flex" , flexDirection : "column" }}>
          <label>Blog Main Image</label>
          <img src={mainImagePreview ? `${mainImagePreview}`:"./insert-image.png"} alt="mainImage" />
          <input type="file" onChange={mainImageHandler}  style={{border:"none"}}/>
        </div>
        <textarea rows={25} className='intro' placeholder='Blog Intro....' value={intro} onChange={(e)=>setIntro(e.target.value)}></textarea>
        {/* paraone */}
        <div className="sub-para">
          <input type="text" placeholder='Paragraph one Title' value={paraOneTitle} onChange={(e)=>setparaOneTitle(e.target.value)} />
        
        <img src={paraOneImagePreview ? `${paraOneImagePreview}` : "./insert-image.png"} alt="paraImage" />
        <input type="file" onChange={paraOneImageHandler} style={{border:"none"}} />
        <textarea rows='10' placeholder='Blog first paragraph comes here' value={paraOneDescription} onChange={(e)=>setparaOneDescription(e.target.value)}></textarea>
        </div>
        {/* paratwo */}
        <div className="sub-para">
          <input type="text" placeholder='Paragraph Two Title' value={paraTwoTitle} onChange={(e)=>setparaTwoTitle(e.target.value)} />
        
        <img src={paraTwoImagePreview ? `${paraTwoImagePreview}` : "./insert-image.png"} alt="paraImage" />
        <input type="file" onChange={paraTwoImageHandler} style={{border:"none"}} />
        <textarea rows='10' placeholder='Blog second paragraph comes here' value={paraTwoDescription} onChange={(e)=>setparaTwoDescription(e.target.value)}></textarea>
        </div>
        {/* parathree */}
        <div className="sub-para">
          <input type="text" placeholder='Paragraph Three Title' value={paraThreeTitle} onChange={(e)=>setparaThreeTitle(e.target.value)} />
        
        <img src={paraThreeImagePreview ? `${paraThreeImagePreview}` : "./insert-image.png"} alt="paraImage" />
        <input type="file" onChange={paraThreeImageImageHandler} style={{border:"none"}} />
        <textarea rows='10' placeholder='Blog three paragraph comes here' value={paraThreeDescription} onChange={(e)=>setparaThreeDescription(e.target.value)}></textarea>
        </div>
        <div className="publish_box">
          <label>Wants to publish now?</label>
          <select value={published} onChange={(e)=> setPublished(e.target.value)}>
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>

        </div>
        <button type='submit ' className='create-btn'>Create Blog</button>
      </form>

    </div>
      </section></>
  )
}

export default createBlog