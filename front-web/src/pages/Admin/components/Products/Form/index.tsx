import { makeRequest } from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../BaseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {
    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '',
        description: '',
    });

    const handleOnChange = (event: FormEvent ) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({...data,[name]: value}));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload = {
            ...formData,
            imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoNvFngLBmfXdCGNbX7ZgL4L_D0foBNVix7BdQ3d_3jQ8uUsgFyJ56sijv3DIX_uKJxXU&usqp=CAU',
            categories: [{id: formData.category}]
        }
        makeRequest({url: '/products', method: 'POST', data:payload}).then(() =>{
            setFormData({name: '', category: '', price: '', description: ''});
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="CADASTRAR UM PRODUTO" >
                <div className='row'>
                    <div className="col-6">
                        <input type="text"
                            value={formData.name}
                            name="name"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="Nome do produto"
                        />
                        <select
                        className="form-control mb-5" 
                        onChange={handleOnChange}
                        value={formData.category}
                        name="category">
                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                        </select>
                        <input type="text"
                            value={formData.price}
                            name="price"
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço"
                        />
                    </div>
                    <div className="col-6">
                        <textarea 
                        name="description" 
                        value={formData.description}
                        onChange={handleOnChange}
                        className="form-control"
                        cols={30} 
                        rows={10}></textarea>
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;