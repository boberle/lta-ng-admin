const Presentation = () => {
  return (
    <>
      <h1>À propos de l'application</h1>
      <p>
        Cette application mobile est spécialement conçue pour faciliter la
        collecte de données dans le cadre d'études sociolinguistiques. Elle
        propose de courts sondages aux participants plusieurs fois par jour,
        permettant aux chercheurs de mieux comprendre les dynamiques de
        l'apprentissage informel des langues.
      </p>
      <p>
        Chaque sondage ne prend que quelques minutes à compléter et aide à la
        compréhension des comportements linguistiques au quotidien.
      </p>
      <p>L'application s'inscrit dans la <b>continuité fonctionnelle et scientifique</b> de <a href="https://portal.research.lu.se/en/projects/the-lang-track-app-studying-exposure-to-and-use-of-a-new-language">Lang Track App</a> developpée
        par Lund University il y a plusieurs années et publiée dans les papiers suivants:
      </p>
      <ul>
        <li>Arndt, H. L., Granfeldt, J., & Gullberg, M. (2023). The Lang‐Track‐App: Open‐Source Tools for Implementing the Experience Sampling Method in Second Language Acquisition Research. Language Learning, 73(3), 869–903.</li>
        <li>Arndt, H.L., Björck, S., Granfeldt, J., Granqvist, J. & Gullberg, M. (2023). The Lang-Track-App (Version #) [mobile and web software]. Lund University Humanities Lab.</li>
      </ul>
      <p>
        Elle a cependant été entièrement réécrite avec des technologies modernes pour le project "Apprentissage
        informel de langues" (Université de Strasbourg et Université de
        Lorraine).
      </p>
      <p>
        L'application est en <a href={"https://github.com/boberle/lang-track-app-ng"}>open source</a> et peut être utilisée par
        d'autres chercheurs.
      </p>
    </>
  );
};

export default Presentation;
