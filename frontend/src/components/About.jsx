import React from "react";

const About = () => {
  return (
    <div className="flex- flex-col p-3">
      <div className="flex-flex-col justify-center items-center p-3">
        <h1 className='text-6xl lg:text-[4rem] uppercase font-bold text-center'>
          <span className='text-purple-500'> Cinema</span>Ghar
        </h1>
      </div>
      <div className="flex p-3">
        <p className="text-lg">
        Welcome to CinemaGhar, your ultimate destination for an effortless movie-going experience. At CinemaGhar, we believe that watching a movie should be as enjoyable as the movie itself. That's why we've created a seamless platform where you can easily browse, book, and enjoy tickets for the latest movies showing in theaters near you.

Whether you're planning a spontaneous movie night or organizing a special outing, CinemaGhar makes it simple. With just a few clicks, you can secure your seats, avoid the queues, and focus on what really matters—the movie.

Our user-friendly interface, real-time updates, and secure payment options ensure that your movie booking experience is smooth from start to finish. Join us at CinemaGhar, where the magic of the movies is just a click away.        </p>

      </div>

    </div>
  );
}
export default About;