window.addEventListener("load", function () {
  const form = document.getElementById("formulier");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      crossdomain: true,
    },
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData();
    var imagefile = document.querySelector("#image");
    formData.append("image", imagefile.files[0]);

    axios
      .post("https://ai.wabyte.com/classification", formData, config)
      .then((response) => {
        // console.log(response);
        let item = response.data.match(/'([^']+)'/)[1];
        let array = response.data.match(/\[(.*?)\]/)[1].split(",");
        function createResult(waarde) {
          return eval(Number(waarde).toFixed(2) * 100);
        }
        let resultaat = {
          beer: createResult(array[0]),
          champagne: createResult(array[1]),
          soda: createResult(array[2]),
          wine: createResult(array[3]),
          wodka: createResult(array[4]),
        };
        console.log(item);
        console.log(resultaat);

        document.getElementById("resultParent").classList.remove("d-none");

        document.getElementById("result").innerHTML = `
        <h3 class="card-title text-center cp">Your bottle is: ${item}</h3>

        <ul class="list-group ulcenter ">
        <li class="list-group-item">Beer: ${resultaat.beer}%</li>
        <li class="list-group-item">Champagne: ${resultaat.champagne}%</li>
        <li class="list-group-item">Soda: ${resultaat.soda}%</li>
        <li class="list-group-item">Wine: ${resultaat.wine}%</li>
        <li class="list-group-item">Wodka: ${resultaat.wodka}%</li>
        </ul>
        `;

        //voorbeeld resultaat: {beer: "0.78", champagne: "0.00", soda: "0.00", wine: "0.00", wodka: "0.22"}
      })
      .catch((error) => console.log(error));
  });
});
