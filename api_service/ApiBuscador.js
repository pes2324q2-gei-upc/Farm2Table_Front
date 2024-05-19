export const  fetchData2 = async(url, value,setValue) => {
    console.log(url)
  try {
      const response = await fetch(url);
      const json = await response.json();
      
      if(json.results = null) console.log("hola")
      if(value === 1){
          setValue(json);
          
      }else{
        setValue(json.data)
      }
  }catch (error) {
      setError(error);
      console.log(error);
  }
};
  
  export default fetchData2;