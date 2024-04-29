export const  fetchData2 = async(url, value,setValue) => {
    console.log(url)
  try {
      const response = await fetch(url);
      const json = await response.json();
      
      if(json.results = null) console.log("hola")
      if(value === 0) {
          setValue(json.data); 
      }
      else if(value === 1){
          setValue(json);
      }else{
        setValue(json.result.records)
      }
  }catch (error) {
      setError(error);
      console.log(error);
  }
};
  
  export default fetchData2;