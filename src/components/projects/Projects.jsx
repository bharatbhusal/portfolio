import React from 'react'
import "./projects.css"

const Projects = () => {
    const Card = ({ title, source, host }) => {
        return (
            <div className="ag-courses_item">
                <a href={source} className="ag-courses-item_link" target="_blank">
                    <div className="ag-courses-item_bg"></div>

                    <div className="ag-courses-item_title">{title}</div>

                    {host && (
                        <div className="ag-courses-item_date-box">
                            Host:
                            <a className='inner-anchor' href={host} target="_blank">
                                <span className="ag-courses-item_date">
                                    {" "}{host.slice(31, -1)}
                                </span>
                            </a>
                        </div>
                    )}
                </a>
            </div>
        );
    };

    return (
        <section id="projects">
            <h5>Checkout</h5>
            <h2>My Projects</h2>
            <div className="ag-format-container">
                <div className="ag-courses_box">
                    <Card title={"Todo List"} source={"https://github.com/bharatbhusal/todo-list"} host={"https://bharatbhusal.github.io/todo-list/"} />
                    <Card title={"Stadar Staking App"} source={"https://github.com/bharatbhusal/blockchain-learning-week-6"} host={"https://bharatbhusal.github.io/blockchain-learning-week-6/"} />
                    <Card title={"Portfolio Website"} source={"https://github.com/bharatbhusal/portfolio"} host={"https://bharatbhusal.github.io/portfolio/"} />
                    <Card title={"Toss the coin Game"} source={"https://github.com/bharatbhusal/toss-the-coin"} host={"https://bharatbhusal.github.io/coin-flip-game/"} />
                    <Card title={"Contacts Book App"} source={"https://github.com/bharatbhusal/contacts-book"} host={""} />
                    <Card title={"Netflix Clone"} source={"https://github.com/bharatbhusal/netflix-clone"} host={""} />
                </div>
            </div>
        </section>
    )
}

export default Projects