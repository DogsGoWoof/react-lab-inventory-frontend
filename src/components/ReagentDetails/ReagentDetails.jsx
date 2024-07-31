import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as reagentService from '../../services/reagentService';

import CommentForm from '../CommentForm/CommentForm';

import styles from './ReagentDetails.module.css';

const ReagentDetails = (props) => {

    const [reagent, setReagent] = useState(null);

    const user = useContext(AuthedUserContext);

    const { reagentId } = useParams();

    useEffect(() => {
        const fetchReagent = async () => {
            const reagentData = await reagentService.show(reagentId);
            setReagent(reagentData);
        };
        fetchReagent();
    }, [reagentId]);

    const handleAddComment = async (commentFormData) => {
        const newComment = await reagentService.createComment(reagentId, commentFormData);
        setReagent({ ...reagent, comments: [...reagent.comments, newComment] });
    };

    const handleDeleteComment = async (reagentId, commentId) => {
        const deletedComment = await reagentService.deleteComment(reagentId, commentId);
        const newCommentsArr = reagent.comments.filter((comment) => comment._id !== commentId);
        setReagent({ ...reagent, comments: newCommentsArr });
    };

    if (!reagent) return <main>Loading...</main>;
    return (
        <main>
            <header>
                <h1 className={styles.h1}>{reagent.name}</h1>
                <p>{reagent.category.toUpperCase()}</p>
                <h2 className={styles.h2}>Brand: <span className={styles.span}>{reagent.brand}</span></h2>
                <h2 className={styles.h2}>Quantity: <span className={styles.span}>{reagent.quantity}</span></h2>
                <p>Expiration: {new Date(reagent.expirationDate).toLocaleDateString()}</p>
                <div className={styles.div}>
                    <p className={styles.p}>
                        {reagent.author.username} posted on {new Date(reagent.createdAt).toLocaleDateString()}
                    </p>
                    {reagent.author._id === user._id && (
                        <>
                            <section className={styles.buttons}>
                                <Link to={`/reagents/${reagentId}/edit`} className={styles.edit}>Edit</Link>
                                <button onClick={() => props.handleDeleteReagent(reagentId)} className={styles.delete}>
                                    Delete
                                </button>
                            </section>
                        </>
                    )}
                </div>

            </header>

            <section>
                <h2>Comments</h2>

                {!reagent.comments.length && <p>There are no comments.</p>}

                {reagent.comments.map((comment) => (
                    <article key={comment._id} className={styles.article}>
                        <header>
                            <div className={styles.div}>
                                <p className={styles.commentP}>
                                    {comment.author.username} posted on {new Date(comment.createdAt).toLocaleDateString()}
                                </p>
                                {comment.author._id === user._id && (
                                    <>
                                        <section className={styles.buttons}>
                                            <Link to={`/reagents/${reagentId}/comments/${comment._id}/edit`} className={styles.edit}>Edit</Link>
                                            <button onClick={() => handleDeleteComment(reagentId, comment._id)} className={styles.delete}>
                                                Delete
                                            </button>
                                        </section>
                                    </>
                                )}
                            </div>
                        </header>
                        <p className={styles.commentP}>{comment.text}</p>
                    </article>
                ))}
            </section>
            <h2>Comment</h2>
            <CommentForm handleAddComment={handleAddComment} />
        </main>
    );
};

export default ReagentDetails;