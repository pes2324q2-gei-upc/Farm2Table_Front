export const  fetchData2 = async(url, value,setValue) => {
  try {
      const response = await fetch(url);
      const json = await response.json();
      
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