import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
import { AddPopSelect, ClosePop, RemoveId } from '../../redux/slices/AddSlice';
import { useAppDispatch } from '../../redux/store';

export type AddCardProps = {
    title: string,
    imageUrl: string,
    price: number,
    sizes: string,
    category: string,
}

const AddGoods: React.FC = () => {
    const {id} = useSelector(AddPopSelect)


    const inputFileRef = React.useRef<any>(null);
    const [uploadMethod, setMethod] = useState('File')

    const imgUploadMethod = ['File', 'Link']

    const [price, setPrice] = React.useState(0);
    const [title, setTitel]= React.useState('');
    const [imageUrl, setImage] = React.useState('');
    const [sizes, setSizes] = React.useState('');
    const [category, setCatigorie] = React.useState('Casual');

    const isEdit = Boolean(id)


    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    React.useEffect(() => {
      (async() => {
  
        try {
          if (id) {
            const {data} = await axios.get(`/product/${id}`);
            const {title, price, sizes, imageUrl, category} = data

            setPrice(+price);
            setTitel(title);
            setSizes(sizes.join(', '));
            setImage(imageUrl);
            setCatigorie(category)
          }
          
        } catch (error) {
          console.log(error)
          alert('Could not find the product!')
        }
  
      })()
    }, [id])

    const uploadFile = () =>{
        if(inputFileRef.current) {
            inputFileRef.current.click()
        }
    }

    const onClickRemoveImage = () => {
        setImage('')
      };

    const handleChangeFile = async ({target}: any) => {
        try {
          const formData = new FormData();
          const file = target.files[0];
    
          formData.append('image', file)
    
          const {data} = await axios.post('/upload', formData)
          setImage(data)
    
        } catch (error) {
          console.log(error)
        }
      };

    const onSubmit = async () => {
        try {
    
          const fields: AddCardProps = {
            title,
            imageUrl,
            sizes,
            price,
            category
          }
    
          if (isEdit) {
            await axios.patch(`/product/${id}`, fields);
          } else {
            await axios.patch('/product', fields);
          }
          dispatch(RemoveId())
    
        } catch (error) {
          console.warn(error)
          alert('Something wrong! Try again...')
        }
      }

      const ClosePopUp = () => {
        dispatch(ClosePop())
        dispatch(RemoveId())
      }
    
    return (
        <>
            <div className="overlaw"/>
            <div className='popup-box'>
                <button onClick={ClosePopUp} className='close'>
                    <svg viewBox="0 0 24 24" fill="#f6f6f6" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clip-rule="evenodd" d="M5.46967 5.46967C5.76256 5.17678 6.23744 5.17678 6.53033 5.46967L18.5303 17.4697C18.8232 17.7626 18.8232 18.2374 18.5303 18.5303C18.2374 18.8232 17.7626 18.8232 17.4697 18.5303L5.46967 6.53033C5.17678 6.23744 5.17678 5.76256 5.46967 5.46967Z" fill="#000000"></path> <path fillRule="evenodd" clip-rule="evenodd" d="M18.5303 5.46967C18.8232 5.76256 18.8232 6.23744 18.5303 6.53033L6.53035 18.5303C6.23745 18.8232 5.76258 18.8232 5.46969 18.5303C5.17679 18.2374 5.17679 17.7626 5.46968 17.4697L17.4697 5.46967C17.7626 5.17678 18.2374 5.17678 18.5303 5.46967Z" fill="#000000"></path> </g>
                    </svg>
                </button>
                <form onSubmit={onSubmit} action="#">
                    <div>
                        <label htmlFor="title">Title</label>
                        <input 
                        onChange={(e) => setTitel(e.target.value)}
                        value={title}
                        name='title' 
                        type="text" 
                        placeholder='Title...'/>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input 
                        onChange={(e) => setPrice(+e.target.value)}
                        value={price}
                        name='price' 
                        type="text" 
                        placeholder='00.00'/>
                    </div>
                    <div>
                        <label htmlFor="sizes">Sizes</label>
                        <input 
                        onChange={(e) => setSizes(e.target.value)}
                        value={sizes}
                        name='sizes' 
                        type="text" 
                        placeholder='8, 8.5, 9, 9.5...'/>
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <p>
                          <select 
                          onChange={(e) => setCatigorie(e.target.value)}
                          name='category'
                          value={category}>
                            <option value="Casual">Casual</option>
                            <option value="Sport">Sport</option>
                            <option value="Canvas">Canvas</option>
                            <option value="Skate">Skate</option>
                          </select>
                        </p>
                    </div>
                    <div>
                        <label htmlFor="image">Image</label>
                        <span className='uploads'>{imgUploadMethod.map(item => (
                            <p
                            key={item}
                            className={`upload ${uploadMethod === item ? 'active': ''}`}
                            onClick={() => setMethod(item)}
                            >{item}</p>
                        ))}</span>
                        { uploadMethod === 'Link' ? <input 
                        onChange={(e) => setImage(e.target.value)}
                        name='image' 
                        type="text" 
                        placeholder='http://imageurl...'/> 
                        :
                        <div className='buttons'>
                        <button 
                        type='button'
                        onClick={uploadFile}
                        className='upload--button'>Choose file</button>
                        <input
                        onChange={handleChangeFile}
                        ref={inputFileRef}
                        className='file'
                        name='image' 
                        type="file" 
                        hidden/>
                        {imageUrl && 
                        <>
                        <button className='deleteImage' color="error" onClick={onClickRemoveImage}>
                            Delete
                        </button>
                        <img src={imageUrl && imageUrl.includes('upload') ? `http://localhost:4000/${imageUrl}` : imageUrl} alt="Uploaded" />
                        </>}
                        </div>}
                    </div>
                    <button className='button'>Add</button>
                </form>
            </div>
        </>
    )

};

export default AddGoods;