import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as equipmentService from '../../services/equipmentService';

import styles from './EquipmentForm.module.css';

const EquipmentForm = (props) => {

    const [formData, setFormData] = useState({
        brand: 'ACME',
        category: 'ThermoCycler',
        location: 'L808-1',
        maintenanceDate: new Date().toLocaleDateString(),
    });

    const { equipmentId } = useParams();
    useEffect(() => {
        const fetchEquipment = async () => {
            const equipmentData = await equipmentService.show(equipmentId);
            setFormData(equipmentData);
        };
        if (equipmentId) fetchEquipment();
    }, [equipmentId]);

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (equipmentId) {
            props.handleUpdateEquipment(equipmentId, formData);
        } else {
            props.handleAddEquipment(formData);
        }
    };

    return (
        <main>
            <h1 className={styles.h1}>{equipmentId ? 'Edit Equipment' : 'Add Equipment'}</h1>
            <div className={styles.centrifuge}>
                <form onSubmit={handleSubmit} className={styles.equipmentForm}>
                    <label htmlFor="category-input">Category</label>
                    <select
                        required
                        type="text"
                        name="category"
                        id="category-input"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="ThermoCycler">ThermoCycler</option>
                        <option value="Sequencer">Sequencer</option>
                        <option value="Centrifuge">Centrifuge</option>
                        <option value="Incubator">Incubator</option>
                        <option value="Microscope">Microscope</option>
                    </select>
                    <label htmlFor="brand-input">Brand</label>
                    <input
                        required
                        type="text"
                        name="brand"
                        id="brand-input"
                        value={formData.brand}
                        onChange={handleChange}
                    />
                    <label htmlFor="location-input">Location</label>
                    <select
                        required
                        name="location"
                        id="location-input"
                        value={formData.location}
                        onChange={handleChange}
                    >
                        <option value="L808-1">L808-1</option>
                        <option value="L808-2">L808-2</option>
                        <option value="L809-1">L809-1</option>
                        <option value="LS-401">LS-401</option>
                        <option value="LS-402">LS-402</option>
                    </select>
                    <label htmlFor="maintenanceDate">Maintenance Date</label>
                    <input
                        required
                        type="date"
                        name="maintenanceDate"
                        id="maintenanceDate"
                        value={formData.maintenanceDate.slice(0, 10)}
                        onChange={handleChange}
                    />
                    <button type="submit">SUBMIT</button>
                    <span className={styles.spinBtn}>Spin</span>
                </form>
            </div>
        </main>
    );
};

export default EquipmentForm;
