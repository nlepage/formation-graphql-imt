import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Mustache from "mustache";

const client = new ApolloClient({
  // FIXME ajouter l'URL de l'API
  cache: new InMemoryCache(),
});

const form = document.getElementById("searchForm");
const result = document.getElementById("result");
const listTemplate = document.getElementById("list-template").innerHTML;

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  const formData = new FormData(form);
  const query = formData.get("query") || "";

  const { data } = await client.query({
    query: gql`
      # FIXME appeler la query search
    `,
    variables: {
      queryString: query,
    },
  });

  result.innerHTML = Mustache.render(listTemplate, data);
});
