import React, { useContext } from 'react'
import { Context } from '../../main';

const About = () => {
  const {mode} = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">
      <h2>About</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero enim distinctio similique maxime voluptates perferendis molestiae suscipit nostrum iure hic deleniti nam laborum eligendi voluptatum expedita a omnis, atque corrupti.</p>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, dicta.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse maiores, assumenda a quaerat alias debitis, voluptates incidunt aliquid laudantium voluptatum repellendus architecto, corrupti rerum! Nulla eum odit, aut saepe aliquid nemo. Corporis vero porro debitis magni saepe autem quia quasi.</p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus amet eligendi dolore doloribus nihil neque perferendis atque, excepturi delectus sit nisi temporibus corporis dicta, tenetur, voluptatibus commodi facilis? Hic, repudiandae.
      </div>
    </article>
  )
}

export default About