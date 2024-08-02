import { Link } from 'react-router-dom';

const ReagentList = (props) => {
    return (
        <main>
            <h1>Reagents</h1>
            <hr />
            <ul> {/* Add an unordered list here */}
                {props.reagents.map((reagent) => (
                    <li key={reagent._id}> {/* Use a list item for each reagent */}
                        <Link to={`/reagents/${reagent._id}`}>
                            <article>
                                <header>
                                    <div>
                                        <h3>{reagent.quantity} - {reagent.name}</h3>
                                    </div>
                                    <p>
                                        {reagent.author ? reagent.author.username : '[ Unknown User ]'} posted on {new Date(reagent.createdAt).toLocaleDateString()}
                                    </p>
                                </header>
                            </article>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default ReagentList;
