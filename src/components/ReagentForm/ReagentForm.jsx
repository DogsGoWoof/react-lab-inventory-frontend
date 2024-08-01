import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as reagentService from '../../services/reagentService';

import styles from './ReagentForm.module.css';

const ReagentForm = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        brand: 'ACME',
        quantity: 0,
        category: 'Organic',
        expirationDate: new Date().toLocaleDateString(),
    });

    const { reagentId } = useParams();

    useEffect(() => {
        const fetchReagent = async () => {
            const reagentData = await reagentService.show(reagentId);
            setFormData(reagentData);
        };
        if (reagentId) fetchReagent();
    }, [reagentId]);

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (reagentId) {
            props.handleUpdateReagent(reagentId, formData);
        } else {
            props.handleAddReagent(formData);
        }
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.h1}>{reagentId ? 'Edit Reagent' : 'Add Reagent'}</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.beak}></div>
                <label htmlFor="name-input">Name</label>
                <input
                    required
                    type="text"
                    name="name"
                    id="name-input"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="brand-input">Brand</label>
                <input
                    required
                    type="text"
                    name="brand"
                    id="brand-input"
                    value={formData.brand}
                    onChange={handleChange}
                />
                <label htmlFor="quantity-input">Quantity</label>
                <input
                    required
                    type="number"
                    min={0}
                    name="quantity"
                    id="quantity-input"
                    value={formData.quantity}
                    onChange={handleChange}
                />
                <label htmlFor="category-input">Category</label>
                <select
                    required
                    name="category"
                    id="category-input"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="Organic">Organic</option>
                    <option value="Inorganic">Inorganic</option>
                </select>
                <label htmlFor="expirationDate">Expiration</label>
                <input
                    required
                    type="date"
                    name="expirationDate"
                    id="expirationDate"
                    value={formData.expirationDate.slice(0, 10)}
                    onChange={handleChange}
                />
                <button type="submit">SUBMIT</button>
            </form>
        </main>
    );
};

export default ReagentForm;
