
import React from 'react'
import "./education.css"
const Education = () => {

    const Card = ({ name, image, year, description }) => {
        return (
            <div className="cards_item">
                <div className="card" tabIndex="0">
                    <div className="card_image">
                        <img src={image} />
                    </div>
                    <div className="card_content">
                        <h2 className="card_title">{name}</h2>
                        <div className="card_text">
                            {description}
                            <p className="upcharge">{year}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section id='education'>
            <h2>My Education</h2>
            <div className="container education__container">
                <div className="cards">
                    <Card
                        name={"Gitam University"}
                        image={"https://static.zollege.in/public/college_data/images/campusimage/1473061213Untitled.png?tr=h-590,w-1048,c-force"}
                        year={"2021 to present | B.Tech CSE CS"}
                        description={"The Gandhi Institute of Technology and Management was established in 1980 by a group of emininent intellectuals and industrialists, led by Dr. M. V. V. S. Murthi, former Member of Parliament and popular philanthropist. Their goal, to bring to life Mahatma Gandhi's vision of an institution for higher education that transcends all barriers."}
                    />

                    <Card
                        name={"Kathmandu World School"}
                        image={"https://theedunepal.ap-south-1.linodeobjects.com/uploads/clients/kathmanduworldschool/banner/4d59e174fca513df7d39b39a186f6f73-1597140421.jpg"}
                        year={"2019 to 2021 | Standard 11 and 12"}
                        description={"A few years ago, a group of leading Nepalese educationists and entrepreneurs felt the need to establish a semi-residential school of an international standard in Nepal to meet the growing demand for high-quality holistic education for children of five to nineteen years. Thus, Kathmandu World School (KWS) was established at Surya Binayak – 7, Gundu, Bhaktapur."}
                    />
                    <Card
                        name={"SOS Higher Secondary School"}
                        image={"https://gokarnali.com/wp-content/uploads/2019/07/sosschool3.png"}
                        year={"2016 to 2019 | Standard 8 to 10"}
                        description={"SOS Children’s Village Surkhet is located at Kalagaon, Birendranagr Surkhet, in Karnali province. The region includes many remote and poor districts of Nepal. The land of this village was provided by the government of Nepal in 1984. It was established in October 1987 with the capacity of 140 children in 14 family houses. At present there are 136 children in the village. More than 300 children have been successfully integrated into society."}
                    />

                </div>
            </div>

        </section>
    )
}

export default Education