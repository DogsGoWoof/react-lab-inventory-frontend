import { Link } from 'react-router-dom';

const ReagentList = (props) => {

    return (
        <main>
            <h1>Reagents</h1>
            <hr />
            {props.reagents.map((reagent) => (
                <Link key={reagent._id} to={`/reagents/${reagent._id}`}>
                    <article>
                        <header>
                            <div>
                                <h2>{reagent.quantity}-{reagent.name}</h2>
                            </div>
                            <p>
                                {reagent.author ? reagent.author.username : '[ Unknown User ]'} posted on {new Date(reagent.createdAt).toLocaleDateString()}
                            </p>
                        </header>
                    </article>
                </Link>
            ))}
        </main>
    );
};

export default ReagentList;