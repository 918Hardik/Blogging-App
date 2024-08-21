import axios from 'axios';
import React, { useContext, useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Context } from '../../main';

const UpdateBlog = () => {
  const { id } = useParams();
  const [category, setCategory] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [mainImagePreview, setmainImagePreview] = useState("");
  const [intro, setIntro] = useState("");

  const [paraOneTitle, setparaOneTitle] = useState("");
  const [paraTwoTitle, setparaTwoTitle] = useState("");
  const [paraThreeTitle, setparaThreeTitle] = useState("");
  const [paraOneImage, setparaOneImage] = useState("");
  const [paraTwoImage, setparaTwoImage] = useState("");
  const [paraThreeImage, setparaThreeImage] = useState("");
  const [paraOneImagePreview, setparaOneImagePreview] = useState("");
  const [paraTwoImagePreview, setparaTwoImagePreview] = useState("");
  const [paraThreeImagePreview, setparaThreeImagePreview] = useState("");

  const [paraOneDescription, setparaOneDescription] = useState("");
  const [paraTwoDescription, setparaTwoDescription] = useState("");
  const [paraThreeDescription, setparaThreeDescription] = useState("");

  const [title, setTitle] = useState("");
  const [published, setPublished] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`https://blogging-app-backend-mqk7.onrender.com/api/v1/blog/singleblog/${id}`, { withCredentials: true });
        setTitle(data.blog.title);
        setIntro(data.blog.intro);
        setMainImage(data.blog.mainImage.url);
        setCategory(data.blog.category);


        setparaOneTitle(data.blog.paraOneTitle);
        setparaOneDescription(data.blog.paraOneDescription);
        setparaTwoTitle(data.blog.paraTwoTitle);
        setparaTwoDescription(data.blog.paraTwoDescription);
        setparaThreeTitle(data.blog.paraThreeTitle);
        setparaThreeDescription(data.blog.paraThreeDescription);
        data.blog.paraOneImage && setparaOneImage(data.blog.paraOneImage);
        data.blog.paraTwoImage && setparaTwoImage(data.blog.paraTwoImage);
        data.blog.paraThreeImage && setparaThreeImage(data.blog.paraThreeImage);
        setPublished(data.blog.published);
      }
      catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("title", title);
    updatedData.append("category", category);
    updatedData.append("intro", intro);
    updatedData.append("mainImage", mainImage);
    updatedData.append("published", published);

    if (paraOneTitle) {
      updatedData.append("paraOneTitle", paraOneTitle)
    }
    if (paraOneDescription && paraOneDescription.length > 0) {
      updatedData.append("paraOneDescription", paraOneDescription)
    }
    if (paraOneImage) {
      updatedData.append("paraOneImage", paraOneImage)
    }
    if (paraTwoTitle) {
      updatedData.append("paraTwoTitle", paraTwoTitle)
    }
    if (paraTwoDescription && paraTwoDescription.length > 0) {
      updatedData.append("paraTwoDescription", paraTwoDescription)
    }
    if (paraTwoImage) {
      updatedData.append("paraTwoImage", paraTwoImage)
    }
    if (paraThreeTitle) {
      updatedData.append("paraThreeTitle", paraThreeTitle)
    }
    if (paraThreeDescription && paraThreeDescription.length > 0) {
      updatedData.append("paraThreeDescription", paraThreeDescription)
    }
    if (paraThreeImage) {
      updatedData.append("paraThreeImage", paraThreeImage)
    }

    try {
      const { data } = await axios.put(`https://blogging-app-backend-mqk7.onrender.com/api/v1/blog/update/${id}`, updatedData, { withCredentials: true });
      toast.success(data.message);
    }
    catch (error) {
      toast.error(error.response.data.message);
    }

  }
  const mainImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setmainImagePreview(reader.result);
      setMainImage(file);
    }
  }
  const paraOneImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setparaOneImagePreview(reader.result);
      setparaOneImage(file);
    }
  }
  const paraTwoImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setparaTwoImagePreview(reader.result);
      setparaTwoImage(file);
    }
  }
  const paraThreeImagePreviewHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setparaThreeImagePreview(reader.result);
      setparaThreeImage(file);
    };
  };
  const { mode } = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="update-blog">
        <h3>UPDATE BLOG</h3>
        <form>
          <div className="category-box">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} >
              <option value="">Select Blog Category</option>
              <option value="LifeStyle">LifeStyle</option>
              <option value="Techonlogy">Technology</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="Travel">Travel</option>
              <option value="Sports">Sports</option>

            </select>
          </div>
          <input type="text" placeholder='Blog main title' value={title} onChange={(e) => setTitle(e.target.value)} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Blog Main Image</label>
            <img src={mainImagePreview ? `${mainImagePreview}` : mainImage ? `${mainImage}`:"/imgpl.webP"} alt="mainImage" />
            <input type="file" onChange={mainImagePreviewHandler} style={{ border: "none" }} />
          </div>
          <textarea rows={25} className='intro' placeholder='Blog Intro....' value={intro} onChange={(e) => setIntro(e.target.value)}></textarea>
          {/* paraone */}
          <div className="sub-para">
            <input type="text" placeholder='Paragraph one Title' value={paraOneTitle} onChange={(e) => setparaOneTitle(e.target.value)} />

            <img src={paraOneImagePreview ? `${paraOneImagePreview}` : paraOneImage ? `${paraOneImage}`:"/imgpl.webP"} alt="paraImage" />
            <input type="file" onChange={paraOneImagePreviewHandler} style={{ border: "none" }} />
            <textarea rows='10' placeholder='Blog first paragraph comes here' value={paraOneDescription} onChange={(e) => setparaOneDescription(e.target.value)}></textarea>
          </div>
          {/* paratwo */}
          <div className="sub-para">
            <input type="text" placeholder='Paragraph Two Title' value={paraTwoTitle} onChange={(e) => setparaTwoTitle(e.target.value)} />

            <img src={paraTwoImagePreview ? `${paraTwoImagePreview}` :paraTwoImage? `${paraTwoImage}`:"/imgpl.webP"} alt="paraImage" />
            <input type="file" onChange={paraTwoImagePreviewHandler} style={{ border: "none" }} />
            <textarea rows='10' placeholder='Blog second paragraph comes here' value={paraTwoDescription} onChange={(e) => setparaTwoDescription(e.target.value)}></textarea>
          </div>
          {/* parathree */}
          <div className="sub-para">
            <input type="text" placeholder='Paragraph Three Title' value={paraThreeTitle} onChange={(e) => setparaThreeTitle(e.target.value)} />

            <img src={paraThreeImagePreview ? `${paraThreeImagePreview}` :paraThreeImage ? `${paraThreeImage}`:"/imgpl.webP"} alt="paraImage" />
            <input type="file" onChange={paraThreeImagePreviewHandler} style={{ border: "none" }} />
            <textarea rows='10' placeholder='Blog third paragraph comes here' value={paraThreeDescription} onChange={(e) => setparaThreeDescription(e.target.value)}></textarea>
          </div>
          <div className="publish_box">
            <label>Wants to publish now?</label>
            <select value={published} onChange={(e) => setPublished(e.target.value)}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>

          </div>
          <button onClick={handleUpdate} className='update-btn'>Update</button>
        </form>
      </section>
    </article>
  )
}

export default UpdateBlog;
