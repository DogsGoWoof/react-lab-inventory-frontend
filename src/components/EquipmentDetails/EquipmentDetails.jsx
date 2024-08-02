import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';

import * as equipmentService from '../../services/equipmentService';

import styles from '../ReagentDetails/ReagentDetails.module.css';

const EquipmentDetails = (props) => {

    const [equipment, setEquipment] = useState(null);

    const user = useContext(AuthedUserContext);

    const { equipmentId } = useParams();

    useEffect(() => {
        const fetchEquipment = async () => {
            const equipmentData = await equipmentService.show(equipmentId);
            setEquipment(equipmentData);
        };
        fetchEquipment();
    }, [equipmentId]);

    if (!equipment) return <main>Loading...</main>;
    return (
        <main>
            <header>
                <h1 className={styles.h1}>{equipment.category}</h1>
                <h2 className={styles.h2}>Brand: <span className={styles.span}>{equipment.brand}</span></h2>
                <h3 className={styles.h2}>Location: <span className={styles.span}>{equipment.location}</span></h3>
                <p>Maintenance Date: {equipment.maintenanceDate.slice(0, 10)}</p>

                <div>
                    <p>
                        {equipment.author.username} posted on {equipment.createdAt.slice(0, 10)}
                    </p>
                    {equipment.author._id === user._id && (
                        <>
                            <section className={styles.buttons}>
                                <Link to={`/equipments/${equipmentId}/edit`} className={styles.edit}>Edit</Link>
                                <button onClick={() => props.handleDeleteEquipment(equipmentId)} className={styles.delete}>
                                    Delete
                                </button>
                            </section>
                        </>
                    )}
                </div>
            </header>
        </main>
    );
};

export default EquipmentDetails;