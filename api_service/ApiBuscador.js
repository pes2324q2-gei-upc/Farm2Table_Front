export const  fetchData2 = async(url, value,setValue) => {
  try {
      const response = await fetch(url);
      const json = await response.json();
      //console.log(API_ENDPOINT)
      if(json.results = null) console.log("hola")
      if(value === 0) {
          setValue(json.data);   
      }
      else if(value === 1){
          setValue(json)
          /*
          data2.forEach(item => {
              console.log(item.name);
          });
          
          console.log(json)
          datap.forEach(item => {
              console.log(item.name);
          });
          */
      }
      //console.log(json.data[0].username);
  }catch (error) {
      setError(error);
      console.log(error);
  }
};
  
  export default fetchData2;