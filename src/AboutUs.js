import React from "react";
import { useLanguage } from "./LanguageContext";

export default function AboutUs() {
  const language = useLanguage().language;

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start mt-20 text-white px-6">
      <h1 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">
        {language === "en" ? "About Us" : "Sobre Nosotros"}
      </h1>

      <div className="max-w-3xl text-2xl leading-7 text-center flex items-center justify-center flex-col p-6" data-aos="fade-up">
        {language === "en" ? (
          <>
            <div className="flex flex-col sm:flex-row w-4/5 items-center justify-center gap-4">
              <p className="mb-4 w-full text-left text-3xl sm:p-8">
                We started with this project <strong>more than 9 years ago</strong>, in FIFA 18. We started with a PlayStation console, 
                playing and getting our own coins all day, and selling them privately to friends.
              </p>

              <img src="Messi.webp" className="w-3/4 sm:w-64 rounded-xl mb-4">
              </img>
            </div>


            <p className="mb-4">
              Little by little we were growing because the demand was also growing, and so we started with our Instagram, getting our 
              first customers and followers with the name <strong className="text-p1">"All Coins FUT"</strong>, and no longer 
              with a personal name.
            </p>

            <p className="mb-4">
              The demand was keep increasing, that we could no longer supply ourselves the large amount of orders, so we started to have our 
              own coin suppliers, so we no longer needed our own console!
            </p>

            <p className="mb-4">
              With many hours of <strong>hard work, sacrifice, and perseverance</strong>, we managed to grow more and more, currently having:
            </p>

            <ul className="text-p1 font-bold mb-4">
              <li>✅ +15,000 followers on Instagram</li>
              <li>✅ +100 coin suppliers</li>
              <li>✅ Hundreds of customers worldwide</li>
              <li>✅ +1,000 MILLION coins supplied in each game edition</li>
            </ul>

            <p className="mb-4">
              And this is not the end… Now, with all our effort, we have taken a step further with the development of 
              <strong> our own website</strong> 🚀
            </p>

            <h2 className="text-3xl font-bold mt-8 text-center text-p1 mb-3">Do I need to buy coins?</h2>
            <p className="mb-4 text-lg">
              In EA FC Ultimate Team, <strong>coins are everything.</strong> Not only because you can buy whatever you want with them 
              (except matches or referees 😂), but also to not fall "behind" the rest.
            </p>
            
            <p className="mb-4 text-lg">
              We don’t consider it a "Pay To Win" game, but for most people, it can feel that way. Just days after launch, 
              some players already have incredible teams that you can only obtain if you're a streamer, a YouTuber, a professional player, 
              or by buying coins. So if you're not in the first two categories, you can always go with the third one 😉.
            </p>

            <p className="mb-4 text-lg">
              The game also involves a lot of <strong>luck</strong> in packs. You can use your purchased coins to try your luck 
              and multiply your investment, or if you don’t trust luck, simply spend them on improving your team, completing SBCs, and more.
            </p>

            <p className="mb-4 text-lg">
              This is why <strong>so many players trust us</strong> to get coins quickly and safely. In just minutes, 
              you can have a highly competitive team, improve your gameplay, compete against the best, and beat your friends 
              (both in matches and team quality 🤫).
            </p>

            <p className="mb-4 text-lg">
              If you have any questions, feel free to <strong>message us on WhatsApp</strong>, and we’ll assist you as soon as possible! 
              Also, check our <strong>FAQ section</strong>—your question might already be answered there!
            </p>

            <p className="mb-4 text-lg">
              We recommend saving our number to receive <strong>exclusive promotions every month.</strong>
            </p>

            <div className="mt-6 flex justify-center">
              <a href="/" className="px-6 py-3 bg-p1 text-white rounded-full hover:scale-105 transition">
                Buy Now
              </a>
            </div>
          </>
        ) : (
          <>
          <div className="flex flex-col sm:flex-row w-4/5 items-center justify-start gap-4">
                <p className="mb-4 w-full text-left text-3xl sm:p-8">
                  Comenzamos con este proyecto hace <strong>más de 9 años</strong>, en FIFA 18. Todo inició con una PlayStation, 
                  jugando y consiguiendo nuestras propias monedas durante todo el día, para luego venderlas de manera particular 
                  a amigos y conocidos.
                </p>

                <img src="Messi.webp" className="w-3/4 sm:w-64 rounded-xl mb-4"></img>
              </div>

              <p className="mb-4">
                Poco a poco fuimos creciendo junto con la demanda, y así nació nuestro Instagram, consiguiendo nuestros 
                primeros clientes y seguidores bajo el nombre de <strong className="text-p1">"All Coins FUT"</strong>, 
                dejando atrás nuestro nombre personal.
              </p>

              <p className="mb-4">
                La demanda seguía aumentando hasta el punto en que ya no podíamos abastecer todos los pedidos por nuestra 
                cuenta. Fue entonces cuando comenzamos a trabajar con nuestros propios <strong>proveedores de monedas</strong>, 
                dejando de depender de nuestra propia consola.
              </p>

              <p className="mb-4">
                Con muchas horas de <strong>trabajo duro, sacrificio y constancia</strong>, logramos un crecimiento constante. 
                Hoy en día contamos con:
              </p>

              <ul className="text-p1 font-bold mb-4">
                <li>✅ +15.000 seguidores en Instagram</li>
                <li>✅ +100 proveedores de coins</li>
                <li>✅ Cientos de clientes en todo el mundo</li>
                <li>✅ +1.000 MILLONES de monedas abastecidas por edición del juego</li>
              </ul>

              <p className="mb-4">
                Y esto no termina aquí… Ahora, con todo nuestro esfuerzo, hemos dado un paso más allá con el desarrollo de 
                <strong> nuestra propia página web</strong> 🚀
              </p>

              <h2 className="text-3xl font-bold mt-8 text-center text-p1 mb-3">¿Necesito comprar monedas?</h2>
            <p className="mb-4 text-lg">
              En EA FC Ultimate Team, <strong>las monedas lo son todo.</strong> No solo porque puedes comprar lo que quieras con ellas 
              (excepto partidos o árbitros 😂), sino también para no quedarte atrás del resto.
            </p>

            <p className="mb-4 text-lg">
              No creemos que sea un juego "Pay To Win", pero para la mayoría, puede parecerlo. A los pocos días del lanzamiento, 
              hay jugadores con equipos increíbles que solo puedes conseguir si eres streamer, youtuber, jugador profesional, o comprando monedas.
            </p>

            <p className="mb-4 text-lg">
              El juego también depende mucho del <strong>azar</strong> en los sobres. Puedes usar tus monedas para probar suerte 
              y multiplicarlas, o simplemente gastarlas en mejorar tu equipo y completar SBCs.
            </p>

            <p className="mb-4 text-lg">
              Por eso, <strong>mucha gente confía en nosotros</strong> para conseguir monedas de forma rápida y segura. 
              En minutos, puedes tener un equipo competitivo, mejorar tu nivel y ganarles a tus amigos (en partido y equipo 🤫).
            </p>

            <p className="mb-4 text-lg">
              Si tienes preguntas, <strong>escríbenos por WhatsApp</strong> y te atenderemos lo antes posible. También revisa nuestra 
              <strong> sección de preguntas frecuentes</strong>, puede que tu duda ya esté resuelta.
            </p>

            <p className="mb-4 text-lg">
              Recomendamos guardar nuestro número para recibir <strong>promociones exclusivas cada mes.</strong>
            </p>

            <div className="mt-6 flex justify-center">
              <a href="/" className="px-6 py-3 bg-p1 text-white rounded-full hover:scale-105 transition">
                Comprar Ahora
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
