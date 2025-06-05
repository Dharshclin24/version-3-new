import { useState, useEffect } from "react";

function SavedCountries({ data }) {
  const [inputs, setInputs] = useState(null);
  const [gottenInfo, setGottenInfo] = useState(null);

  //function created to handle changes made to the form when user inputs data.
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //post request created to send the form data to the API.
  async function storeData() {
    await fetch("/api/add-one-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //form data
      body: JSON.stringify({
        name: inputs.username,
        country_name: inputs.country,
        email: inputs.email,
        bio: inputs.bio,
      }),
    });
  }
  const retrievedFormData = async () => {
    try {
      const response = await fetch(`/api/get-newest-user`);
      const data = await response.json();
      console.log(data, "data from get newest user");
      console.log(data[0].name, "new user name");

      setGottenInfo(data[0].name);

      //created  a fetch to get the newest user information.Named the function retrieved form data
      //saved the api data into the state variable called gathered ApiInfo state variable and changed the value to data
      //data is passed as props to the other pages for the information gathered.
    } catch (error) {
      console.error("Oopsies! Error fetching data:", error);
    }
  };
  // run use effect when form submits
  useEffect(() => {
    retrievedFormData();
  }, []);

  //function created to handle the form when the user submits it and prevent defaults.
  const handleSubmit = (event) => {
    event.preventDefault();
    storeData();
  };

  // /async function storedCountry() {
  //   await fetch("/api/save-one-country", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       country_name: "",
  //     }),
  //   });
  // }
  // const retrievedCountryData = async () => {
  //   try {
  //     const response = await fetch(`api/`);
  //     const data = await response.json();
  //     console.log(data);
  //     setGottenInfo(data);

  //created  a fetch to get the newest user information.Named the function retrieved form data
  //saved the api data into the state variable called gathered ApiInfo state variable and changed the value to data
  //data is passed as props to the other pages for the information gathered.
  //   } catch (error) {
  //     console.error("Oopsies! Error fetching data:", error);
  //   }
  //   function renderInfo(inputs) {
  //     const countryCardData = inputs.name;
  //     if (countryCardData) {
  //     }
  //   }
  // };
  return (
    <>
      <h1>My Profile</h1>
      <p>Welcome {gottenInfo}</p>

      <form onSubmit={handleSubmit}>
        <div id="container">
          <nav>
            <label>
              Full Name
              <input
                type="text"
                name="username"
                value={inputs?.username || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={inputs?.email || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Country
              <input
                type="text"
                name="country"
                value={inputs?.country || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Bio
              <input
                type="text"
                name="bio"
                value={inputs?.bio || ""}
                onChange={handleChange}
              />
            </label>
            <input type="submit" />
          </nav>
        </div>
      </form>
    </>
  );
}

export default SavedCountries;
